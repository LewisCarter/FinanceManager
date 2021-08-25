import React from "react";
import { ITransaction } from '../../../../../../../DTOs/Money/transaction.dto';

interface ITransactionSelectionStepProps {
    isStep: boolean;
    mapping: Map<string, string>;
    transactions: Array<ITransaction>;
    matchingTransactions: Array<string>;
	successCallback: Function;
}

interface ITransactionSelectionStepState {
	values: {
    };
}

class TransactionSelectionStep extends React.Component<ITransactionSelectionStepProps, ITransactionSelectionStepState> {

    render() {
        return <></>
    }

}

export default TransactionSelectionStep;