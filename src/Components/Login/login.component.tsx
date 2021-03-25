import React from 'react';
import axios from 'axios';

interface ILoginProps {
}

interface ILoginState {
	username?: string;
	password?: string;
	errors?: Array<{id:string, message: string}>;
}

class Login extends React.Component<ILoginProps, ILoginState> {

	constructor(props: {}) {
		super(props);

		this.handleValueChange = this.handleValueChange.bind(this);
		this.post = this.post.bind(this);
		this.renderErrors = this.renderErrors.bind(this);

		this.state = {
			username:'',
			password:'',
			errors: []
		};
	}

	handleValueChange = (e: any) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	async post(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		this.setState({
			errors: []
		});

		console.log('Attempting to login... ' + process.env.REACT_APP_API_ENDPOINT + '/auth/local');

		await axios({
			url: process.env.REACT_APP_API_ENDPOINT,
			method: 'post',
  			data: {
				query: `mutation {login(input: { identifier: "` + this.state.username + `", password: "` + this.state.password + `" }) {jwt}}`
			}
		}).then(response => {
			console.log('Login successful... ');
			localStorage.setItem("login.token", response.data.data.login.jwt);

			window.location.reload();
			return true;
		}).catch(error => {
			console.log('Error logging in... ' + error);
			this.setState({errors: error.response.data.data[0].messages});
			return false;
		});
	}

	renderErrors() {
		return this.state.errors !== undefined && this.hasErrors() ? this.state.errors.map((error, idx) => {
			return <p className="bg-red-600 text-white rounded-md shadow-sm mb-2 px-3 py-2" key={"error-" + error.id} role="alert">{error.message}</p> 
		}) : "";
	}

	hasErrors() {
		return this.state.errors !== undefined && this.state.errors.length > 0;
	}

	render() {
		return <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						home<span className="text-red-600">.</span>
					</h1>
				</div>
				{this.renderErrors()}
				<form className="mt-8 space-y-6" onSubmit={this.post}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label className="sr-only">Username</label>
							<input name="username" type="text" onChange={this.handleValueChange} autoComplete="username" required data-testid="username-input" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" />
						</div>
						<div>
							<label className="sr-only">Password</label>
							<input name="password" type="password" onChange={this.handleValueChange} autoComplete="current-password" required data-testid="password-input" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
						</div>
					</div>
					<div>
						<button type="submit" data-testid="submit-btn" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							<span className="absolute left-0 inset-y-0 flex items-center pl-3">
								<svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
									<path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
								</svg>
							</span>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>;
	}
}

export default Login;
