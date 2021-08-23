import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IAccount } from '../../../../../DTOs/Money/account.dto';
import { Modal } from '../../../../Shared/Components/modal.component';
import { FormatCurrency } from '../../../../Shared/Number/format.currency';
import { DeleteAccount } from '../../Forms/delete.bank.account';

export const BankAccount = (props: {
	account: IAccount;
	deleteSuccess: Function;
}) => {

	const [account, setAccount] = useState<IAccount | null>(null)
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	
	useEffect(() => {
		setAccount(props.account);
	}, [props.account])

	function deletedCallback() {
		props.deleteSuccess(true);
		setShowDeleteModal(false);
	}

	return account !== null ? <div className="w-full md:w-3/12 pl-5 pr-5 flex justify-center mb-10 relative" key={'account-' + account.id}>
		<button type="button" onClick={(e) => {setShowDeleteModal(true);}} className="absolute -top-2 right-2 text-red-700 cursor-pointer bg-white rounded-full"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
		<Modal open={showDeleteModal}>
			<DeleteAccount account={account} successCallback={deletedCallback} cancelCallback={() => {setShowDeleteModal(false)}} />
		</Modal>
		<Link to={'/banks/' + account.id} className="flex flex-col items-center justify-center w-full rounded-xl shadow-lg bg-white p-5 hover:bg-gray-100">
			<h2 className="text-xl justify-center text-center text-gray-700">
				{account.Bank.Name}
			</h2>
			<p className="text-2xl font-bold">{account.Name}</p>
			<p className={account.Total >= 0 ? 'text-green-500 text-sm' : 'text-red-500 text-sm'}>
				<FormatCurrency value={account.Total} />
			</p>
		</Link> 
	</div> : <></>;
}