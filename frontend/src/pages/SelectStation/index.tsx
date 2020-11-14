import React from 'react';

import { Wrapper, Container, StationList, Station, Actions } from './styles';
import { MdMemory, MdArrowForward, MdArrowBack } from 'react-icons/md';
import Button from '../../components/Input/Button';

const SelectStation: React.FC = () => {
    return (
        <Wrapper>
            <Container>
                <h1>Aonde você quer jogar?</h1>
                <StationList>
                    <Station>
                        <MdMemory size={100} />
                        <span>Playstation 4 sala 1</span>
                    </Station>
                    <Station>
                        <MdMemory size={100} />
                        <span>Playstation 4 sala 2</span>
                    </Station>
                </StationList>
                <Actions>
                    <Button variant='secondary'>
                        <MdArrowBack />
                        Voltar
                    </Button>
                    <Button variant='primary'>
                        Prosseguir
                        <MdArrowForward />
                    </Button>
                </Actions>
            </Container>
        </Wrapper>
    );
};

export default SelectStation;
