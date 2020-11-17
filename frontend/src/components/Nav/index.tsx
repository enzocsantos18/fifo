import React from 'react';
import { MdExpandMore } from 'react-icons/md';
import Dropdown from '../Dropdown';

import {
    Content,
    Container,
    LinkList,
    LinkItem,
    ProfileContainer,
    ProfileAvatar,
} from './styles';

const Nav: React.FC = () => {
    return (
        <Container>
            <Content>
                <LinkList>
                    <LinkItem href='/account/schedules'>Meus horários</LinkItem>
                    <LinkItem href='/schedule/game'>Agendar</LinkItem>
                </LinkList>
                <Dropdown
                    top='70px'
                    width='150px'
                    items={[
                        {
                            text: 'Meus horários',
                        },
                        {
                            text: 'Fila - ao vivo',
                        },
                        {
                            text: 'Minha conta',
                        },
                        {
                            text: 'Sair',
                        },
                    ]}>
                    <ProfileContainer>
                        <span>Leonardo C.</span>
                        <div>
                            <ProfileAvatar></ProfileAvatar>
                            <MdExpandMore size={24} />
                        </div>
                    </ProfileContainer>
                </Dropdown>
            </Content>
        </Container>
    );
};

export default Nav;
