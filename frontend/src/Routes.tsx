import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import MySchedules from './pages/MySchedules';
import Register from './pages/Register';
import Schedule from './pages/Schedule';
import SelectGame from './pages/SelectGame';
import SelectStation from './pages/SelectStation';

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/schedule/game' component={SelectGame} />
                <Route path='/schedule/station' component={SelectStation} />
                <Route path='/schedule/final' component={Schedule} />
                <Route path='/account/schedules' component={MySchedules} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
