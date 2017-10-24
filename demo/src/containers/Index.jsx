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

function getWordPosition(data, tag){
  var start = data.span[tag][0];
  var end = data.span[tag][1];
  
  //solve line number
  var lineNum = -1;
  var lineIndex = -1;
  while(lineNum == -1){
    var count = 0;
    var lineStart = 0;
    for(var i = 0; i < data.line.length; i++){
      if(data.line[i][0] == lineStart){
        if(data.line[i][0]<=start && end <= data.line[i][1]){
          lineNum = count;
          lineIndex = i;
        }else{
          lineStart = data.line[i][1] + 2;
          count++;
        }
      }
    }
  }
  //solve index
  var index = 0;
  for(var s in data.span){
    if(data.line[lineIndex][0]<=data.span[s][0] && data.span[s][1] <= data.line[lineIndex][1]){
      if(data.span[s][1] < start){
        index++;
      }
    }
  }
  return [lineNum, index]
}

function reshapeJSON(data, sentence){
  var neo = {"sentences":[],"relations":[]};
  
  //sentences
  for(var i = 0; i < data.line.length; i++){
    var start = data.line[i][0];
    var end = data.line[i][1];
    
    //anno
    var anno = [];
    for(var s in data.span){
      if(start <= data.span[s][0] && data.span[s][1] <= end){
        const originalTag = data.span[s][2];
	      const trimedTag = originalTag.length>5 ? originalTag.substring(0,5) : originalTag;
        var tmp = [s.split("-")[0], data.span[s][0]-start, data.span[s][1]-start, trimedTag, originalTag];
        anno.push(tmp);
      }
    }

    var sen = {"anno": anno, "text":sentence.substring(start,end+1)};
    neo.sentences.push(sen);
  }
  
  //relations
  for(var r in data.relation){
    var first = getWordPosition(data,data.relation[r][1]);
	var second = getWordPosition(data,data.relation[r][2]);
    var rel = [data.relation[r][0], first[0], first[1], second[0], second[1], data.relation[r][3]];
    neo.relations.push(rel);
  }
  return(neo)
}

function getColors(data, types, colors){
  if(!colors){
    colors = {};
  }
  
  for(var d in data.span){
    var ty = d.split("-")[0];
    if(ty in colors === false){
      colors[ty] = {};
	  }
	  
	  var tag = data.span[d][2];
	  if(tag in colors[ty] === false){
		  var col = data.span[d][3];
		  colors[ty][tag] = col;
	  }
  }
  return colors;  
}

function getTypes(data){
  var types = [];
  for(var s in data.span){
	  s = s.split("-")[0];
	  if(types.indexOf(s)==-1){
	    types.push(s);
	  }
  }
  return types;
}

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editorValue: "",
      types: []
    };

    //this.ws = new WebSocket("ws://jukainlp.hshindo.com");
    this.ws = new WebSocket("ws://localhost:3000/iostat");
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
	  //console.log("*****",this.state.editorValue);
	  const reshapedData = reshapeJSON(data, this.state.editorValue);
	  this.setState({data: reshapedData});
	  	  
	  //types
	  var tmpTypes = getTypes(data);
	  this.setState({types: tmpTypes});
	  
	  //colors
	  this.colors = getColors(data,this.state.types, this.colors);

    });
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
                  theme={{}}
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

