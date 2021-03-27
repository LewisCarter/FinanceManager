import axios from "axios";
import { getPlannedTransactionsTotal } from "./planned.transaction.dao";
import moment from 'moment';

export async function getBankListingChartTotals(): Promise<{x: string; y: number;}[]> {

	const dateTo = (moment().toDate().getDay() >= 25) ? moment().date(25).add({months: 1}) : moment().date(25);
	
	let data = [];

	for (let i = 11; i >= 0; i--) {
		const dateToMonth = moment(dateTo).subtract({months: i});
		const dateToMonthISO = dateToMonth.toISOString();

		data.push({
			x: dateToMonth.format("DD MMM YYYY"),
			y: await getBankListingChartTotal(dateToMonthISO)
		})
	}

	return data;
}

export async function getBankListingChartTotal(dateTo: string): Promise<number> {
	return await axios({
		url: process.env.REACT_APP_API_ENDPOINT,
		headers : {
			"Authorization" : "Bearer " + localStorage.getItem('login.token')
		},
		method: 'post',
		data : {
			query: `query { transactionsConnection(where: {bank_account_null: false, DateTime_lt: "` + dateTo + `"}) {
				aggregate {
				  sum {
					Amount
				  }
				}
			   }}`
		}
	}).then(async response => {
		if (response.data.data.transactionsConnection.aggregate.sum.Amount !== null) {
			return response.data.data.transactionsConnection.aggregate.sum.Amount;
		} else {
			return 0;
		}
	}).catch(response => {
		console.log('Error loading latest account total...');
		// TODO: Do something with the errors
		return 0;
	});
}

export async function getLatestAccountTotal(account: string, dateFrom: string, dateTo: string): Promise<number> {
	return await axios({
		url: process.env.REACT_APP_API_ENDPOINT,
		headers : {
			"Authorization" : "Bearer " + localStorage.getItem('login.token')
		},
		method: 'post',
		data : {
			query: `query { transactionsConnection(where: {bank_account: "` + account + `", DateTime_lt: "` + dateTo + `"}) {
				aggregate {
				  sum {
					Amount
				  }
				}
			   }}`
		}
	}).then(async response => {
		if (response.data.data.transactionsConnection.aggregate.sum.Amount !== null) {
			const unprocessedPlannedTransactionTotal = await getPlannedTransactionsTotal(account, dateFrom);
			return response.data.data.transactionsConnection.aggregate.sum.Amount + unprocessedPlannedTransactionTotal;
		} else {
			return 0;
		}
	}).catch(response => {
		console.log('Error loading latest account total...');
		// TODO: Do something with the errors
		return 0;
	});
}