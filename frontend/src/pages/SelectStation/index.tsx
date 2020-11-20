import React, { useState, useEffect } from 'react';
import {
    Wrapper,
    Container,
    StationList,
    Station,
    Actions,
    StationShimmerContainer,
} from './styles';
import { MdPlayArrow, MdArrowBack } from 'react-icons/md';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '../../components/Input/Button';
import API from '../../services/api';
import { LineShimmer } from '../../components/Shimmer';

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
            station: id,
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
            <Container>
                <h1>Aonde você quer jogar?</h1>
                <StationList>
                    {gameStations.length == 0 && (
                        <>
                            {[...Array(2)].map((element, index) => (
                                <StationShimmer key={index} />
                            ))}
                        </>
                    )}
                    {gameStations.map(gameStation => (
                        <Station
                            onClick={() => handleClick(gameStation.station._id)}
                            key={gameStation._id}>
                            <MdPlayArrow size={100} />
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

const StationShimmer: React.FC = () => {
    return (
        <StationShimmerContainer>
            <LineShimmer width='160px' height='140px' />
            <LineShimmer width='160px' height='50px' />
        </StationShimmerContainer>
    );
};

export default SelectStation;
