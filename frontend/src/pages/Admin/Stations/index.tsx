import React, { useState, useEffect, useRef } from 'react';

import { Container, ModalBody, Table } from './styles';
import { Form } from '@unform/web';
import { MdDeleteForever, MdEdit, MdSearch, MdAdd } from 'react-icons/md';
import TextInput from '../../../components/Input/Text';
import API from './../../../services/api';
import Modal from '../../../components/Modal';
import Button from './../../../components/Input/Button';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { ModalActions } from '../../../components/Modal/styles';

interface IStation {
    _id: string;
    name: string;
    selected: boolean;
}

interface IUpdateFormData {
    name: string;
    image: File;
}

interface ISearchFormData {
    query: string;
}

const StationsAdmin: React.FC = () => {
    const [staticStations, setStaticStations] = useState<IStation[]>([]);
    const [stations, setStations] = useState<IStation[]>([]);
    const [isEditing, setEditing] = useState(false);
    const [editingStation, setEditingStation] = useState<IStation | null>(null);
    const editFormRef = useRef<FormHandles>(null);
    const [isCreating, setCreating] = useState(false);
    const createFormRef = useRef<FormHandles>(null);
    const [isDeleting, setDeleting] = useState(false);
    const [deletingStation, setDeletingStation] = useState<IStation | null>(
        null
    );

    function handleSearch(data: ISearchFormData) {
        if (staticStations.length === 0) {
            return;
        }

        if (data.query === '') {
            setStations(staticStations);
            return;
        }

        const searchedStations = staticStations.filter(game =>
            game.name.toLowerCase().includes(data.query)
        );

        setStations(searchedStations);
    }

    async function reloadData() {
        const { data: stations } = await API.get<IStation[]>('stations');

        setStations(stations);
        setStaticStations(stations);
    }

    async function handleStationUpdate(
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

            if (action === 'edit') {
                API.patch(`stations/${editingStation?._id}`, data)
                    .then(() => {
                        reloadData();
                        setEditing(false);
                    })
                    .catch(err => {
                        alert('Não foi possível editar a estação');
                    });
            } else {
                API.post(`stations/`, data)
                    .then(() => {
                        reloadData();
                        setCreating(false);
                    })
                    .catch(() => {
                        alert('Não foi possível criar a estação');
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

    function handleStationDelete() {
        setDeleting(false);
        setDeletingStation(null);

        API.delete(`stations/${deletingStation?._id}`)
            .then(() => {
                reloadData();
            })
            .catch(err => {
                alert('Erro ao excluir!');
            });
    }

    async function handleSelectStation(station: IStation) {
        setEditing(true);
        setEditingStation(station);

        editFormRef.current?.reset();
        editFormRef.current?.setFieldValue('name', station.name);
    }

    useEffect(() => {
        reloadData();
    }, []);

    return (
        <>
            <Container>
                <h2>Gerenciamento das estações</h2>
                <Form onSubmit={handleSearch}>
                    <TextInput
                        name='query'
                        placeholder='Pesquise uma estação...'
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
                        {stations.map(station => (
                            <tr key={station._id}>
                                <td>{station.name}</td>
                                <td>
                                    <MdEdit
                                        onClick={() => {
                                            handleSelectStation(station);
                                        }}
                                        size={24}
                                    />
                                    <MdDeleteForever
                                        onClick={() => {
                                            setDeletingStation(station);
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
                    Nova estação <MdAdd size={20} />
                </Button>
            </Container>
            <Modal
                isVisible={isEditing}
                onClose={() => setEditing(false)}
                width='400px'>
                <ModalBody>
                    <h2>Editar estação</h2>
                    <Form
                        ref={editFormRef}
                        onSubmit={data => handleStationUpdate(data, 'edit')}>
                        <TextInput name='name' placeholder='Nome da estação' />
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
                    <h2>Criar estação</h2>
                    <Form
                        ref={createFormRef}
                        onSubmit={data => handleStationUpdate(data, 'create')}>
                        <TextInput name='name' placeholder='Nome da estação' />
                        <Button type='submit' variant='secondary'>
                            Criar
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
                        Você realmente deseja excluir "{deletingStation?.name}"
                        ?
                    </h3>
                    <ModalActions>
                        <Button
                            variant='secondary'
                            onClick={() => setDeleting(false)}>
                            Não
                        </Button>
                        <Button variant='primary' onClick={handleStationDelete}>
                            Sim, excluir
                        </Button>
                    </ModalActions>
                </ModalBody>
            </Modal>
        </>
    );
};

export default StationsAdmin;
