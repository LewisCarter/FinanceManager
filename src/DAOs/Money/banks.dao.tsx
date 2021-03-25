import axios from 'axios';
import { IBank } from '../../DTOs/Money/bank.dto';

export async function getBanks(): Promise<IBank[]> {
	return await axios({
		url: process.env.REACT_APP_API_ENDPOINT,
		headers: {
			"Authorization": 'Bearer ' + localStorage.getItem('login.token')
		},
		method: 'post',
		data: {
			query: `query { 
				banks(sort: "Name:ASC") { 
					id, 
					Name
				} 
			}`
		}
	}).then(response => {
		return response.data.data.banks;
	}).catch(response => {
		console.log('Error getting banks...');
		// TODO: Do something with the errors
		return [];
	});
}

export async function createBank(name: string): Promise<IBank> {
	return await axios({
		url: process.env.REACT_APP_API_ENDPOINT,
		headers: {
			"Authorization": 'Bearer ' + localStorage.getItem('login.token')
		},
		method: 'post',
		data: {
			query: `mutation {
				createBank(input: { data: {
					Name: "` + name + `",
				}}) {
					bank {
						id
						Name
					}
				}
			  }`
		}
	}).then(response => {
		return response.data.data.createBank.bank;
	}).catch(response => {
		console.log('Error creating bank accounts...');
		// TODO: Do something with the errors
		return null;
	});
}