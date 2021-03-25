import React from 'react';
import { Route } from 'react-router-dom';
import { CheckUserIsLoggedIn } from '../../Utilities/authorization';
import Login from '../Login/login.component';

const PrivateRoute = ({component, permissionLevel, ...rest} : any) => {
	
	const routeComponent = (rest: any) => (
		CheckUserIsLoggedIn()
			? React.createElement(component, rest)
			: <Login />
	);
	return <Route {...rest} render={routeComponent}/>;
};

export default PrivateRoute;