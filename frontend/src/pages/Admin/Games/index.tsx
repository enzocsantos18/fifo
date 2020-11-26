import React, { useState, useEffect, useRef } from 'react';

import {
    Container,
    ModalBody,
    StationItem,
    StationItemCheck,
    StationList,
    Table,
} from './styles';
import { Form } from '@unform/web';
import { MdDeleteForever, MdEdit, MdSearch, MdAdd } from 'react-icons/md';
import TextInput from '../../../components/Input/Text';
import API from './../../../services/api';
import Modal from '../../../components/Modal';
import Button from './../../../components/Input/Button';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import AvatarPicker from '../../../components/AvatarPicker';
import { media } from '../../../services/media';
import { ModalActions } from '../../../components/Modal/styles';

interface IGame {
    _id: string;
    name: string;
    imageURL?: string;
}

interface IStation {
    _id: string;
    name: string;
    selected: boolean;
}

interface IGameStation {
    game: IGame;
    station: IStation;
}

interface IUpdateFormData {
    name: string;
    image: File;
}

interface ISearchFormData {
    query: string;
}

const GamesAdmin: React.FC = () => {
    const [staticGames, setStaticGames] = useState<IGame[]>([]);
    const [games, setGames] = useState<IGame[]>([]);
    const [stations, setStations] = useState<IStation[]>([]);
    const [isEditing, setEditing] = useState(false);
    const [editingGame, setEditingGame] = useState<IGame | null>(null);
    const editFormRef = useRef<FormHandles>(null);
    const [isCreating, setCreating] = useState(false);
    const createFormRef = useRef<FormHandles>(null);
    const [isDeleting, setDeleting] = useState(false);
    const [deletingGame, setDeletingGame] = useState<IGame | null>(null);

    function handleSearch(data: ISearchFormData) {
        if (staticGames.length === 0) {
            return;
        }

        if (data.query === '') {
            setGames(staticGames);
            return;
        }

        const searchedGames = staticGames.filter(game =>
            game.name.toLowerCase().includes(data.query)
        );

        setGames(searchedGames);
    }

    async function reloadData() {
        const { data: stations } = await API.get<IGame[]>('stations');
        setStations(
            stations.map(station => ({
                ...station,
                selected: false,
            }))
        );

        const { data: games } = await API.get<IGame[]>('games');
        setGames(games);
        setStaticGames(games);
    }

    async function handleGameUpdate(
        data: IUpdateFormData,
        action: 'edit' | 'create'
    ) {
        const schema = Yup.object().shape({
            name: Yup.string().required('O nome deve ser inserido'),
        });

        try {
            await schema.validate(data, {
                abortEarly: false,
            });

            const selectedStations: string[] = [];

            stations.map(station => {
                if (station.selected) selectedStations.push(station._id);
            });

            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('stations', JSON.stringify(selectedStations));

            if (data.image) {
                formData.append('image', data.image);
            }

            if (action === 'edit') {
                API.patch(`games/${editingGame?._id}`, formData)
                    .then(() => {
                        reloadData();
                        setEditing(false);
                    })
                    .catch(err => {
                        alert('Não foi possível editar!');
                    });
            } else {
                API.post(`games/`, formData)
                    .then(() => {
                        reloadData();
                        setCreating(false);
                    })
                    .catch(err => {
                        alert('Não foi possível criar!');
                    })
                    .finally(() => {
                        createFormRef.current?.reset();
                    });
            }
        } catch (err) {
            const errors: { [path: string]: string } = {};
            err.inner.forEach((error: Yup.ValidationError) => {
                errors[error.path] = error.message;
            });
            editFormRef.current?.setErrors(errors);
        }
    }

    function handleGameDelete() {
        setDeleting(false);
        setDeletingGame(null);

        API.delete(`games/${deletingGame?._id}`)
            .then(() => {
                reloadData();
            })
            .catch(err => {
                alert('Erro ao excluir!');
            });
    }

    async function handleSelectGame(game: IGame) {
        setEditing(true);
        setEditingGame(game);

        editFormRef.current?.reset();
        editFormRef.current?.setFieldValue('name', game?.name);

        const { data: gameStations } = await API.get<IGameStation[]>(
            `games/${game._id}/stations`
        );

        setStations(
            stations.map(station => ({
                ...station,
                selected: gameStations.some(
                    gameStation => gameStation.station._id === station._id
                ),
            }))
        );
    }

    function handleSelectStation(id: string) {
        setStations(
            stations.map(station => ({
                ...station,
                selected:
                    station._id === id ? !station.selected : station.selected,
            }))
        );
    }

    useEffect(() => {
        reloadData();
    }, []);

    return (
        <>
            <Container>
                <h2>Gerenciamento dos jogos</h2>
                <Form onSubmit={handleSearch}>
                    <TextInput
                        name='query'
                        placeholder='Pesquise um jogo...'
                        icon={<MdSearch size={20} />}
                    />
                </Form>

                <Table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map(game => (
                            <tr key={game._id}>
                                <td>{game.name}</td>
                                <td>
                                    <MdEdit
                                        onClick={() => {
                                            handleSelectGame(game);
                                        }}
                                        size={24}
                                    />
                                    <MdDeleteForever
                                        onClick={() => {
                                            setDeletingGame(game);
                                            setDeleting(true);
                                        }}
                                        size={24}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button variant='secondary' onClick={() => setCreating(true)}>
                    Novo Jogo <MdAdd size={20} />
                </Button>
            </Container>
            <Modal
                isVisible={isEditing}
                onClose={() => setEditing(false)}
                width='400px'>
                <ModalBody>
                    <h2>Editar jogo</h2>
                    <Form
                        ref={editFormRef}
                        onSubmit={data => handleGameUpdate(data, 'edit')}>
                        <AvatarPicker
                            name='image'
                            defaultValue={
                                editingGame?.imageURL &&
                                media('game', editingGame.imageURL)
                            }
                        />
                        <TextInput name='name' placeholder='Nome do jogo' />
                        <StationList>
                            <p>Estações disponíveis:</p>
                            {stations.map(station => (
                                <StationItem
                                    key={station._id}
                                    onClick={() =>
                                        handleSelectStation(station._id)
                                    }>
                                    <StationItemCheck
                                        selected={station.selected}
                                    />
                                    {station.name}
                                </StationItem>
                            ))}
                        </StationList>
                        <Button type='submit' variant='secondary'>
                            Editar
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>

            <Modal
                isVisible={isCreating}
                onClose={() => setCreating(false)}
                width='400px'>
                <ModalBody>
                    <h2>Criar jogo</h2>
                    <Form
                        ref={createFormRef}
                        onSubmit={data => handleGameUpdate(data, 'create')}>
                        <AvatarPicker name='image' />
                        <TextInput name='name' placeholder='Nome do jogo' />
                        <StationList>
                            <p>Estações disponíveis:</p>
                            {stations.map(station => (
                                <StationItem
                                    key={station._id}
                                    onClick={() =>
                                        handleSelectStation(station._id)
                                    }>
                                    <StationItemCheck
                                        selected={station.selected}
                                    />
                                    {station.name}
                                </StationItem>
                            ))}
                        </StationList>
                        <Button type='submit' variant='secondary'>
                            Editar
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>

            <Modal
                isVisible={isDeleting}
                onClose={() => setDeleting(false)}
                width='400px'>
                <ModalBody>
                    <h3>
                        Você realmente deseja excluir "{deletingGame?.name}" ?
                    </h3>
                    <ModalActions>
                        <Button
                            variant='secondary'
                            onClick={() => setDeleting(false)}>
                            Não
                        </Button>
                        <Button variant='primary' onClick={handleGameDelete}>
                            Sim, excluir
                        </Button>
                    </ModalActions>
                </ModalBody>
            </Modal>
        </>
    );
};

export default GamesAdmin;
