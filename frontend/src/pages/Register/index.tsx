import React, { useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Wrapper, Container } from './styles';
import * as Yup from 'yup';
import API from '../../services/api';
import Auth from '../../services/auth';
import { useHistory } from 'react-router-dom';
import TextInput from './../../components/Input/Text';
import Button from './../../components/Input/Button';
import {
    MdAccountCircle,
    MdArrowForward,
    MdDrafts,
    MdSentimentDissatisfied,
} from 'react-icons/md';
import AvatarPicker from '../../components/AvatarPicker';
import Modal from '../../components/Modal';
import { AxiosError } from 'axios';
import { StageSpinner } from 'react-spinners-kit';

interface IFormData {
    name: string;
    email: string;
    password: string;
    password2: string;
    image: File;
}

const Register: React.FC = () => {
    const history = useHistory();
    const formRef = useRef<FormHandles>(null);
    const [error, setError] = useState('');
    const [isErrored, setErrored] = useState(false);
    const [isLoading, setLoading] = useState(false);

    async function handleSubmit(data: IFormData) {
        const schema = Yup.object().shape({
            name: Yup.string()
                .required('O nome deve ser inserido!')
                .min(5, 'Digite seu nome completo!'),
            email: Yup.string()
                .required('O email deve ser inserido!')
                .email('Email inválido!'),
            password: Yup.string()
                .required('A senha deve ser inserida!')
                .min(8, 'A senha deve ter no mínimo 8 caracteres!'),
            password2: Yup.string().oneOf(
                [Yup.ref('password'), undefined],
                'As senhas devem ser iguais!'
            ),
        });

        try {
            setLoading(true);

            await schema.validate(data, {
                abortEarly: false,
            });

            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('image', data.image);

            API.post('/users', formData)
                .then(() => {
                    API.post('/auth/login', {
                        email: data.email,
                        password: data.password,
                    })
                        .then(({ data }) => {
                            Auth.setToken(data['token']);
                            window.location.reload();
                        })
                        .catch(err => {
                            setError('Não foi possível fazer login!');
                            setErrored(true);
                        })
                        .finally(() => {
                            history.push('/');
                            setLoading(false);
                        });
                })
                .catch((err: AxiosError) => {
                    setError(err.response?.data['error']);
                    setErrored(true);
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
                    <h1>Criar conta</h1>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <AvatarPicker name='image' />
                        <TextInput
                            name='name'
                            placeholder='Seu nome'
                            type='text'
                            icon={<MdAccountCircle size={20} />}
                        />
                        <TextInput
                            name='email'
                            placeholder='Seu melhor email'
                            type='text'
                            icon={<MdDrafts size={20} />}
                        />
                        <TextInput
                            name='password'
                            placeholder='Sua senha'
                            type='password'
                        />
                        <TextInput
                            name='password2'
                            placeholder='Confirme sua senha'
                            type='password'
                        />
                        <Button type='submit' variant='secondary' disabled={isLoading}>
                            {isLoading ? (
                                <StageSpinner size={24} />
                            ) : (
                                <>
                                    Cadastrar <MdArrowForward />
                                </>
                            )}
                        </Button>
                        <div className='center'>
                            <a href='/login'>Já tem uma conta? clique para fazer login</a>
                        </div>
                    </Form>
                </Container>
            </Wrapper>
            <Modal isVisible={isErrored}>
                <MdSentimentDissatisfied size={70} />
                <h3>Não foi possível realizar o cadastro:</h3>
                <span>{error}</span>
                <Button onClick={() => setErrored(false)}>OK</Button>
            </Modal>
        </>
    );
};

export default Register;
