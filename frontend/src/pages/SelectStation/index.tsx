import React, { useState, useEffect } from 'react';
import { Wrapper, Container, StationList, Station, Actions } from './styles';
import { MdMemory, MdArrowBack } from 'react-icons/md';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '../../components/Input/Button';
import API from '../../services/api';

interface ILocationState {
    game?: string;
}

interface IGameStation {
    _id: string;
    station: IStation;
}

interface IStation {
    _id: string;
    name: string;
}

const SelectStation: React.FC = () => {
    const history = useHistory();
    const location = useLocation<ILocationState>();
    const [gameStations, setGameStations] = useState<IGameStation[]>([]);

    function handleClick(id: string) {
        history.push('/schedule/final', {
            game: location.state.game,
            station: id
        });
    }

    useEffect(() => {
        if (!location.state) {
            history.push('/schedule/game');

            return;
        }

        API.get(`games/${location.state.game}/stations`).then(({ data }) => {
            setGameStations(data);
        });
    }, []);

    return (
        <Wrapper>
            <Container
                initial={{ opacity: 0, transform: 'translateX(-100px)' }}
                animate={{ opacity: 1, transform: 'translateX(0px)' }}
                transition={{ duration: 0.5 }}>
                <h1>Aonde você quer jogar?</h1>
                <StationList>
                    {gameStations.map(gameStation => (
                        <Station
                            onClick={() => handleClick(gameStation.station._id)}
                            key={gameStation._id}>
                            <MdMemory size={100} />
                            <span>{gameStation.station.name}</span>
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
