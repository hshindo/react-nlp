import React from 'react';
import View from './../../../src/View.jsx';

class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <View data={[]}
                      settingDisplay={{
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

