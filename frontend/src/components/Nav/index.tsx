import React, { useState, useContext, useEffect } from 'react';
import { MdAccountCircle, MdExpandMore, MdClose, MdWatchLater, MdBuild } from 'react-icons/md';
import { UserContext } from '../../contexts/User';
import Auth from '../../services/auth';
import { media } from '../../services/media';
import Dropdown from '../Dropdown';
import ProfileAvatar from '../ProfileAvatar';
import { CircleShimmer, LineShimmer } from '../Shimmer';

import { IItem } from './../Dropdown/';
import { Content, Container, LinkList, ProfileContainer, ProfileContainerShimmerContainer } from './styles';

const Nav: React.FC = () => {
    const [dropdownItems, setDropdownItems] = useState<IItem[]>([]);
    const userData = useContext(UserContext);

    function handleLogout() {
        Auth.destroyToken();
        window.location.reload();
    }

    useEffect(() => {
        const items = [
            {
                text: 'Fila',
                route: '/',
                icon: <MdWatchLater size={20} />,
            },
            {
                text: 'Minha conta',
                route: '/account/settings',
                icon: <MdAccountCircle size={20} />,
            },
            {
                text: 'Sair',
                icon: <MdClose size={20} />,
                onClick: handleLogout,
            },
        ] as IItem[];

        if (userData?.isAdmin) {
            items.splice(2, 0, {
                text: 'Administração',
                route: '/admin',
                icon: <MdBuild size={20} />,
            });
        }

        setDropdownItems(items);
    }, [userData]);

    return (
        <Container>
            <Content>
                <LinkList></LinkList>
                <Dropdown top='70px' width='180px' items={dropdownItems}>
                    {userData ? (
                        <ProfileContainer>
                            <span>{userData.shortName}</span>
                            <div>
                                <ProfileAvatar
                                    imageURL={userData.imageURL && media('user', userData.imageURL, true)}
                                    username={userData.name}
                                    showBorder={true}
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
