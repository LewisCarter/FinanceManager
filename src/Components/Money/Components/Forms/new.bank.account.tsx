import React from 'react';
import {
	Formik,
	FormikHelpers,
	Form,
	Field,
} from 'formik';
import * as yup from 'yup';
import {INewAccountFormValues} from "../../../../DTOs/Money/account.dto";
import { createAccount } from '../../../../DAOs/Money/accounts.dao';
import { IBank } from '../../../../DTOs/Money/bank.dto';
import { getBanks } from '../../../../DAOs/Money/banks.dao';

interface INewAccountProps {
	successCallback: Function;
}

interface INewAccountState {
	values: INewAccountFormValues;
	banks: IBank[];
}

class NewBankAccount extends React.Component<INewAccountProps, INewAccountState> {
	
	constructor(props: INewAccountProps) {
		super(props);

		this.state = {
			values: {
				bank: "",
				newBank: "",
				name: "",
				description: ""
			},
			banks:[]
		}

		this.submit = this.submit.bind(this);
	}

	componentDidMount() {
		this.getBanksList();
	}

	getBanksList(): void {
		getBanks().then((banks) => {
			this.setState({
				banks: banks
			})
		});
	}

	async submit(values: INewAccountFormValues, actions: FormikHelpers<INewAccountFormValues>) {
		const newAccount = await createAccount(values);
		
		actions.setSubmitting(false);

		if (newAccount !== null) {
			this.props.successCallback(newAccount);
		}
	}
	
	render() {
		let validation = yup.object().shape({
			name: yup.string().required("This is a required field"),
			bank: yup.string().when('newBank', {
				is: (newBank: string) => !newBank || newBank.length === 0,
				then: yup.string().required("You must select a bank or add a new one"),
				otherwise: yup.string()
			}),
			newBank: yup.string().when('bank', {
				is: (bank: string) => !bank || bank.length === 0,
				then: yup.string().required("You must select a bank or add a new one"),
				otherwise: yup.string()
			}),
		}, [['newBank', 'bank']]);

		return <>
			<h2 className={"text-3xl font-bold text-center mb-5"}>New bank account</h2>
			<Formik
				initialValues={this.state.values}
				validationSchema={validation}
				onSubmit={(values, actions) => this.submit(values, actions)}>
				
				{({ errors, touched }) => (
				<Form className={"flex flex-col"}>
					
					<div className="flex flex-col mb-5">
						<label htmlFor="name" className={"font-bold pb-2"}>Account name <span className="text-red-600">*</span></label>
						<Field id="name" name="name" placeholder="Main account, Savings account etc" className={"border rounded-md pt-2 pr-3 pb-2 pl-3 md:w-7/12"} />
						{errors.name && touched.name ? (
							<div className="text-red-600">{errors.name}</div>
						) : null}
					</div>
					
					<div className="flex flex-col mb-5">
						<label htmlFor="description" className={"font-bold pb-2"}>Description</label>
						<Field id="description" name="description" as="textarea" placeholder="A short description of what the account is used for" rows={5} className={"border rounded-md pt-2 pr-3 pb-2 pl-3"} />
						{errors.description && touched.description ? (
							<div className="text-red-600">{errors.description}</div>
						) : null}
					</div>

					<div className={"flex flex-col p-5 bg-gray-100 rounded-lg mb-5"}>
						<div className="flex flex-col mb-5">
							<label htmlFor="bank" className={"font-bold pb-3"}>Select an existing bank</label>
							<Field id="bank" name="bank" as="select" className={"border rounded-md pt-2 pr-3 pb-2 pl-3"}>
								<option value="">- Please select -</option>
								{this.state.banks.map((bank: IBank) => {
									return <option value={bank.id}>{bank.Name}</option>
								})}
							</Field>
							{errors.bank && touched.bank ? (
								<div className="text-red-600">{errors.bank}</div>
							) : null}
						</div>

						<p className={"text-gray-500 mb-5"}>- or -</p>

						<div className="flex flex-col mb-5">
							<label htmlFor="newBank" className={"font-bold pb-2"}>Add a new one</label>
							<Field id="newBank" name="newBank" placeholder="HSBC, Lloyds, TSB, Barclays etc" className={"border rounded-md pt-2 pr-3 pb-2 pl-3"} />
							{errors.newBank && touched.newBank ? (
								<div className="text-red-600">{errors.newBank}</div>
							) : null}
						</div>
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

export default NewBankAccount;