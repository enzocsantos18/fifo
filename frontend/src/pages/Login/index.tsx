import React, { useRef, useState } from 'react';

import { Wrapper, Container } from './styles';
import { Form } from '@unform/web';
import API from '../../services/api';
import Auth from '../../services/auth';
import TextInput from '../../components/Input/Text';
import { MdArrowForward, MdDrafts } from 'react-icons/md';
import Button from '../../components/Input/Button';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { StageSpinner } from 'react-spinners-kit';
import Modal from '../../components/Modal';

interface IFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [isLoading, setLoading] = useState(false);
    const formRef = useRef<FormHandles>(null);

    async function handleSubmit(data: IFormData) {
        const schema = Yup.object().shape({
            email: Yup.string()
                .required('Digite o email!')
                .email('Digite um email válido!'),
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
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (err) {
            const errors: { [path: string]: string } = {};
            err.inner.forEach((error: Yup.ValidationError) => {
                errors[error.path] = error.message;
            });
            formRef.current?.setErrors(errors);
            setLoading(false);
        }
    }

    return (
        <>
            <Wrapper>
                <Container>
                    <h1>Login</h1>
                    <h2>Olá, faça login no FIFO</h2>
                    <Form onSubmit={handleSubmit} ref={formRef}>
                        <TextInput
                            name='email'
                            type='text'
                            placeholder='Seu email'
                            icon={<MdDrafts size={20} />}
                        />

                        <TextInput
                            name='password'
                            type='password'
                            placeholder='Sua senha'
                            icon={<MdDrafts size={20} />}
                        />

                        <a className='right'>Esqueci minha senha</a>
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
                            <a href='/register'>
                                Não tem uma conta? crie uma agora
                            </a>
                        </div>
                    </Form>
                </Container>
            </Wrapper>
            <Modal isVisible={true}></Modal>
        </>
    );
};

export default Login;
