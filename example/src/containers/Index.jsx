import React from 'react';
import View from './../../../src';

class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <View data={[
                    {
                        text: "Darth Vador, also",
                        anno: [
                            ["wiki", 0, 10, "Darth_Vador"],
                            ["entity", 0, 10, "PERSON"],
                            ["pos", 0, 4, "NNP"],
                            ["pos", 6, 10, "NNP"],
                            ["pos", 11, 11, ","],
                            ["pos", 13, 17, "RB"]
                        ]
                    },
                    {
                        text: "He is",
                        anno: [
                            ["pos", 0, 1, "NNP"],
                            ["pos", 3, 4, "NNP"]
                        ]
                    }
                ]} settingDisplay={{
                    en  : true,
                    ja  : true,
                    cn  : true,
                    pos : true,
                    ne  : true,
                    wiki: true
                }}/>
            </div>
        )
    }
}

export default Index;

