import React, { useEffect, useState } from 'react';
import { getSavingsPots, getSavingsPotTotals, getSavingsPotTotalsForAccount } from '../../../../../../DAOs/Money/savings.pots.dao';
import { ISavingsPot } from '../../../../../../DTOs/Money/savings.pot.dto';
import { FormatCurrency } from '../../../../../Shared/Number/format.currency';
import { Modal } from '../../../../../Shared/Components/modal.component';
import NewSavingsPot from '../../../Forms/new.savings.pot';

export const SavingsTotalsPanel = (props: {
	accountId: string | null;
	dateTo: string | null;
	refresh: boolean;
	refreshCallback?: Function;
}) => {

	const [total, setTotal] = useState<number>(0);
	const [savingsPots, setSavingsPots] = useState<ISavingsPot[]>([]);
	const [savingsPotTotals, setSavingsPotTotals] = useState<Map<string, number>>(new Map<string,number>());
	const [accountTotals, setAccountTotals] = useState<Map<string, number>>(new Map<string,number>());
	const [openModal, setOpenModal] = useState<boolean | null>(null);

	useEffect(() => {
		if (openModal !== null) {
			setOpenModal(null);
		} else {
			setOpenModal(null);

			getSavingsPots().then((result: ISavingsPot[]) => {
				setSavingsPots(result);
			});

			getSavingsPotTotals(props.dateTo).then((result: Map<string, number>) => {
				setSavingsPotTotals(result);
			});

			if (props.accountId !== null) {
				getSavingsPotTotalsForAccount(props.accountId, props.dateTo).then((savingsTotalResults: Map<string, number>) => {
					let savingsTotalSum = 0;

					savingsTotalResults.forEach((amount, id) => {
						savingsTotalSum += amount;
					});

					setAccountTotals(savingsTotalResults);
					setTotal(savingsTotalSum);
				});
			}
		}

	}, [openModal, props.accountId, props.dateTo, props.refresh]);

	function createSuccess() {
		setOpenModal(false);
		if (props.refreshCallback !== undefined) props.refreshCallback(true);
	}

	function openModalEvent(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault(); 
		setOpenModal(true);
	}

	return <>
		<div className="flex justify-between">
			<h2 className="flex font-bold text-2xl mb-5">
				Savings pots
				<button className="text-blue-500 self-center align-middle ml-2" onClick={(e) => { openModalEvent(e); }}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
			</h2>
			<Modal open={openModal}>
				<NewSavingsPot successCallback={() => createSuccess()}/>
			</Modal>
			<p className={total >= 0 ? 'text-green-500 text-xl font-bold min-w-max' : 'text-red-500 text-xl font-bold min-w-max'}>
				<FormatCurrency value={total} />
			</p>
		</div>
		{savingsPots.length > 0 ? savingsPots.map((pot: ISavingsPot) => {
			let potTotal = savingsPotTotals.get(pot.id);
			if (potTotal === undefined) potTotal = 0;
			const accountTotal = accountTotals.get(pot.id);
			let totalWidth = (potTotal / pot.Goal)*100;

			let accountTotalWidth = (accountTotal !== undefined) ? (accountTotal / pot.Goal)*100 : 0;

			return <div className="mb-5" key={"savings-pot-" + pot.id}>
				<div className="flex justify-between mb-3">
					<h3 className="text-lg font-bold">{pot.Name}</h3>
					<p><span className="font-bold">Target:</span> <FormatCurrency value={pot.Goal} /></p>
				</div>

				{props.accountId !== null ? <div className="w-full bg-gray-300 rounded-md relative">
					<div className="bg-green-600 rounded-md relative z-10 transition-all" style={{width: accountTotalWidth+"%"}}>
						<p className="text-xs text-white pt-1 pr-2 pb-1 pl-2">{accountTotalWidth}%</p>
					</div>
					<div className="bg-gray-600 rounded-md absolute top-0 left-0 z-0 transition-all" style={{width: totalWidth+"%"}}>
						<p className="text-xs text-white pt-1 pr-2 pb-1 pl-2">{totalWidth}%</p>
					</div>
				</div> : <div className="w-full bg-gray-300 rounded-md relative">
					<div className="bg-green-600 rounded-md relative z-10 transition-all" style={{width: totalWidth+"%"}}>
						<p className="text-xs text-white pt-1 pr-2 pb-1 pl-2">{totalWidth}%</p>
					</div>
				</div>}

			</div>

		}) : <p>No savings pots found.</p>}
	</>;
}