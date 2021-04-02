import React, { useState, useEffect } from 'react';

export const Modal:React.FunctionComponent<{
	open: boolean | null;
}> = (props) => {

	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		if (props.open !== null) setOpen(props.open);
	}, [props.open]);

	return open ? <div className={"fixed top-0 left-0 flex w-full h-screen bg-opacity-60 bg-gray-400 z-20"}>
		<div className="w-11/12 md:w-6/12 mx-auto mt-10 overflow-y-scroll">
			<div className="pl-5 pr-5">
				<div className="p-10 mb-10 bg-white rounded-xl shadow-lg border flex flex-col relative">
					<svg onClick={() => setOpen(false)} className={"w-6 h-6 cursor-pointer absolute top-2 right-2"} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
			
					{props.children}
				</div>
			</div>
		</div>
	</div> : <></>;

}