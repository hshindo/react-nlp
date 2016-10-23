import React, { Component, PropTypes } from "react";
import AceEditor from "react-ace";

import { View } from "../../../lib";

const testData = [
  {
    chunk: ["Darth", "Vador", ",", "also", "known", "as", "Anakin", "Skywalker", "is", "a", "fictional", "character", "."],
    annotations: [
      [
        { label: "Darth_Vador", from: 0, to: 1 },
        { label: "Darth_Vador", from: 6, to: 7 }
      ],
      [
        { label: "PERSON", from: 0, to: 1, color: "blue"},
        { label: "PERSION", from: 6, to: 7, color: "blue"}
      ],
      [
        { label: "NNP", from: 0, to: 0, color: "pink" },
        { label: "NNP", from: 1, to: 1, color: "pink" },
        { label: ",", from: 2, to: 2, color: "yellow" },
        { label: "RB", from: 3, to: 3, color: "green" },
        { label: "VBN", from: 4, to: 4, color: "red" },
        { label: "IN", from: 5, to: 5, color: "pink" }
      ],
    ],
    subText: [
      "ダースベイダー, またはアナキンスカイウォーカーは, 空想のキャラクターだ。"
    ]
  },
  {
    chunk: ["He", "is", "originally", "a", "good", "person", ",", "but"],
    annotations: [
      [
        { label: "PRP", from: 0, to: 0, color: "pink" },
        { label: "VBZ", from: 1, to: 1, color: "pink" },
        { label: "RB", from: 2, to: 2, color: "yellow" },
        { label: "DT", from: 3, to: 3, color: "green" },
        { label: "JJ", from: 4, to: 4, color: "red" },
        { label: "NN", from: 5, to: 5, color: "pink" },
        { label: ",", from: 6, to: 6, color: "pink" },
        { label: "CC", from: 7, to: 7, color: "pink" }
      ]
    ],
    subText: [
      "彼はもともと良い人間だった、しかし"
    ]
  }
];

class App extends Component {
  onEditorChange(arg) {
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
              onChange={this.onEditorChange}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{$blockScrolling: true}}
          />
        </div>
        <div style={{float: "left", width: "50%"}}>
          <View data={testData} linum={true} />
        </div>
      </div>
    );
  }
}

export default App;
