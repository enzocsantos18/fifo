import React, { useRef, useState } from 'react';

import { Wrapper, Container } from './styles';
import { Form } from '@unform/web';
import API from '../../services/api';
import TextInput from '../../components/Input/Text';
import { MdSentimentDissatisfied, MdSentimentSatisfied } from 'react-icons/md';
import Button from '../../components/Input/Button';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { StageSpinner } from 'react-spinners-kit';
import Modal from '../../components/Modal';
import { useParams, useHistory } from 'react-router-dom';

interface IRouteParams {
    token: string;
}

interface IFormData {
    password: string;
    password2: string;
}

const ResetPassword: React.FC = () => {
    const [isLoading, setLoading] = useState(false);
    const [isErrored, setErrored] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const formRef = useRef<FormHandles>(null);

    const { token } = useParams<IRouteParams>();
    const history = useHistory();

    async function handleSubmit(data: IFormData) {
        const schema = Yup.object().shape({
            password: Yup.string().required('Digite a senha').min(8, 'A nova senha deve conter no mínimo 8 caracteres'),
            password2: Yup.string().oneOf([Yup.ref('password'), undefined], 'As senhas não são iguais'),
        });

        try {
            setLoading(true);

            await schema.validate(data, {
                abortEarly: false,
            });

            API.post(`users/resetpassword/${token}`, {
                password: data.password,
                confirmPassword: data.password2,
            })
                .then(() => {
                    setSuccess(true);
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
            formRef.current?.setErrors(errors);
            setLoading(false);
        }
    }

    return (
        <>
            <Wrapper>
                <Container>
                    <h1>Recuperar senha</h1>
                    <Form onSubmit={handleSubmit} ref={formRef}>
                        <TextInput name='password' placeholder='Digite a nova senha' type='password' />
                        <TextInput name='password2' placeholder='Confirme a nova senha' type='password' />
                        <Button type='submit' disabled={isLoading} variant='secondary'>
                            {isLoading ? <StageSpinner size={24} /> : <>Trocar senha</>}
                        </Button>
                    </Form>
                </Container>
            </Wrapper>
            <Modal isVisible={isErrored}>
                <MdSentimentDissatisfied size={70} />
                <h3>Token expirado ou inválido!</h3>
                <Button onClick={() => setErrored(false)}>OK</Button>
            </Modal>
            <Modal isVisible={isSuccess}>
                <MdSentimentSatisfied size={70} />
                <h3>Senha trocada com sucesso!</h3>
                <Button
                    onClick={() => {
                        setSuccess(false);
                        history.push('/login');
                    }}>
                    Logar
                </Button>
            </Modal>
        </>
    );
};

export default ResetPassword;
