import React from 'react';

class SettingLang extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.display ? 'display-flex' : 'hide'}>
                <div className="item-count text-right padding-top-bottom">
                    {this.props.lang}
                </div>
                <div className="border-left text-result padding-top-bottom">
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

