import React, { useEffect, useState } from 'react';
import Routes from './Routes';
import GlobalStyle from './styles/GlobalStyle';
import Auth from './services/auth';
import API from './services/api';
import { IUser, UserContext } from './contexts/User';

function App() {
    const [userData, setUserData] = useState<IUser | null>(null);

    function loadUserData() {
        if (Auth.hasToken()) {
            API.get('users')
                .then(({ data }) => {
                    setUserData({
                        ...data,
                        firstName: data['name'].split(' ')[0],
                    });
                })
                .catch(() => {
                    Auth.destroyToken();
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
