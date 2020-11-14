import React from 'react';
import { MdSearch } from 'react-icons/md';
import TextInput from '../../components/Input/Text';
import { Wrapper, Container, GameList, GameBanner } from './styles';

const games = [
    {
        name: 'FIFA 20',
        imageUrl:
            'https://images-na.ssl-images-amazon.com/images/I/61UuGXhNqdL._SL1000_.jpg',
    },
    {
        name: 'Minecraft',
        imageUrl:
            'https://images-na.ssl-images-amazon.com/images/I/71AKO%2BU6F6L._SL1000_.jpg',
    },
];

const SelectGame: React.FC = () => {
    return (
        <Wrapper>
            <Container>
                <h1>Qual jogo você quer jogar?</h1>
                <TextInput
                    placeholder='Pesquise um jogo...'
                    icon={<MdSearch size={20} />}
                />
                <GameList>
                    {games.map(game => (
                        <GameBanner key={game.name}>
                            <img src={game.imageUrl} />
                        </GameBanner>
                    ))}
                </GameList>
            </Container>
        </Wrapper>
    );
};

export default SelectGame;
