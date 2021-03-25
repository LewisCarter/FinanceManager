export interface ISavingsPot {
	id: string;
	Name: string;
	Goal: number;
}

export interface ISavingsPotTotal {
	key: string;
	connection: {
		aggregate: {
			sum: {
				Amount: number
			}
		}
	}
}