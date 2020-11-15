import React, { useEffect } from 'react';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { useHistory, useLocation } from 'react-router-dom';
import DayPicker from '../../components/DayPicker';
import Button from '../../components/Input/Button';
import { RangeInput, RangeLabels } from '../../components/Input/Range/indes';
import TimePicker from '../../components/TimePicker';
import { Container, Wrapper, Actions } from './styles';

interface ILocationState {
    game?: string;
    station?: string;
}

const Schedule: React.FC = () => {
    const history = useHistory();
    const location = useLocation<ILocationState>();

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
                <h1>Agendar</h1>

                <label>Dia</label>
                <DayPicker />

                <label>Horário</label>
                <TimePicker />
                <label>Tempo</label>
                <RangeInput max={60} min={15} step={15} defaultValue={15} />
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
                    <Button variant='primary'>
                        Concluir
                        <MdCheck />
                    </Button>
                </Actions>
            </Container>
        </Wrapper>
    );
};

export default Schedule;
