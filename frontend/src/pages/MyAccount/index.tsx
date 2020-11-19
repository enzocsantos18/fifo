import React, { useState, useRef, useContext, useEffect } from 'react';
import { Form } from '@unform/web';
import AvatarPicker from '../../components/AvatarPicker';
import { Container, DeleteAccountText, ReadOnly, ReadOnlyField } from './styles';
import { IAvatarPickerChangeEvent } from './../../components/AvatarPicker';
import API from './../../services/api';
import Button from './../../components/Input/Button';
import { UserContext } from '../../contexts/User';
import { media } from '../../services/media';
import Modal from '../../components/Modal';
import TextInput from '../../components/Input/Text';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { AxiosError } from 'axios';
import { MdSentimentDissatisfied } from 'react-icons/md';
import { StageSpinner } from 'react-spinners-kit';

interface IResetPasswordFormData {
    password: string;
    newPassword: string;
    confirmPassword: string;
}

interface IDeleteAccountFormData {
    password: string;
}

let deleteAccountInterval: number;

const MyAccount: React.FC = () => {
    const userContext = useContext(UserContext);
    const [isChangingPassword, setChangingPassword] = useState(false);
    const [isChangePasswordErrored, setChangePasswordErrored] = useState(false);
    const [isChangePasswordLoading, setChangePasswordLoading] = useState(false);
    const [changePasswordError, setChangePasswordError] = useState('');

    const [isDeletingAccount, setDeletingAccount] = useState(false);
    const [isDeleteAccountErrored, setDeleteAccountErrored] = useState(false);
    const [isDeleteAccountLoading, setDeleteAccountLoading] = useState(false);
    const [deleteAccountError, setDeleteAccountError] = useState('');
    const [deleteAccountTime, setDeleteAccountTime] = useState(15);

    const changePasswordRef = useRef<FormHandles>(null);
    const deleteAccountRef = useRef<FormHandles>(null);

    function handleAvatarChange(e: IAvatarPickerChangeEvent) {
        //Atualizar usuário
    }

    async function handleChangePasswordSubmit(data: IResetPasswordFormData) {
        const schema = Yup.object().shape({
            password: Yup.string().required('Digite a senha atual!'),
            newPassword: Yup.string()
                .required('Digite a nova senha!')
                .min(8, 'A nova senha deve conter no mínimo 8 caracteres!'),
            confirmPassword: Yup.string().oneOf(
                [Yup.ref('newPassword'), undefined],
                'As senhas devem ser iguais!'
            ),
        });

        try {
            setChangePasswordLoading(true);

            await schema.validate(data, {
                abortEarly: false,
            });

            API.post('users/changepassword/', data)
                .then(() => {
                    setChangingPassword(false);
                })
                .catch((err: AxiosError) => {
                    setChangePasswordErrored(true);
                    setChangePasswordError(err.response?.data['error']);
                })
                .finally(() => {
                    setChangePasswordLoading(false);
                });
        } catch (err) {
            const errors: { [path: string]: string } = {};
            err.inner.forEach((error: Yup.ValidationError) => {
                errors[error.path] = error.message;
            });
            changePasswordRef.current?.setErrors(errors);
            setChangePasswordLoading(false);
        }
    }

    async function handleDeleteAcountSubmit(data: IDeleteAccountFormData) {
        const schema = Yup.object().shape({
            password: Yup.string().required('Digite a senha atual!'),
        });

        try {
            setDeleteAccountLoading(true);

            await schema.validate(data, {
                abortEarly: false,
            });

            //Alterar para post no backend
            API.delete('users/')
                .then(() => {
                    setDeletingAccount(false);
                })
                .catch((err: AxiosError) => {
                    setDeleteAccountErrored(true);
                    setDeleteAccountError(err.response?.data['error']);
                })
                .finally(() => {
                    setDeleteAccountLoading(false);
                });
        } catch (err) {
            const errors: { [path: string]: string } = {};
            err.inner.forEach((error: Yup.ValidationError) => {
                errors[error.path] = error.message;
            });
            deleteAccountRef.current?.setErrors(errors);
            setDeleteAccountLoading(false);
        }
    }

    useEffect(() => {
        if (isDeletingAccount) {
            setDeleteAccountTime(15);

            deleteAccountInterval = setInterval(() => {
                setDeleteAccountTime(currentTime => {
                    if (currentTime == 1) {
                        clearInterval(deleteAccountInterval);
                    }

                    return currentTime - 1;
                });
            }, 1e3);
        } else {
            clearInterval(deleteAccountInterval);
        }
    }, [isDeletingAccount]);

    console.log(deleteAccountTime);

    return (
        <>
            <Container>
                <h1>Minha conta</h1>
                <Form onSubmit={() => {}}>
                    <AvatarPicker
                        defaultValue={
                            userContext?.imageURL &&
                            media('user', userContext.imageURL, false)
                        }
                        onChange={handleAvatarChange}
                    />

                    <ReadOnly>
                        <ReadOnlyField>
                            <p>Nome</p>Leonardo Camargo
                        </ReadOnlyField>

                        <ReadOnlyField>
                            <p>Email</p>camargo.leo09@gmail.com
                        </ReadOnlyField>
                    </ReadOnly>

                    <Button variant='light' onClick={() => setChangingPassword(true)}>
                        Alterar senha
                    </Button>
                    <Button variant='light' onClick={() => setDeletingAccount(true)}>
                        <span className='red'>Excluir minha conta</span>
                    </Button>
                </Form>
            </Container>
            <Modal isVisible={isChangingPassword} width='400px' onClose={() => setChangingPassword(false)}>
                <h2>Alterar senha</h2>
                <Form onSubmit={handleChangePasswordSubmit} ref={changePasswordRef}>
                    <TextInput
                        name='password'
                        placeholder='Senha atual'
                        type='password'
                    />
                    <TextInput
                        name='newPassword'
                        placeholder='Nova senha'
                        type='password'
                    />
                    <TextInput
                        name='confirmPassword'
                        placeholder='Confirme sua nova senha'
                        type='password'
                    />
                    <Button
                        type='submit'
                        variant='secondary'
                        disabled={isChangePasswordLoading}>
                        {isChangePasswordLoading ? (
                            <StageSpinner size={24} />
                        ) : (
                            <>Trocar senha</>
                        )}
                    </Button>
                </Form>
            </Modal>
            <Modal isVisible={isChangePasswordErrored}>
                <MdSentimentDissatisfied size={70} />
                <h3>{changePasswordError}</h3>
                <Button onClick={() => setChangePasswordErrored(false)}>OK</Button>
            </Modal>
            <Modal isVisible={isDeletingAccount} width='400px' onClose={() => setDeletingAccount(false)}>
                <h2>Excluir minha conta</h2>
                <DeleteAccountText>
                    <p>Tem certeza que deseja excluir sua conta?</p>
                    <p>Essa ação não poderá ser desfeita!</p>
                </DeleteAccountText>
                <Form onSubmit={handleDeleteAcountSubmit} ref={deleteAccountRef}>
                    <TextInput
                        name='password'
                        placeholder='Confirme sua senha atual'
                        type='password'
                    />
                    <Button
                        type='submit'
                        variant='secondary'
                        disabled={isDeleteAccountLoading || deleteAccountTime > 0}>
                        {isDeleteAccountLoading ? (
                            <StageSpinner size={24} />
                        ) : (
                            <>Excluir ({deleteAccountTime}s)</>
                        )}
                    </Button>
                </Form>
            </Modal>
            <Modal isVisible={isDeleteAccountErrored}>
                <MdSentimentDissatisfied size={70} />
                <h3>{deleteAccountError}</h3>
                <Button onClick={() => setDeletingAccount(false)}>OK</Button>
            </Modal>
        </>
    );
};

export default MyAccount;
