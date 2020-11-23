import React, { useState, useEffect } from 'react';

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

interface IGame {
    _id: string;
    name: string;
}

interface IStation {
    _id: string;
    name: string;
    selected: boolean;
}

const GamesAdmin: React.FC = () => {
    const [isSearching, setSearching] = useState(false);
    const [isEditing, setEditing] = useState(true);
    const [editingId, setEditingId] = useState('');
    const [games, setGames] = useState<IGame[]>([]);
    const [stations, setStations] = useState<IStation[]>([]);

    async function handleSearch() {}

    async function loadData() {
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

    async function handleGameCreate() {}

    function handleSelectStation(id: string) {
        setStations(
            stations.map(station => {
                if (station._id === id) {
                    return { ...station, selected: !station.selected };
                }

                return station;
            })
        );
    }

    useEffect(() => {
        loadData();
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
                                            setEditing(true);
                                            setEditingId(game._id);
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
                    <Form onSubmit={handleGameCreate}>
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
                        <Button type='submit' variant='secondary'>Editar</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
};

export default GamesAdmin;
