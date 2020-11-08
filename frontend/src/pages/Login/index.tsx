import React from 'react';

import { Container } from './styles';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import API from '../../services/api';
import Auth from '../../services/auth';

interface IFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    function handleSubmit(data: IFormData) {
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
        <Container>
            {Auth.hasToken() ? (
                <button onClick={handleLogout}>Deslogar</button>
            ) : (
                <Form onSubmit={handleSubmit}>
                    <Input name='email' as={<input type='text' />} />
                    <Input name='password' as={<input type='password' />} />
                    <button type='submit'>Logar</button>
                </Form>
            )}
        </Container>
    );
};

export default Login;
