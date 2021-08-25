import React from "react";
import { ITransaction } from '../../../../../DTOs/Money/transaction.dto';
import FileUploadStep from './Components/FileUploadStep/file.upload.step';
import MappingStep from './Components/MappingStep/mapping.step';
import TransactionSelectionStep from './Components/TransactionSelectionStep/transaction.selection.step';
import { useState } from 'react';

export const BulkUploadTransactionsForm = (props: {
	successCallback: Function;
}) => {
	const FILE_UPLOAD_STEP = "file-upload";
	const MAPPING_STEP = "mapping";
	const TRANSACTION_SELECTION_STEP = "transaction-selection";

	const [step, setStep] = useState<string>(FILE_UPLOAD_STEP);
	const [csvInput, setCsvInput] = useState<JSON | undefined>(undefined);
	const [mapping, setMapping] = useState<Map<string, string>>(new Map<string, string>());
	const [matchingTransactions, setMatchingTransactions] = useState<Array<string>>(new Array<string>());
	const [transactions, setTransactions] = useState<Array<ITransaction>>(new Array<ITransaction>());

	function setCSVInput(csv: JSON) {
		if (csv !== null) {
			console.log(csv);
			setCsvInput(csv);
			setStep(MAPPING_STEP);
		}
	}

	function getCSVInputHeadings():Map<string, string> | null {
		if (csvInput === undefined) return null;
		
		return null;
	}

	function successCallback() {
		props.successCallback();
	}

	return <>
		<FileUploadStep isStep={step === FILE_UPLOAD_STEP} setCSVInput={setCSVInput} />
		<MappingStep isStep={step === MAPPING_STEP} headings={step === MAPPING_STEP ? getCSVInputHeadings() : new Map<string, string>()} setMapping={setMapping} />
		<TransactionSelectionStep isStep={step === TRANSACTION_SELECTION_STEP} mapping={mapping} transactions={transactions} matchingTransactions={matchingTransactions} successCallback={successCallback} />
	</>
}