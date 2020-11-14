import React from 'react';
import { Wrapper, Container, StationList, Station, Actions } from './styles';
import { MdMemory, MdArrowBack } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Input/Button';

const stations = [
    {
        name: 'PS4 Sala 1',
    },
    {
        name: 'PS4 Sala 2',
    },
];

const SelectStation: React.FC = () => {
    const history = useHistory();

    function handleClick(name: string) {
        history.push('/schedule/final', {
            name,
        });
    }

    return (
        <Wrapper>
            <Container>
                <h1>Aonde você quer jogar?</h1>
                <StationList>
                    {stations.map(station => (
                        <Station
                            onClick={() => handleClick(station.name)}
                            key={station.name}>
                            <MdMemory size={100} />
                            <span>{station.name}</span>
                        </Station>
                    ))}
                </StationList>
                <Actions>
                    <Button
                        variant='secondary'
                        onClick={() => history.push('/schedule/game')}>
                        <MdArrowBack />
                        Voltar
                    </Button>
                </Actions>
            </Container>
        </Wrapper>
    );
};

export default SelectStation;
