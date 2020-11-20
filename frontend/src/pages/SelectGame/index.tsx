import React, { useState, useEffect, useCallback } from 'react';
import { MdSearch } from 'react-icons/md';
import TextInput from '../../components/Input/Text';
import {
    Wrapper,
    Container,
    GameList,
    GameBanner,
    GameBannerShimmerContainer,
} from './styles';
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';
import { CircleSpinner } from 'react-spinners-kit';
import API from '../../services/api';
import { media } from '../../services/media';
import { Form } from '@unform/web';
import { LineShimmer } from '../../components/Shimmer/';

interface IGame {
    _id: string;
    name: string;
    imageURL: string;
}

const SelectGame: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setSearching] = useState(false);
    const [staticGames, setStaticGames] = useState<IGame[]>([]);
    const [games, setGames] = useState<IGame[]>([]);
    const history = useHistory();

    function handleClick(id: string) {
        history.push('/schedule/station', {
            game: id,
        });
    }

    function loadGames() {
        API.get('games')
            .then(({ data }) => {
                setStaticGames(data);
                setGames(data);
            })
            .catch(err => {
                alert('Não foi possível carregar os jogos!');
            });
    }

    function search() {
        setSearching(false);

        if (staticGames.length === 0) {
            return;
        }

        if (searchQuery === '') {
            setGames(staticGames);
            return;
        }

        const searchedGames = staticGames.filter(game =>
            game.name.toLowerCase().includes(searchQuery)
        );

        setGames(searchedGames);
    }

    const searchCallback = useCallback(debounce(search, 500), [searchQuery]);

    useEffect(loadGames, []);

    useEffect(() => {
        setSearching(true);
        searchCallback();

        return searchCallback.cancel;
    }, [searchQuery, searchCallback]);

    return (
        <Wrapper>
            <Container>
                <h1>Qual jogo você quer jogar?</h1>
                <Form onSubmit={search}>
                    <TextInput
                        name='game'
                        placeholder='Pesquise um jogo...'
                        onChange={e =>
                            setSearchQuery(e.target.value.toLowerCase())
                        }
                        icon={
                            isSearching ? (
                                <CircleSpinner size={20} color='#626770' />
                            ) : (
                                <MdSearch size={20} />
                            )
                        }
                    />
                </Form>
                <GameList>
                    {staticGames.length == 0 ? (
                        <>
                            {[...Array(5)].map((element, index) => (
                                <GameBannerShimmer key={index} />
                            ))}
                        </>
                    ) : (
                        <>
                            {games.map(game => (
                                <GameBanner
                                    onClick={() => handleClick(game._id)}
                                    key={game.name}>
                                    <img src={media('game', game.imageURL)} />
                                </GameBanner>
                            ))}
                        </>
                    )}
                </GameList>
            </Container>
        </Wrapper>
    );
};

const GameBannerShimmer: React.FC = () => {
    return (
        <GameBannerShimmerContainer>
            <LineShimmer height='200px' width='150px' />
        </GameBannerShimmerContainer>
    );
};

export default SelectGame;
