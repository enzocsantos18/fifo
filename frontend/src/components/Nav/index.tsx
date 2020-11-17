import React, { useContext } from 'react';
import { MdExpandMore } from 'react-icons/md';
import { UserContext } from '../../contexts/User';
import { media } from '../../services/media';
import Dropdown from '../Dropdown';
import ProfileAvatar from '../ProfileAvatar';
import { CircleShimmer, LineShimmer } from '../Shimmer';

import {
    Content,
    Container,
    LinkList,
    LinkItem,
    ProfileContainer,
    ProfileContainerShimmerContainer,
} from './styles';

const Nav: React.FC = () => {
    const userData = useContext(UserContext);

    return (
        <Container>
            <Content>
                <LinkList>
                    <LinkItem to='/account/schedules'>Meus horários</LinkItem>
                    <LinkItem to='/schedule/game'>Agendar</LinkItem>
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
                    {userData ? (
                        <ProfileContainer>
                            <span>{userData.firstName}</span>
                            <div>
                                <ProfileAvatar
                                    imageURL={
                                        userData.imageURL &&
                                        media('user', userData.imageURL, true)
                                    }
                                />
                                <MdExpandMore size={24} />
                            </div>
                        </ProfileContainer>
                    ) : (
                        <ProfileContainerShimmerContainer>
                            <LineShimmer width='90px' />
                            <div>
                                <CircleShimmer width='50px' height='50px' />
                                <CircleShimmer width='24px' height='24px' />
                            </div>
                        </ProfileContainerShimmerContainer>
                    )}
                </Dropdown>
            </Content>
        </Container>
    );
};

export default Nav;
