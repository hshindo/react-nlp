import React, { Component, PropTypes } from "react";
import AceEditor from "react-ace";

import { View } from "../../../lib";

const testData = [
  {
    text: "Darth Vador, also known as Anakin Skywalker is a fictional character.",
    annos: [
      ["wiki", 0, 10, "Darth_Vador"],
      ["wiki", 27, 37, "Darth_Vador"],
      ["ne", 0, 10, "PERSON"],
      ["ne", 27, 37, "PERSON"],
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
    annos: [
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

class App extends Component {
  onEditorChange(newValue) {
  }
  render() {
    const { editor, actions } = this.props;
    return (
      <div>
        <div style={{float: "left", width: "50%"}}>
          <AceEditor
              width="100%"
              showPrintMargin={false}
              fontSize={18}
              value=""
              mode="markdown"
              theme="github"
              onChange={this.onEditorChange.bind(this)}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{$blockScrolling: true}}
          />
        </div>
        <div style={{float: "left", width: "50%"}}>
          <View data={testData}
                linum={true}
                types={["wiki", "ne", "pos"]}
                colors={{
                  wiki: {
                    "Darth_Vador": "gray"
                  },
                  ne: {
                    "PERSON": "yellow"
                  },
                  pos: {
                    ",": "lightgreen"
                  }
                }}
          />
        </div>
      </div>
    );
  }
}

export default App;
