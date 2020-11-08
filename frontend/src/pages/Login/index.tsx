import React from 'react';

import { Container } from './styles';
import { Form } from '@unform/web';
import Input from '../../components/Input';

interface IFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    function handleSubmit(data: IFormData) {
        console.log(data);
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Input name='email' as={<input type='text' />} />
                <Input name='password' as={<input type='password' />} />
                <button type='submit'>Logar</button>
            </Form>
        </Container>
    );
};

export default Login;
