import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import * as yup from 'yup';
import { readString } from 'react-papaparse'

interface IFileUploadStepProps {
	isStep: boolean;
	setCSVInput: Function;
}

interface IFileUploadStepState {
	values: IFileUploadStepFormValues;
}

interface IFileUploadStepFormValues {
	csv: Blob;
	csvData : {}
}

class FileUploadStep extends React.Component<IFileUploadStepProps, IFileUploadStepState> {

	SUPPORTED_FORMATS = [
		"text/csv"
	  ];

	constructor(props: IFileUploadStepProps) {
		super(props);

		this.state = {
			values: {
				csv: new Blob(),
				csvData: {}
			},
		}

		this.submit = this.submit.bind(this);
	}

	async submit(values: IFileUploadStepFormValues, actions: FormikHelpers<IFileUploadStepFormValues>) {
		let reader = new FileReader();
		reader.onloadend = () => {
			if (typeof reader.result == "string") {
				console.log(reader.result);
				this.setState({ 
					values: {
						csv: values.csv,
						csvData: readString(reader.result, {
							'delimiter': ',',
							'newline': '\n',
							'header': true
						})
					}
				});
				this.props.setCSVInput(this.state.values.csvData);
			}
		};
		reader.readAsText(values.csv);
	}
	
	render() {
		let validation = yup.object().shape({
			csv: yup.mixed().required("This is a required field").test(
				"fileFormat",
				"Unsupported Format",
				value => value && this.SUPPORTED_FORMATS.includes(value.type)
			)
		});

		return this.props.isStep ? <>
			<h2 className={"text-3xl font-bold text-center mb-5"}>Import transactions</h2>
			<Formik
				initialValues={this.state.values}
				validationSchema={validation}
				onSubmit={(values, actions) => this.submit(values, actions)}>
				
				{({ errors, touched, setFieldValue }) => (
				<Form className={"flex flex-col"}>
					<div className="flex flex-col mb-5">
						<label htmlFor="csv" className={"font-bold pb-2"}>CSV file <span className="text-red-600">*</span></label>
						<input id="csv" name="csv" type="file" onChange={(event) => {
								if (event.currentTarget.files !== null)
									setFieldValue("csv", event.currentTarget.files[0]);
							}} className={"border rounded-md pt-2 pr-3 pb-2 pl-3 md:w-7/12"} />
						{errors.csv && touched.csv ? (
							<div className="text-red-600">{errors.csv}</div>
						) : null}
					</div>
					
					<button className={"bg-green-600 hover:bg-green-700 self-end rounded-md pt-2 pr-3 pb-2 pl-3 text-white flex flex-row"} type="submit">
						<span className={"pr-2"}>Upload</span>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
					</button>
				</Form>)}
			</Formik>
		</> : <></>;
	}

}

export default FileUploadStep;