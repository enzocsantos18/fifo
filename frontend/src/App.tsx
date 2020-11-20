import React, { useEffect, useState } from 'react';
import Routes from './Routes';
import GlobalStyle from './styles/GlobalStyle';
import Auth from './services/auth';
import API from './services/api';
import { IUser, UserContext } from './contexts/User';
import { shortName } from './util';

function App() {
    const [userData, setUserData] = useState<IUser | null>(null);

    function loadUserData() {
        if (Auth.hasToken()) {
            API.get('users')
                .then(({ data }) => {
                    setUserData({
                        ...data,
                        shortName: shortName(data['name']),
                    });
                })
                .catch(() => {
                    Auth.destroyToken();
                    window.location.reload();
                });
        }
    }

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <UserContext.Provider value={userData}>
            <Routes />
            <GlobalStyle />
        </UserContext.Provider>
    );
}

export default App;
