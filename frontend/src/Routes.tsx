import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    RouteProps,
    Redirect,
} from 'react-router-dom';
import Nav from './components/Nav';
import Login from './pages/Login';
import MySchedules from './pages/MySchedules';
import Register from './pages/Register';
import Schedule from './pages/Schedule';
import SelectGame from './pages/SelectGame';
import SelectStation from './pages/SelectStation';
import Auth from './services/auth';
import MyAccount from './pages/MyAccount';

const PrivateRoute: React.FC<RouteProps> = props => {
    if (!Auth.hasToken()) {
        const component = () => (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        );
        return <Route {...props} component={component} />;
    }

    return (
        <>
            <Nav />
            <Route {...props} />
        </>
    );
};

const GuestRoute: React.FC<RouteProps> = props => {
    if (Auth.hasToken()) {
        const component = () => (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        );
        return <Route {...props} component={component} />;
    }

    return <Route {...props} />;
};

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <GuestRoute path='/login' exact component={Login} />
                <GuestRoute path='/register' component={Register} />
                <PrivateRoute path='/schedule/game' component={SelectGame} />
                <PrivateRoute path='/schedule/station' component={SelectStation} />
                <PrivateRoute path='/schedule/final' component={Schedule} />
                <PrivateRoute path='/account/schedules' component={MySchedules} />
                <PrivateRoute path='/account/settings' component={MyAccount} />
                <PrivateRoute path='/' component={MySchedules} exact />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
