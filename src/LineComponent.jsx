import React from 'react';
import Word from './WordComponent';
import SettingLang from './SettingLang';
import Styles from './Styles';

class LineComponent extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        let renderWord = this.props.line.items.map((item, index) => {
            return <Word settings={this.props.settings} key={index} index={index} data={item}/>
        });
        return (
            <div  style={Styles.itemTranslate}>
                <div style={Styles.displayFlex}>
                    <div style={Object.assign(Styles.itemCount, Styles.textRight, Styles.paddingTopBottom)}>
                        {this.props.index + 1}
                    </div>
                    <div style={Object.assign(Styles.borderLeft, Styles.textResult, Styles.paddingTopBottom)}>
                        <div style={Styles.lineWord}>
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

