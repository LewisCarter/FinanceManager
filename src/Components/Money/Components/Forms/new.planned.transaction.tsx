import React from 'react';
import {
	Formik,
	FormikHelpers,
	Form,
	Field,
} from 'formik';
import * as yup from 'yup';
import {IPlannedTransactionCreateInput} from "../../../../DTOs/Money/planned.transaction.dto";
import { createPlannedTransaction } from '../../../../DAOs/Money/planned.transaction.dao';
import { ITransactionCategory } from '../../../../DTOs/Money/transaction.category.dto';
import { getTransactionCategories } from '../../../../DAOs/Money/transaction.categories.dao';
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerField } from '../../../Shared/Components/date.picker';
import { ISavingsPot } from '../../../../DTOs/Money/savings.pot.dto';
import { getSavingsPots } from '../../../../DAOs/Money/savings.pots.dao';

interface INewPlannedTransactionProps {
	accountId: string;
	dateFrom: string;
	dateTo: string;
	successCallback: Function;
}

interface INewPlannedTransactionState {
	values: IPlannedTransactionCreateInput;
	transactionCategories: ITransactionCategory[];
	savingsPots: ISavingsPot[];
}

class NewPlannedTransaction extends React.Component<INewPlannedTransactionProps, INewPlannedTransactionState> {
	
	constructor(props: INewPlannedTransactionProps) {
		super(props);

		this.state = {
			values: {
				Name: "",
				Amount: 0,
				Processed: false,
				Date: "",
				bank_account : props.accountId,
				transaction_category : "",
				savings_pot: ""
			},
			transactionCategories: [],
			savingsPots: []
		}

		this.submit = this.submit.bind(this);
	}

	componentDidMount() {
		getTransactionCategories().then((result: ITransactionCategory[]) => {
			this.setState({
				transactionCategories: result
			});
		});

		getSavingsPots().then((result: ISavingsPot[]) => {
			this.setState({
				savingsPots: result
			});
		});
	}

	async submit(values: IPlannedTransactionCreateInput, actions: FormikHelpers<IPlannedTransactionCreateInput>) {
		const newPlannedTransaction = await createPlannedTransaction(values);
		
		actions.setSubmitting(false);

		if (newPlannedTransaction !== null) {
			this.props.successCallback(newPlannedTransaction);
		}
	}
	
	render() {
		let validation = yup.object().shape({
			Name: yup.string().required("This is a required field"),
			Amount: yup.number().required("This is a required field"),
			Date: yup.date().required("This is a required field"),
			transaction_category: yup.string().required("This is a required field"),
		});

		const savingsPot = this.state.savingsPots.find(pot => pot.id === this.state.values.savings_pot);

		return <>
			<h2 className={"text-3xl font-bold text-center mb-5"}>New planned transaction</h2>
			<Formik
				initialValues={this.state.values}
				validationSchema={validation}
				onSubmit={(values, actions) => this.submit(values, actions)}>
				
				{({ errors, touched }) => (
				<Form className={"flex flex-col"}>
					
					<div className="flex flex-col mb-5">
						<label htmlFor="Name" className={"font-bold pb-2"}>Name <span className="text-red-600">*</span></label>
						<Field id="Name" name="Name" placeholder="" className={"border rounded-md pt-2 pr-3 pb-2 pl-3"} />
						{errors.Name && touched.Name ? (
							<div className="text-red-600">{errors.Name}</div>
						) : null}
					</div>

					<div className="flex flex-col mb-5">
						<label htmlFor="Amount" className={"font-bold pb-2"}>Amount <span className="text-red-600">*</span></label>
						<Field id="Amount" name="Amount" placeholder="" className={"border rounded-md pt-2 pr-3 pb-2 pl-3 md:w-6/12"} />
						{errors.Amount && touched.Amount ? (
							<div className="text-red-600">{errors.Amount}</div>
						) : null}
					</div>

					<div className="flex flex-col mb-5">
						<label htmlFor="Date" className={"font-bold pb-2"}>Date <span className="text-red-600">*</span></label>
						{/* <Field id="Date" name="Date" placeholder="" className={"border rounded-md pt-2 pr-3 pb-2 pl-3 md:w-6/12"} /> */}
						<DatePickerField 
							name="Date" 
							dateFormat="dd/MM/yyyy" 
							minDate={new Date(this.props.dateFrom)}
							maxDate={new Date(this.props.dateTo)}
							className="border rounded-md pt-2 pr-3 pb-2 pl-3 md:w-6/12" />
						{errors.Date && touched.Date ? (
							<div className="text-red-600">{errors.Date}</div>
						) : null}
					</div>
					
					<div className="flex flex-col mb-5">
						<label htmlFor="transaction_category" className={"font-bold pb-3"}>Transaction category</label>
						<Field id="transaction_category" name="transaction_category" as="select" className={"border rounded-md pt-2 pr-3 pb-2 pl-3"}>
							<option value="">- Please select -</option>
							{this.state.transactionCategories.map((transactionCategory: ITransactionCategory) => {
								return <option value={transactionCategory.id}>{transactionCategory.Name}</option>
							})}
						</Field>
						{errors.transaction_category && touched.transaction_category ? (
							<div className="text-red-600">{errors.transaction_category}</div>
						) : null}
					</div>

					<div className={(savingsPot !== undefined && savingsPot.Name === 'Savings pot' ? '' : 'hidden') + "flex flex-col mb-5"}>
						<label htmlFor="savings_pot" className={"font-bold pb-3"}>Savings pot</label>
						<Field id="savings_pot" name="savings_pot" as="select" className={"border rounded-md pt-2 pr-3 pb-2 pl-3"}>
							<option value="">- Please select -</option>
							{this.state.savingsPots.map((savingsPot: ISavingsPot) => {
								return <option value={savingsPot.id}>{savingsPot.Name}</option>
							})}
						</Field>
						{errors.savings_pot && touched.savings_pot ? (
							<div className="text-red-600">{errors.savings_pot}</div>
						) : null}
					</div>

					<button className={"bg-green-600 hover:bg-green-700 self-end rounded-md pt-2 pr-3 pb-2 pl-3 text-white flex flex-row"} type="submit">
						<span className={"pr-2"}>Create</span>
						<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>
					</button>
				</Form>)}
			</Formik>
		</>
	}
}

export default NewPlannedTransaction;