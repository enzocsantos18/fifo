import React, { useState, useContext, useEffect, useRef } from 'react';
import { MdAccountCircle, MdExpandMore, MdClose, MdWatchLater, MdBuild, MdMenu } from 'react-icons/md';
import { UserContext } from '../../contexts/User';
import Auth from '../../services/auth';
import { media } from '../../services/media';
import Dropdown from '../Dropdown';
import ProfileAvatar from '../ProfileAvatar';
import { CircleShimmer, LineShimmer } from '../Shimmer';

import { IItem } from './../Dropdown/';
import { Link } from 'react-router-dom';

import {
    Content,
    Container,
    LinkList,
    ProfileContainer,
    ProfileContainerShimmerContainer,
    Sidebar,
    SidebarItem,
    SidebarContent,
    MobileMenu,
} from './styles';

const sidebarVariants = {
    open: {
        right: '0px',
        opacity: 1,
        transition: {
            ease: 'easeInOut',
            duration: 0,
        },
    },
    closed: {
        right: '-100%',
        opacity: 0,
    },
};

const Nav: React.FC = () => {
    const [dropdownItems, setDropdownItems] = useState<IItem[]>([]);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const userData = useContext(UserContext);

    function handleLogout() {
        Auth.destroyToken();
        window.location.reload();
    }

    function handleClickOutside(e: MouseEvent) {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target as Element)) {
            setSidebarVisible(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
        <>
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
                <MobileMenu>
                    <MdMenu size={36} onClick={() => setSidebarVisible(true)} />
                </MobileMenu>
            </Container>
            <Sidebar variants={sidebarVariants} animate={isSidebarVisible ? 'open' : 'closed'}>
                {userData && (
                    <SidebarContent ref={sidebarRef}>
                        <ProfileAvatar
                            imageURL={userData.imageURL && media('user', userData.imageURL, true)}
                            username={userData.name}
                            size={65}
                        />
                        {dropdownItems.map(item => (
                            <SidebarItem onClick={item.onClick}>
                                {item.icon && item.icon}
                                {item.route ? <Link to={item.route}>{item.text}</Link> : <span>{item.text}</span>}
                            </SidebarItem>
                        ))}
                    </SidebarContent>
                )}
            </Sidebar>
        </>
    );
};

export default Nav;
