import React from "react";

interface IFileUploadStepProps {
    isStep: boolean;
	setCSVInput: Function;
}

interface IFileUploadStepState {
	values: {
        csv: string;
    };
}

class FileUploadStep extends React.Component<IFileUploadStepProps, IFileUploadStepState> {

    render() {
        return <></>
    }

}

export default FileUploadStep;