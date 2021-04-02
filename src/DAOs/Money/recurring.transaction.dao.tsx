import axios from 'axios';
import { IReccuringTransaction } from '../../DTOs/Money/recurring.transaction.dto';

export async function getRecurringTransactions(accountId: string): Promise<IReccuringTransaction[]> {
	return axios({
		url: process.env.REACT_APP_API_ENDPOINT,
		headers : {
			"Authorization" : "Bearer " + localStorage.getItem('login.token')
		},
		method: 'post',
		data : {
			query: `query {
				recurringTransactions(sort: "Date:ASC", where: {bank_account:"` + accountId + `"}) {
					id, 
					Name, 
					Amount, 
					DayOfTheMonth,
					bank_account {
                        id,
						Name, 
						Bank {
							Name
						}
					}, 
					transaction_category {
                        id,
						Name,
						Code
					}
				}
			}`
		}
	}).then(response => {
		return response.data.data.recurringTransactions;
    }).catch(response => {
		console.log('Error loading upcoming recurring transactions...');
		// TODO: Do something with the errors
		return [];
	});
}