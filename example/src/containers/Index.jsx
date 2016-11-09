import React from 'react';
import View  from "../../../lib";

class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <View data={[
                    {
                        text: "Darth Vador, also known as Anakin Skywalker is a fictional character.",
                        anno: [
                            ["pos", 0, 4, "RB"],
                            ["pos", 6, 11, "PRP__DOLLAR__"],
                            ["pos", 13, 16, "EX"],
                            ["pos", 24, 25, "WDT"],
                            ["pos", 27, 32, "IN"],
                            ["entity", 27, 32, "PERSON"],
                            ["pos", 34, 42, "CC"],
                            ["pos", 44, 45, "CD"],
                            ["pos", 47, 47, "PRP"],
                            ["entity", 47, 47, "PERSON"],
                            ["pos", 49, 57, "VBZ"],
                            ["pos", 59, 68, "WDT"],
                            ["entity", 59, 68, "DATE"]
                        ]
                    },
                    {
                        text: "He is",
                        anno: [
                            ["pos", 0, 1, "NNP"],
                            ["pos", 3, 4, "NNP"]
                        ]
                    }
                ]} settings={{
                    en  : true,
                    ja  : true,
                    cn  : true,
                    pos : true,
                    ne  : false,
                    wiki: false
                }}/>
            </div>
        )
    }
}

export default Index;

