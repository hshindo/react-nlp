import React from "react";
import Line from "./LineComponent.jsx";
import ConfigBgColor from './ConfigBgColor.jsx';
import SentenceBuilder from './SentenceBuilder.jsx';


class View extends React.Component {
    constructor(props) {
        super(props);
        this.sentenceBuilder = new SentenceBuilder(this.props.configBgColors);
    }

    render() {
        let listSentence = this.sentenceBuilder.buildListSentence(this.props.data);
        let renderLine   = listSentence.map((item, index) => {
            return <Line key={index} index={index} line={item}/>
        });
        return (
            <div>
                {renderLine}
            </div>
        );
    }
}

View.defaultProps = {
    data: [],
    configBgColors: ConfigBgColor.getBgColors()
};


export default View;
