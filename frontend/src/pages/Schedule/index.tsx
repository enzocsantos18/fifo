import React from 'react';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import DayPicker from '../../components/DayPicker';
import Button from '../../components/Input/Button';
import { RangeInput, RangeLabels } from '../../components/Input/Range/indes';
import TimePicker from '../../components/TimePicker';
import { Container, Wrapper, Actions } from './styles';

const Schedule: React.FC = () => {
    const history = useHistory();

    return (
        <Wrapper>
            <Container>
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
                        onClick={() => history.push('/schedule/station')}>
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
