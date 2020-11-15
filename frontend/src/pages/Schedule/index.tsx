import React, { useState, useEffect, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { useHistory, useLocation } from 'react-router-dom';
import DayPicker, { IDay } from '../../components/DayPicker';
import Input from '../../components/Input';
import Button from '../../components/Input/Button';
import { RangeInput, RangeLabels } from '../../components/Input/Range/indes';
import TimePicker, { ITime } from '../../components/TimePicker';
import { Container, Wrapper, Actions } from './styles';
import * as Yup from 'yup';
import { StageSpinner } from 'react-spinners-kit';
import API from '../../services/api';

interface ILocationState {
    game?: string;
    station?: string;
}

interface IFormData {
    time: string;
    day: IDay;
    horary: ITime;
}

const Schedule: React.FC = () => {
    const history = useHistory();
    const location = useLocation<ILocationState>();
    const formRef = useRef<FormHandles>(null);
    const [isLoading, setLoading] = useState(false);

    async function handleSubmit(data: IFormData) {
        setLoading(true);

        const schema = Yup.object().shape({
            day: Yup.object().required('Selecione um dia!'),
            time: Yup.string().oneOf(
                ['15', '30', '45', '60'],
                'Tempo inválido!'
            ),
        });

        try {
            await schema.validate(data, {
                abortEarly: false,
            });

            const { day, horary, time } = data;
            const { game, station } = location.state;

            API.post('schedules', {
                date: `${day.backendDate} ${horary.hours}:${horary.minutes}`,
                time,
                game,
                station,
            })
                .then(() => {
                    console.log('foi')
                })
                .catch((err) => {
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

    useEffect(() => {
        if (!location.state) {
            history.push('/schedule/game');

            return;
        }
    });

    return (
        <Wrapper>
            <Container
                initial={{ opacity: 0, transform: 'translateX(-200px)' }}
                animate={{ opacity: 1, transform: 'translateX(0px)' }}
                transition={{ duration: 0.5 }}>
                <Form onSubmit={handleSubmit} ref={formRef}>
                    <h1>Agendar</h1>

                    <label>Dia</label>
                    <DayPicker name='day' />

                    <label>Horário</label>

                    <TimePicker name='horary' />

                    <label>Tempo</label>
                    <Input
                        name='time'
                        as={
                            <RangeInput
                                max={60}
                                min={15}
                                step={15}
                                defaultValue={15}
                            />
                        }
                    />
                    <RangeLabels>
                        <span>15 min.</span>
                        <span>30 min.</span>
                        <span>45 min.</span>
                        <span>60 min.</span>
                    </RangeLabels>
                    <Actions>
                        <Button
                            variant='secondary'
                            onClick={() =>
                                history.push('/schedule/station', {
                                    ...location.state,
                                })
                            }>
                            <MdArrowBack />
                            Voltar
                        </Button>
                        <Button
                            type='submit'
                            variant='primary'
                            disabled={isLoading}>
                            {isLoading ? (
                                <StageSpinner size={24} />
                            ) : (
                                <>
                                    Concluir
                                    <MdCheck />
                                </>
                            )}
                        </Button>
                    </Actions>
                </Form>
            </Container>
        </Wrapper>
    );
};

export default Schedule;
