import React from 'react';

import { Wrapper, Container } from './styles';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import API from '../../services/api';
import Auth from '../../services/auth';
import TextInput from '../../components/Input/Text';
import { MdArrowForward, MdDrafts } from 'react-icons/md';
import Button from '../../components/Input/Button';

interface IFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    function handleSubmit(data: IFormData) {

        console.log(data);
        return;
        API.post('auth/login/', {
            email: data.email,
            password: data.password,
        })
            .then(({ data }) => {
                Auth.setToken(data['token']);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleLogout() {
        Auth.destroyToken();
    }

    return (
        <Wrapper>
            <Container>
                <h1>Login</h1>
                <h2>Olá, faça login no FIFO</h2>
                <Form onSubmit={handleSubmit}>
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
                    <Button type='submit'>
                        Fazer Login <MdArrowForward />
                    </Button>
                    <div className='center'>
                        <a href='/register'>
                            Não tem uma conta? crie uma agora
                        </a>
                    </div>
                </Form>
            </Container>
        </Wrapper>
    );
};

export default Login;
