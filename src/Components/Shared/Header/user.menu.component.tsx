import React from 'react';
// import { Link } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'

interface IUserMenuProps {}
interface IUserMenuState {
	showMenu: boolean;
}

class UserMenu extends React.Component<IUserMenuProps, IUserMenuState> {

	constructor(props: {}) {
		super(props);

		this.state = {
			showMenu: false
		}

		this.onClick = this.onClick.bind(this);
	}

	onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		this.setState({
			showMenu: !this.state.showMenu
		})
	}

	logout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		localStorage.removeItem("login.token");

		return <Redirect to={"/"} />
	}

	render() {
		return <>
			<div className="ml-3 relative">
				<div>
					<button className="max-w-xs rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true" onClick={(e) => this.onClick(e)}>
						<span className="sr-only">Open user menu</span>
						<span className="h-8 w-8 flex bg-gray-700 text-green-300 px-2 py-1.5 text-sm font-medium rounded-full">LC</span>
					</button>
				</div>

				<div className={"origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" + (this.state.showMenu ? "" : " hidden")} role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
					{/*<Link to={"/profile"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</Link>*/}
					{/*<Link to={"/settings"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</Link>*/}
					<span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem" onClick={this.logout}>Sign out</span>
				</div>
			</div>
		</>
	}
}

export default UserMenu;