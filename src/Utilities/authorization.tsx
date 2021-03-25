const jwt = require('jsonwebtoken');


export const CheckUserIsLoggedIn = () => {
	if (localStorage.getItem("login.token")) {
		try {
			if(jwt.verify(localStorage.getItem("login.token"), process.env.REACT_APP_JWT_SECRET)) {
				console.log("Valid JWT");
				return true;
			} else {
				console.log("JWT invalid");
				return false;
			}
		} catch(err) {
			console.log(err);
			console.log("Error verifying JWT");
			return false;
		}
	}
	return false;
}