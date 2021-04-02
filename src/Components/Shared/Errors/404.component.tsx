import { LoggedInTemplate } from '../loggedin.component';

export const Error404 = () => {
	return <>
		<LoggedInTemplate title="Page not found" chart="" breadcrumb={[{link: '', text: 'Error'}]}>
			<div className="max-w-7xl mx-auto -mt-8 bg-white rounded-xl p-10 shadow-lg mb-10 text-center">
				<p>Whoops! It looks like the page you've requested doesn't exist.</p>
			</div>
		</LoggedInTemplate>
	</>;
}