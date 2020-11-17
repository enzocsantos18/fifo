import React from 'react';
import Routes from './Routes';
import GlobalStyle from './styles/GlobalStyle';
import Nav from './components/Nav/index';

function App() {
    return (
        <>
            <Nav />
            <Routes />
            <GlobalStyle />
        </>
    );
}

export default App;
