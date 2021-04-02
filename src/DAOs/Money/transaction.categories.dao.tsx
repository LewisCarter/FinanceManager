import axios from "axios";
import { ITransactionCategory } from "../../DTOs/Money/transaction.category.dto";

export const getTransactionCategories = async (): Promise<ITransactionCategory[]> => {
	return await axios({
		url: process.env.REACT_APP_API_ENDPOINT,
		headers : {
			"Authorization" : "Bearer " + localStorage.getItem('login.token')
		},
		method: 'post',
		data : {
			query: `query {
                transactionCategories(sort: "Name:DESC") {
                	id,
                    Name,
                    Code
                }
            }`
		}
	}).then(response => {
		return response.data.data.transactionCategories;
	}).catch(response => {
		console.log('Error loading transaction categories...');
		// TODO: Do something with the errors
		return [];
	});
}