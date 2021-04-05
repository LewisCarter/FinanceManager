import React from 'react';
import {
	Formik,
	FormikHelpers,
	Form,
	Field,
} from 'formik';
import * as yup from 'yup';
import "react-datepicker/dist/react-datepicker.css";
import { ISavingsPotCreateInput } from '../../../../DTOs/Money/savings.pot.dto';
import { createSavingsPot } from '../../../../DAOs/Money/savings.pots.dao';

interface INewSavingsPotProps {
	successCallback: Function;
}

interface INewSavingsPotState {
	values: ISavingsPotCreateInput;
}

class NewSavingsPot extends React.Component<INewSavingsPotProps, INewSavingsPotState> {
	
	constructor(props: INewSavingsPotProps) {
		super(props);

		this.state = {
			values: {
				Name: "",
				Goal: 0
			}
		}

		this.submit = this.submit.bind(this);
	}

	async submit(values: ISavingsPotCreateInput, actions: FormikHelpers<ISavingsPotCreateInput>) {
		const result = await createSavingsPot(values);
		
		actions.setSubmitting(false);

		if (result !== null) {
			this.props.successCallback(result);
		}
	}
	
	render() {
		let validation = yup.object().shape({
			Name: yup.string().required("This is a required field"),
			Goal: yup.number().required("This is a required field")
		});

		return <>
			<h2 className={"text-3xl font-bold text-center mb-5"}>New savings pot</h2>
			<Formik
				initialValues={this.state.values}
				validationSchema={validation}
				onSubmit={(values, actions) => this.submit(values, actions)}>
				
				{({ values, errors, touched }) => (
				<Form className={"flex flex-col"}>
					
					<div className="flex flex-col mb-5">
						<label htmlFor="Name" className={"font-bold pb-2"}>Name <span className="text-red-600">*</span></label>
						<Field id="Name" name="Name" placeholder="" className={"border rounded-md pt-2 pr-3 pb-2 pl-3"} />
						{errors.Name && touched.Name ? (
							<div className="text-red-600">{errors.Name}</div>
						) : null}
					</div>

					<div className="flex flex-col mb-5">
						<label htmlFor="Goal" className={"font-bold pb-2"}>Goal <span className="text-red-600">*</span></label>
						<Field id="Goal" name="Goal" placeholder="" className={"border rounded-md pt-2 pr-3 pb-2 pl-3"} />
						{errors.Goal && touched.Goal ? (
							<div className="text-red-600">{errors.Goal}</div>
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

export default NewSavingsPot;