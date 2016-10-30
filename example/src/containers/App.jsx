import React, { Component, PropTypes } from "react";
import AceEditor from "react-ace";

import { View } from "../../../lib";

const testData = [
  {
    text: "Darth Vador, also known as Anakin Skywalker is a fictional character.",
    anno: [
      ["wiki", 0, 10, "Darth_Vador"],
      ["wiki", 27, 42, "Darth_Vador"],
      ["ne", 0, 10, "PERSON"],
      ["ne", 27, 42, "PERSON"],
      ["pos", 0, 4, "NNP"],
      ["pos", 6, 10, "NNP"],
      ["pos", 11, 11, ","]
    ],
    subText: [
      "ダースベイダー, またはアナキンスカイウォーカーは, 空想のキャラクターだ。"
    ]
  },
  {
    text: "He is originally a good person, but",
    anno: [
      ["pos", 0, 1, "PRP"],
      ["pos", 3, 4, "VBZ"],
      ["pos", 6, 15, "RB"],
      ["pos", 17, 17, "DT"],
      ["pos", 19, 22, "JJ"],
      ["pos", 24, 29, "NN"],
      ["pos", 30, 30, ","],
      ["pos", 32, 34, "CC"]
    ],
    subText: [
      "彼はもともと良い人間だった、しかし"
    ]
  }
];

// 3行目以降に利用する適当なデータ
const defaultData = {
  anno: [
    ["pos", 0, 1, "PRP"],
    ["pos", 3, 4, "VBZ"],
    ["pos", 6, 15, "RB"],
    ["pos", 17, 17, "DT"],
    ["pos", 19, 22, "JJ"],
    ["pos", 24, 29, "NN"],
    ["pos", 30, 30, ","],
    ["pos", 32, 34, "CC"],
    ["wiki", 0, 10, "Darth_Vador"],
    ["wiki", 27, 41, "Darth_Vador"],
    ["ne", 0, 10, "PERSON"],
    ["ne", 27, 41, "PERSON"],
    ["pos", 0, 4, "NNP"],
    ["pos", 6, 10, "NNP"],
    ["pos", 11, 11, ","]
  ],
  subText: [
    "nothing"
  ]
}

class App extends Component {
  constructor(props) {
    super(props);
    this.serverMode = location.search.indexOf("server=yes") >= 0;
    if (this.serverMode) {
      this.isOpen = false;
      this.connection = new WebSocket("ws://jukainlp.hshindo.com");
      this.connection.onopen = () => {
        this.isOpen = true;
        console.log("websocket open");
      };
      this.connection.onmessage = this.onMessage.bind(this);
      this.state = {
        text: ""
      };
    } else {
      this.state = {
        text: testData[0].text + "\n" + testData[1].text
      };
    }
  }
  onMessage(ev) {
    this.setState({
      data: JSON.parse(ev.data)
    });
  }
  onEditorChange(newValue) {
    if (this.serverMode && this.isOpen) {
      this.connection.send(JSON.stringify({text: newValue}));
    }
    this.setState({
      text: newValue
    });
  }
  render() {
    let data = null;
    let colors = null;
    if (this.serverMode) {
      data = this.state.data;
      colors = {
        pos: require("json!../colors/pos.json"),
        ne: require("json!../colors/ne.json")
      }
    } else {
      data = testData;
      colors = {
        wiki: {
          "Darth_Vador": "gray"
        },
        ne: {
          "PERSON": "yellow"
        },
        pos: {
          ",": "lightgreen"
        }
      };
      const lines = this.state.text.split("\n");
      for (let i = 0; i < lines.length; i++) {
        if (i < 2) {
          data[i].text = lines[i];
        } else {
          if (data[i]) {
            data[i].text = lines[i];
          } else {
            data[i] = {
              text: lines[i],
              anno: defaultData.anno,
              subText: defaultData.subText
            }
          }
        }
      }
      data.length = lines.length;
    }
    return (
      <div>
        <div style={{float: "left", width: "50%"}}>
          <AceEditor
              width="100%"
              showPrintMargin={false}
              fontSize={18}
              value={this.state.text}
              mode="markdown"
              theme="github"
              onChange={this.onEditorChange.bind(this)}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{$blockScrolling: true}}
          />
        </div>
        <div style={{float: "left", width: "50%"}}>
          <View data={data}
                linum={true}
                types={["wiki", "ne", "pos"]}
                colors={colors}
          />
        </div>
      </div>
    );
  }
}

export default App;
