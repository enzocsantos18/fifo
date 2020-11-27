import React, { useRef, useState } from 'react';

import { Wrapper, Container } from './styles';
import { Form } from '@unform/web';
import API from '../../services/api';
import Auth from '../../services/auth';
import TextInput from '../../components/Input/Text';
import { MdArrowForward, MdDrafts, MdSentimentDissatisfied, MdSentimentSatisfied } from 'react-icons/md';
import Button from '../../components/Input/Button';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { StageSpinner } from 'react-spinners-kit';
import Modal from '../../components/Modal';

interface ILoginFormData {
    email: string;
    password: string;
}

interface IForgotPasswordFormData {
    email: string;
}

const Login: React.FC = () => {
    const [isLoading, setLoading] = useState(false);
    const [isErrored, setErrored] = useState(false);
    const loginFormRef = useRef<FormHandles>(null);
    const forgotPasswordFormRef = useRef<FormHandles>(null);

    const [isForgotModalVisible, setForgotModalVisible] = useState(false);
    const [isForgotPasswordLoading, setForgotPasswordLoading] = useState(false);
    const [isForgotPasswordErrored, setForgotPasswordErrored] = useState(false);
    const [isForgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);

    async function handleSubmit(data: ILoginFormData) {
        const schema = Yup.object().shape({
            email: Yup.string().required('Digite o email!').email('Digite um email válido!'),
            password: Yup.string().required('Digite a senha!'),
        });

        try {
            setLoading(true);

            await schema.validate(data, {
                abortEarly: false,
            });

            API.post('auth/login/', {
                email: data.email,
                password: data.password,
            })
                .then(({ data }) => {
                    Auth.setToken(data['token']);
                    window.location.assign('/');
                })
                .catch(err => {
                    setErrored(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (err) {
            const errors: { [path: string]: string } = {};
            err.inner.forEach((error: Yup.ValidationError) => {
                errors[error.path] = error.message;
            });
            loginFormRef.current?.setErrors(errors);
            setLoading(false);
        }
    }

    async function handleForgotPasswordSubmit(data: IForgotPasswordFormData) {
        const schema = Yup.object().shape({
            email: Yup.string().required('Digite o email!').email('Digite um email válido!'),
        });

        try {
            setForgotPasswordLoading(true);

            await schema.validate(data, {
                abortEarly: false,
            });

            API.post('users/forgotpassword', {
                email: data.email,
            })
                .then(() => {
                    setForgotPasswordSuccess(true);
                })
                .catch(err => {
                    setForgotPasswordErrored(true);
                })
                .finally(() => {
                    setForgotPasswordLoading(false);
                });
        } catch (err) {
            const errors: { [path: string]: string } = {};
            err.inner.forEach((error: Yup.ValidationError) => {
                errors[error.path] = error.message;
            });
            forgotPasswordFormRef.current?.setErrors(errors);
            setForgotPasswordLoading(false);
        }
    }

    return (
        <>
            <Wrapper>
                <Container>
                    <h1>Login</h1>
                    <Form onSubmit={handleSubmit} ref={loginFormRef}>
                        <TextInput name='email' type='text' placeholder='Seu email' icon={<MdDrafts size={20} />} />

                        <TextInput name='password' type='password' placeholder='Sua senha' />

                        <a className='right' onClick={() => setForgotModalVisible(true)}>
                            Esqueci minha senha
                        </a>
                        <Button type='submit' disabled={isLoading}>
                            {isLoading ? (
                                <StageSpinner size={24} />
                            ) : (
                                <>
                                    Fazer Login <MdArrowForward />
                                </>
                            )}
                        </Button>
                        <div className='center'>
                            <a href='/register'>Não tem uma conta? crie uma agora</a>
                        </div>
                    </Form>
                </Container>
            </Wrapper>
            <Modal isVisible={isErrored}>
                <MdSentimentDissatisfied size={70} />
                <h3>Usuário ou senha inválidos!</h3>
                <Button onClick={() => setErrored(false)}>OK</Button>
            </Modal>
            <Modal isVisible={isForgotModalVisible} onClose={() => setForgotModalVisible(false)} width='400px'>
                <h3>Esqueci minha senha</h3>
                <Form onSubmit={handleForgotPasswordSubmit} ref={forgotPasswordFormRef}>
                    <TextInput name='email' type='text' placeholder='Digite seu email' icon={<MdDrafts size={20} />} />
                    <Button type='submit' variant='secondary' disabled={isForgotPasswordLoading}>
                        {isForgotPasswordLoading ? <StageSpinner size={24} /> : <>Enviar recuperação de senha</>}
                    </Button>
                </Form>
            </Modal>
            <Modal isVisible={isForgotPasswordErrored}>
                <MdSentimentDissatisfied size={70} />
                <h3>Usuário não encontrado!</h3>
                <Button onClick={() => setForgotPasswordErrored(false)}>OK</Button>
            </Modal>
            <Modal isVisible={isForgotPasswordSuccess}>
                <MdSentimentSatisfied size={70} />
                <h3>O link de recuperação de senha foi enviado em seu email!</h3>
                <Button
                    onClick={() => {
                        setForgotPasswordSuccess(false);
                        setForgotModalVisible(false);
                    }}>
                    OK
                </Button>
            </Modal>
        </>
    );
};

export default Login;
