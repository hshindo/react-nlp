import React from "react";
import Line from "./LineComponent";
import ConfigBgColor from './ConfigBgColor';
import SentenceBuilder from './SentenceBuilder';

class View extends React.Component {
    constructor(props) {
        super(props);
        this.sentenceBuilder = new SentenceBuilder(this.props.configBgColors);
    }

    render() {
        let listSentence = this.sentenceBuilder.buildListSentence(this.props.data);
        let renderLine = listSentence.map((item, index) => {
            return <Line settings={this.props.settings} key={index} index={index} line={item}/>
        });
        return (
            <div>
                {renderLine}
            </div>
        );
    }
}

View.defaultProps = {
    data          : [],
    settings      : {
        en  : true,
        ja  : true,
        cn  : true,
        pos : true,
        ne  : true,
        wiki: true
    },
    configBgColors: ConfigBgColor.getBgColors()
};


export default View;
