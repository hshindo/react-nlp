import React from 'react';
import Word from './WordComponent.jsx';


class LineComponent extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        let renderWord = this.props.line.items.map((item, index) => {
            return <Word key={index} index={index} data={item}/>
        });

        return (
            <div className="item-translate">
                <div style={{alignItems: 'flex-end', display: 'flex'}}>
                    <div className="item-count text-right padding-top-bottom">
                        {this.props.index + 1}
                    </div>
                    <div className="border-left text-result padding-top-bottom">
                        <div className="line-word">
                            {renderWord}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LineComponent.defaultProps = {
    line: {
        items: [],
        text : ''
    }
};

export default LineComponent;

