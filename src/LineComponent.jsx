import React from 'react';
import Word from './WordComponent';
import SettingLang from './SettingLang';

class LineComponent extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        let renderWord = this.props.line.items.map((item, index) => {
            return <Word settings={this.props.settings} key={index} index={index} data={item}/>
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
                <SettingLang lang="EN" display={this.props.settings.en} text={this.props.line.text}/>
                <SettingLang lang="JA" display={this.props.settings.ja} text={this.props.line.text_ja}/>
                <SettingLang lang="CN" display={this.props.settings.cn} text={this.props.line.text_cn}/>
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

