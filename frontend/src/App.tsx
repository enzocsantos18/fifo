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
                    const nameParts = data['name'].split(' ');

                    const shortName =
                        nameParts.length > 1
                            ? `${
                                  nameParts[0]
                              } ${(nameParts[1][0] as string).toUpperCase()}.`
                            : nameParts[0];
                            
                    setUserData({
                        ...data,
                        shortName,
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
