import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import { Container } from './styles';
import * as Yup from 'yup';
import API from '../../services/api';
import { RouteComponentProps } from 'react-router-dom';
import Auth from '../../services/auth';

interface IFormData {
    name: string;
    email: string;
    password: string;
    password2: string;
}

const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const formRef = useRef<FormHandles>(null);

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
            await schema.validate(data, {
                abortEarly: false,
            });

            API.post('/users', data)
                .then(() => {
                    API.post('/auth/login', {
                        email: data.email,
                        password: data.password,
                    })
                        .then(({ data }) => {
                            Auth.setToken(data['token']);
                        })
                        .catch(err => {
                            console.error(err);
                        })
                        .finally(() => {
                            history.push('/');
                        });
                })
                .catch(err => {
                    console.error(err);
                });
        } catch (err) {
            const errors: { [path: string]: string } = {};
            err.inner.forEach((error: Yup.ValidationError) => {
                errors[error.path] = error.message;
            });
            formRef.current?.setErrors(errors);
        }
    }

    return (
        <Container>
            <Form
                ref={formRef}
                onSubmit={handleSubmit}
                style={{
                    /*
                     *      Estilização apenas para teste
                     */
                    display: 'flex',
                    flexDirection: 'column',
                    width: '300px',
                }}>
                <label>Qual é seu nome?</label>
                <Input name='name' as={<input type='text' />} />
                <label>Seu melhor email</label>
                <Input name='email' as={<input type='text' />} />
                <label>Sua senha</label>
                <Input name='password' as={<input type='password' />} />
                <label>Confirme sua senha</label>
                <Input name='password2' as={<input type='password' />} />
                <button type='submit'>Criar conta</button>
            </Form>
        </Container>
    );
};

export default Register;
