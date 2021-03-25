interface IPagination {
	totalResults: number; 
	perPage: number;
	page: number;
	callback: Function
}

export function Pagination(props: IPagination) {
	const totalPages = Math.ceil(props.totalResults / props.perPage);
	
	return <ul className="w-full flex justify-center mt-5">{Array.from(Array(totalPages), (novalue, idx) => {
		const page = idx + 1;
		if (page === props.page) {
			return <li className="bg-green-600 rounded-full text-white pt-2 pb-2 pr-4 pl-4 mr-3" key={'pagination-' + page}>{page}</li>;
		} else {
			return <li className="bg-gray-100 cursor-pointer rounded-full pt-2 pb-2 pr-4 pl-4 mr-3 hover:bg-gray-300" onClick={() => props.callback(page)} key={'pagination-' + page}>{page}</li>;
		}
	})}</ul>;

}