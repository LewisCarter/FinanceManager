import { deleteAccount } from '../../../../DAOs/Money/accounts.dao';
import { IAccount } from '../../../../DTOs/Money/account.dto';

export const DeleteAccount = (props: {
	account: IAccount,
	successCallback: Function,
	cancelCallback: Function
}) => {

	function del() {
		deleteAccount(props.account.id).then((accountId: string) => {
			if (accountId !== null) {
				props.successCallback();
			}
		})
	}

	return <>
		<h2 className={"text-3xl font-bold text-center mb-5"}>Are you sure?</h2>
		
		<p className="mb-5">By deleting this account, you will also be deleting the following:</p>

		<ul className="list-inside list-disc mb-5">
			<li>Recurring transactions</li>
			<li>Planned transactions (this includes savings stored in the account)</li>
			<li>Transaction history</li>
		</ul>

		<div className="flex flex-row">
			<button type="button" className="bg-red-600 hover:bg-red-700 rounded-md pt-2 pr-3 pb-2 pl-3 text-white flex flex-row mr-5" onClick={() => props.cancelCallback()}>
				<span className={"pr-2"}>No</span>
				<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
			</button>
			<button type="button" className="bg-green-600 hover:bg-green-700 self-end rounded-md pt-2 pr-3 pb-2 pl-3 text-white flex flex-row" onClick={del}>
				<span className={"pr-2"}>Yes</span>
				<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
			</button>
		</div>
	</>
}