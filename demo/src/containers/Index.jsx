import React from "react";
import { View } from "../../../lib";
import baseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import AppMenuBar from "./AppMenuBar";

import AceEditor from "react-ace";
import injectTapEventPlugin from "react-tap-event-plugin";
import "brace/mode/markdown";
import "brace/theme/github";

injectTapEventPlugin();

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editorValue: "",
      types: ["entity", "pos", "ne", "wiki"]
    };

    this.ws = new WebSocket("ws://jukainlp.hshindo.com");
    this.ws.onopen = (() => {
      toastr.options.timeOut = 1500;
      toastr.options.closeButton = true;
      toastr.options.positionClass = "toast-bottom-right";
      toastr.success("Connected successfully");
    });
    this.onCheckMenuTran = this.onCheckMenuTran.bind(this);
    this.onCheckMenuAnal = this.onCheckMenuAnal.bind(this);

    this.ws.onmessage = ((msg) => {
      const data = JSON.parse(msg.data);
      this.setState({data: data});
    });

    this.colors = {
      pos: require("json!../colors/pos.json"),
      entity: require("json!../colors/ne.json")
    }
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }


  onCheckMenuTran(item) {
    /* if (item.type == 'tran_en') {
     *   this.state.settingDisplay.en = item.checked;
     * }
     * if (item.type == 'tran_ja') {
     *   this.state.settingDisplay.ja = item.checked;
     * }
     * if (item.type == 'tran_cn') {
     *   this.state.settingDisplay.cn = item.checked;
     * }
     * this.setState({settingDisplay: this.state.settingDisplay});*/
  }

  onCheckMenuAnal(item) {
    /* const types = this.state.types;
     * if (item.type == "pos" && types.indexOf("pos") > -1) {
     *   this.state.settingDisplay.pos = item.checked;
     * }
     * if (item.type == 'ne') {
     *   this.state.settingDisplay.ne = item.checked;
     * }
     * if (item.type == 'wiki') {
     *   this.state.settingDisplay.wiki = item.checked;
     * }
     * this.setState({settingDisplay: this.state.settingDisplay});*/
  }

  onChange(newValue) {
    this.setState({editorValue: newValue});
    this.ws.send(JSON.stringify({
      "text": newValue
    }));
  }

  render() {
    return (
      <div>
        <AppMenuBar onCheckMenuAnal={this.onCheckMenuAnal} onCheckMenuTran={this.onCheckMenuTran}/>
        <div className="row">
          <div className="col-xs-6 col-md-6">
            <AceEditor
                width="100%"
                className="ace-editor"
                showPrintMargin={false}
                fontSize={18}
                value={this.state.editorValue}
                mode="markdown"
                theme="github"
                onChange={this.onChange.bind(this)}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{$blockScrolling: true}}
            />
          </div>
          <div className="col-xs-6 col-md-6">
            <View data={this.state.data.sentences}
                  relations={this.state.data.relations}
                  linum={true}
                  types={this.state.types}
                  colors={this.colors}
                  theme={{
                    fontSize: 18,
                    labelFontSize: "12px",
                    linePadding: "10px",
                    borderStyle: 2,
                    characterPadding: "0px"
                  }}b
            />
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

