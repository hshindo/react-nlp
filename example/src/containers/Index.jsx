import React from 'react';
import View  from "../../../lib";
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppMenuBar from './AppMenuBar';

import AceEditor from 'react-ace';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'brace/mode/markdown';
import 'brace/theme/github';

injectTapEventPlugin();

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state           = {
            data: [], editorValue: '', settingDisplay: {
                en  : true,
                ja  : true,
                cn  : true,
                pos : true,
                ne  : true,
                wiki: true
            }
        };
        this.ws              = new WebSocket('ws://jukainlp.hshindo.com');
        this.ws.onopen       = (() => {
            toastr.options.timeOut       = 1500;
            toastr.options.closeButton   = true;
            toastr.options.positionClass = "toast-bottom-right";
            toastr.success('Connected successfully');
        });
        this.onChange        = this.onChange.bind(this);
        this.onCheckMenuTran = this.onCheckMenuTran.bind(this);
        this.onCheckMenuAnal = this.onCheckMenuAnal.bind(this);

        this.ws.onmessage = ((msg) => {
            let data = JSON.parse(msg.data);
            this.setState({data: data});
        });

    }

    getChildContext() {
        return {muiTheme: getMuiTheme(baseTheme)};
    }


    onCheckMenuTran(item) {
        if (item.type == 'tran_en') {
            this.state.settingDisplay.en = item.checked;
        }
        if (item.type == 'tran_ja') {
            this.state.settingDisplay.ja = item.checked;
        }
        if (item.type == 'tran_cn') {
            this.state.settingDisplay.cn = item.checked;
        }
        this.setState({settingDisplay: this.state.settingDisplay});
    }

    onCheckMenuAnal(item) {
        if (item.type == 'pos') {
            this.state.settingDisplay.pos = item.checked;
        }
        if (item.type == 'ne') {
            this.state.settingDisplay.ne = item.checked;
        }
        if (item.type == 'wiki') {
            this.state.settingDisplay.wiki = item.checked;
        }
        this.setState({settingDisplay: this.state.settingDisplay});
    }

    onChange(newValue) {
        this.setState({editorValue: newValue});
        this.ws.send(JSON.stringify({
            "text"    : newValue,
            "lang"    : "en",
            "pos"     : true,
            "entity"  : true,
            "trans-ja": true,
            "trans-en": true,
            "trans-cn": true,
        }));
    }

    render() {
        return (
            <div>
                <AppMenuBar onCheckMenuAnal={this.onCheckMenuAnal} onCheckMenuTran={this.onCheckMenuTran}/>
                <div className="ace-editor-wrapper">
                    <div className="col-sm-6" style={{paddingLeft: 0}}>
                        <AceEditor
                            width="100%"
                            className="ace-editor"
                            showPrintMargin={false}
                            fontSize={18}
                            value={this.state.editorValue}
                            mode="markdown"
                            theme="github"
                            onChange={this.onChange}
                            name="UNIQUE_ID_OF_DIV"
                            editorProps={{$blockScrolling: true}}
                        />
                    </div>
                    <div className="col-sm-6 line">
                        <View data={this.state.data} settings={this.state.settingDisplay}/>
                    </div>
                </div>
            </div>
        )
    }
}

Index.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default Index;

