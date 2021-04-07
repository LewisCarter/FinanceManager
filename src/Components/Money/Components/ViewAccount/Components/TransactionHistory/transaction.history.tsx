import { useState, useEffect } from 'react';
import { Transaction } from '../../../Items/Transaction/transaction';
import { Pagination } from '../../../../../Shared/Components/pagination.component';
import { ITransaction } from '../../../../../../DTOs/Money/transaction.dto';
import { getAccountTransactions, getAccountTransactionsTotal } from '../../../../../../DAOs/Money/transactions.dao';
import { Modal } from '../../../../../Shared/Components/modal.component';
import { BulkUploadTransactionsForm } from '../../../Forms/BulkUploadTransactions/bulk.upload.transactions';

export const TransactionHistory = (props: {
	accountId: string,
	dateFrom: string,
	dateTo: string
}) => {

	const [transactions, setTransactions] = useState<ITransaction[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [page, setPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(10);
	const [openBulkUploadModal, setOpenBulkUploadModal] = useState<boolean | null>(null);

	useEffect(() => {
		if (openBulkUploadModal !== null) {
			setOpenBulkUploadModal(null);
		} else {
			setOpenBulkUploadModal(null);

			getAccountTransactions(props.accountId, props.dateFrom, props.dateTo, page, perPage).then((result: ITransaction[]) => {
				setTransactions(result);
			});

			getAccountTransactionsTotal(props.accountId, props.dateFrom, props.dateTo).then((result: number) => {
				setTotal(result);
			});

			setPerPage(10);
		}
	}, [openBulkUploadModal, page, perPage, props.accountId, props.dateFrom, props.dateTo]);

	function updatePage(p: number) {
		setPage(p);
	}

	function bulkUploadSuccess() {

	}

	return <><div className="flex justify-between">
			<h2 className="font-bold text-2xl mb-5">Transaction history</h2>
			<div className="flex">
				<button type="button" className="mr-5 text-blue-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
				<button type="button" onClick={() => setOpenBulkUploadModal(true)} className="text-blue-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg></button>
			</div>
		</div>

		<Modal open={openBulkUploadModal}>
			<BulkUploadTransactionsForm successCallback={bulkUploadSuccess} />
		</Modal>

		{transactions.length > 0 ? transactions.map((transaction) => {
			return <Transaction 
				key={'transaction-' + transaction.id}
				id={transaction.id}
				iconType={transaction.transaction_category.Code} 
				date={transaction.DateTime} 
				description={transaction.Description}
				transactionCategory={transaction.transaction_category.Name}
				bank={transaction.bank_account.Bank.Name}
				account={transaction.bank_account.Name}
				value={transaction.Amount} />;
		}) : <p>No transactions found</p>}

		<Pagination 
			key={'account-view-transaction-history-pagination'}
			totalResults={total} 
			perPage={perPage} 
			page={page} callback={updatePage} />
	</>
}