import { Icon } from '../../Shared/Assets/icons';
import Moment from 'react-moment';
import { FormatCurrency } from '../../Shared/Number/format.currency';
import { processPlannedTransaction } from '../../../DAOs/Money/planned.transaction.dao';
import { useEffect, useState } from 'react';
import { Modal } from '../../Shared/Components/modal.component';
import { IPlannedTransaction } from '../../../DTOs/Money/planned.transaction.dto';
import { DeletePlannedTransaction } from './Forms/delete.planned.transaction';

export const PlannedTransaction = (props: {
	plannedTransaction: IPlannedTransaction
	refreshCallback: Function;
}) => {
	const [showDeleteModal, setShowDeleteModal] = useState<boolean | null>(null);
	
	useEffect(() => {
		if (showDeleteModal !== null) {
			setShowDeleteModal(null);
		}
	}, [showDeleteModal])

	function processTransaction(processed: boolean) {
		processPlannedTransaction(props.plannedTransaction.id, processed);
		props.refreshCallback(true);
	}

	function deletedCallback() {
		props.refreshCallback(true);
		setShowDeleteModal(false);
	}

	return <div className="flex border-b pt-5 pb-5 flex-col md:flex-row" key={'planned-transaction-' + props.plannedTransaction.id}>
		<div className="min-w-max pr-5">
			{props.plannedTransaction.Processed ? 
				<svg onClick={() => processTransaction(false)} className="w-6 h-6 text-green-700 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> : 
				<svg onClick={() => processTransaction(true)} className="w-6 h-6 text-red-500 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
			}
		</div>
		<div>
			<Icon type={props.plannedTransaction.transaction_category.Code} />
		</div>
		<p className="md:pl-5 md:pr-5 font-bold min-w-max">
			<Moment format="DD/MM/YYYY">
				{props.plannedTransaction.Date}
			</Moment>
		</p>
		<h5 className="md:pl-5 md:pr-5 w-full">
			{props.plannedTransaction.Name}<br/>
			<small className="text-gray-500">{props.plannedTransaction.transaction_category.Name} - {props.plannedTransaction.bank_account.Bank.Name} - {props.plannedTransaction.bank_account.Name}</small>
		</h5>
		<p className={props.plannedTransaction.Amount >= 0 ? 'text-green-500 min-w-max' : 'text-red-500 min-w-max'}>
			<FormatCurrency value={props.plannedTransaction.Amount} />
		</p>
		<div className="md:pl-5">
			<button type="button" onClick={(e) => {setShowDeleteModal(true);}} className="text-red-700 cursor-pointer bg-white rounded-full align-top">
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
			</button>
			<Modal open={showDeleteModal}>
				<DeletePlannedTransaction plannedTransaction={props.plannedTransaction} successCallback={deletedCallback} cancelCallback={() => {setShowDeleteModal(false)}} />
			</Modal>
		</div>
	</div>
}