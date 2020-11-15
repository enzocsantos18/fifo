import React, { useState, useEffect, useCallback } from 'react';
import { MdSearch } from 'react-icons/md';
import TextInput from '../../components/Input/Text';
import { Wrapper, Container, GameList, GameBanner } from './styles';
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';
import { CircleSpinner } from 'react-spinners-kit';
import API from '../../services/api';
import { media } from '../../services/media';

interface IGame {
    name: string;
    imageURL: string;
}

const SelectGame: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setSearching] = useState(false);
    const [staticGames, setStaticGames] = useState<IGame[]>([]);
    const [games, setGames] = useState<IGame[]>([]);
    const history = useHistory();

    function handleClick(name: string) {
        history.push('/schedule/station', {
            name,
        });
    }

    function loadGames() {
        API.get('games')
            .then(({ data }) => {
                setStaticGames(data);
            })
            .catch(err => {
                alert('Não foi possível carregar os jogos!');
            });
    }

    function search() {
        setSearching(false);
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

    useEffect(() => {
        setSearching(true);
        searchCallback();

        return searchCallback.cancel;
    }, [searchQuery, searchCallback]);

    useEffect(loadGames, []);

    return (
        <Wrapper>
            <Container>
                <h1>Qual jogo você quer jogar?</h1>
                <TextInput
                    placeholder='Pesquise um jogo...'
                    onChange={e => setSearchQuery(e.target.value.toLowerCase())}
                    icon={
                        isSearching ? (
                            <CircleSpinner size={20} color='#626770' />
                        ) : (
                            <MdSearch size={20} />
                        )
                    }
                />
                <GameList>
                    {games.map(game => (
                        <GameBanner
                            onClick={() => handleClick(game.name)}
                            key={game.name}>
                            <img src={media(game.imageURL)} />
                        </GameBanner>
                    ))}
                </GameList>
            </Container>
        </Wrapper>
    );
};

export default SelectGame;
