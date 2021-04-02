import { useEffect, useState } from "react"
import { BankAccount } from '../Components/bank.account.component';
import { IAccount } from '../../../DTOs/Money/account.dto';
import { getAccounts } from "../../../DAOs/Money/accounts.dao";
import { Link } from 'react-router-dom';
import { Modal } from "../../Shared/Components/modal.component";
import NewBankAccount from '../Components/Forms/new.bank.account';

interface IListBankAccountsProps {
	refreshCallback: Function
}

export const ListBankAccounts = (props: IListBankAccountsProps) => {

	const [accounts, setAccounts] = useState<IAccount[]>([]);
	const [newAccount, setNewAccount] = useState<boolean | null>(null);
	const [openNewAccountModal, setOpenNewAccountModal] = useState<boolean | null>(null);
	const [deleteAccount, setDeleteAccount] = useState<boolean | null>(null);

	useEffect(() => {
		setNewAccount(null);
		setOpenNewAccountModal(null);
		setDeleteAccount(null);
		getAccounts().then((result: IAccount[]) => {
			setAccounts(result);
		});
	}, [newAccount, openNewAccountModal, deleteAccount]);

	function newAccountSuccess() {
		props.refreshCallback(true);
		setOpenNewAccountModal(false);
	}

	return <>
		<div className="max-w-7xl mx-auto -mt-8">
			<div className="flex flex-wrap items-start flex-row">
				{accounts.length > 0 ? accounts.map((account: IAccount) => {
					return <BankAccount account={account} key={'account-' + account.id} deleteSuccess={setDeleteAccount} />
				}) : ''}
				<div className="w-full md:w-3/12 pl-5 pr-5 flex justify-center mb-10">
					<Link to={'#'} className="flex flex-col items-center justify-center w-full rounded-xl shadow-lg bg-white  pl-5 pr-5 pt-8 pb-8 hover:bg-gray-100" onClick={(e) => {e.preventDefault(); setOpenNewAccountModal(true);}}>
						<h2 className="text-2xl font-bold flex flex-col text-center text-green-700">
							New account <svg className="w-6 h-6 ml-auto mr-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
						</h2>
					</Link> 
				</div>
			</div>
		</div>
		<Modal open={openNewAccountModal}>
			<NewBankAccount successCallback={newAccountSuccess} />
		</Modal>
	</>

}