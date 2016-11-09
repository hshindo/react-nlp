import React from 'react';
import Styles from './Styles';

class SettingLang extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={this.props.display ? Styles.displayFlex : Styles.hide}>
                <div style={Object.assign(Styles.itemCount, Styles.textRight, Styles.paddingTopBottom)}>
                    {this.props.lang}
                </div>
                <div style={Object.assign(Styles.borderLeft, Styles.textResult, Styles.paddingTopBottom)}>
                    {this.props.text}
                </div>
            </div>
        )
    }
}

SettingLang.defaultProps = {
    display: true
};

export default SettingLang;

