import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
  } from "react-router-dom";
import PrivateRoute from './Components/Routing/private.route';
import Dashboard from './Components/Dashboard/dashboard.component';
import { BanksListing } from './Components/Money/banks.listing.component';
import { ViewAccount } from './Components/Money/account.view.component';
import PropertyListing from './Components/Property/property.listing.component';
import { Error404 } from './Components/Shared/Errors/404.component';

class App extends React.Component {
	render() {
		return <Router>
			<Switch>
				<PrivateRoute path="/banks/:accountId" component={ViewAccount} />
				<PrivateRoute exact path="/banks" component={BanksListing} />

				<PrivateRoute exact path="/property" component={PropertyListing} />
				
				<PrivateRoute exact path="/" component={Dashboard} />

				<Route component={Error404} />
			</Switch>
		</Router>;
	}
}

export default App;
