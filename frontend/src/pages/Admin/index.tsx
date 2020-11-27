import React, { useState } from 'react';
import { MdPlace, MdPlayCircleFilled } from 'react-icons/md';

import { Container, Tab, Content, TabItem } from './styles';
import GamesAdmin from './Games';
import StationsAdmin from './Stations';

const Admin: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState('stations');

    return (
        <Container>
            <Tab>
                <TabItem
                    selected={selectedTab === 'games'}
                    onClick={() => setSelectedTab('games')}>
                    <MdPlayCircleFilled size={24} />
                    Jogos
                </TabItem>
                <TabItem
                    selected={selectedTab === 'stations'}
                    onClick={() => setSelectedTab('stations')}>
                    <MdPlace size={24} /> Estações
                </TabItem>
            </Tab>
            <Content>
                {selectedTab === 'games' && <GamesAdmin />}
                {selectedTab === 'stations' && <StationsAdmin />}
            </Content>
        </Container>
    );
};

export default Admin;
