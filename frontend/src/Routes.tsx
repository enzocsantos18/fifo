import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Switch, Route, RouteProps, Redirect } from 'react-router-dom';
import Nav from './components/Nav';
import Login from './pages/Login';
import Register from './pages/Register';
import Schedule from './pages/Schedule';
import SelectGame from './pages/SelectGame';
import SelectStation from './pages/SelectStation';
import Auth from './services/auth';
import MyAccount from './pages/MyAccount';
import Queue from './pages/Queue';
import Admin from './pages/Admin';
import { UserContext } from './contexts/User';

interface IPageProps {
    title?: string;
}

const Page: React.FC<IPageProps> = ({ title, children }) => {
    useEffect(() => {
        document.title = title || '';
    }, [title]);

    return <>{children}</>;
};

const PrivateRoute: React.FC<RouteProps & IPageProps> = props => {
    if (!Auth.hasToken()) {
        const component = () => <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        return <Route {...props} component={component} />;
    }

    return (
        <>
            <Nav />
            <Page title={props.title}>
                <Route {...props} />
            </Page>
        </>
    );
};

const GuestRoute: React.FC<RouteProps & IPageProps> = props => {
    if (Auth.hasToken()) {
        const component = () => <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
        return <Route {...props} component={component} />;
    }
    return (
        <Page title={props.title}>
            <Route {...props} />
        </Page>
    );
};

const AdminRoute: React.FC<RouteProps & IPageProps> = props => {
    const userContext = useContext(UserContext);

    if (!userContext?.isAdmin) {
        const component = () => <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
        return <Route {...props} component={component} />;
    }

    return (
        <>
            <Nav />
            <Page title={props.title}>
                <Route {...props} />
            </Page>
        </>
    );
};

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <GuestRoute path='/login' title='Página de Login - FIFO' component={Login} />
                <GuestRoute path='/register' title='Página de Registro - FIFO' component={Register} />
                <PrivateRoute path='/schedule/game' title='Escolha um jogo - FIFO' component={SelectGame} />
                <PrivateRoute path='/' title='Escolha um jogo - FIFO' component={SelectGame} exact />
                <PrivateRoute path='/schedule/station' title='Escolha uma estação - FIFO' component={SelectStation} />
                <PrivateRoute path='/schedule/final' component={Schedule} />
                <PrivateRoute path='/queue' title='Fila - FIFO' component={Queue} />
                <PrivateRoute path='/account/settings' title='Minha Conta - FIFO' component={MyAccount} />
                <AdminRoute path='/admin' title='Administração - FIFO' component={Admin} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
