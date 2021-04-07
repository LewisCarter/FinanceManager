import React from "react";

interface IMappingStepProps {
    isStep: boolean;
    headings: Map<string, string> | null;
	setMapping: Function;
}

interface IMappingStepState {
	values: {
    };
}

class MappingStep extends React.Component<IMappingStepProps, IMappingStepState> {

    render() {
        return <></>
    }

}

export default MappingStep;