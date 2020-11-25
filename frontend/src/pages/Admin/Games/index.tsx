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
import { CircleSpinner } from 'react-spinners-kit';
import { MdDeleteForever, MdEdit, MdSearch } from 'react-icons/md';
import TextInput from '../../../components/Input/Text';
import API from './../../../services/api';
import Modal from '../../../components/Modal';
import Button from './../../../components/Input/Button';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { stat } from 'fs';
import AvatarPicker from '../../../components/AvatarPicker';
import { media } from '../../../services/media';

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

const GamesAdmin: React.FC = () => {
    const [isSearching, setSearching] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [editingGame, setEditingGame] = useState<IGame | null>(null);
    const [games, setGames] = useState<IGame[]>([]);
    const [stations, setStations] = useState<IStation[]>([]);
    const formRef = useRef<FormHandles>(null);

    async function handleSearch() {}

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
    }

    async function handleGameUpdate(data: IUpdateFormData) {
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

            API.patch(`games/${editingGame?._id}`, formData)
                .then(() => {
                    reloadData();
                    setEditing(false);
                })
                .catch(err => {
                    console.log(err);
                });
        } catch (err) {
            const errors: { [path: string]: string } = {};
            err.inner.forEach((error: Yup.ValidationError) => {
                errors[error.path] = error.message;
            });
            formRef.current?.setErrors(errors);
        }
    }

    async function handleSelectGame(game: IGame) {
        setEditing(true);
        setEditingGame(game);

        formRef.current?.reset();
        formRef.current?.setFieldValue('name', game?.name);

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
                        placeholder='Pesquise um jogo...'
                        icon={
                            isSearching ? (
                                <CircleSpinner size={20} color='#626770' />
                            ) : (
                                <MdSearch size={20} />
                            )
                        }
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
                                    <MdDeleteForever size={24} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            <Modal
                isVisible={isEditing}
                onClose={() => setEditing(false)}
                width='400px'>
                <ModalBody>
                    <h2>Editar jogo</h2>
                    <Form ref={formRef} onSubmit={handleGameUpdate}>
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
        </>
    );
};

export default GamesAdmin;
