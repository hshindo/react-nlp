import React from 'react';
import Word from './WordComponent.jsx';



class LineComponent extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        let renderWord = this.props.line.items.map((item, index) => {
            return <Word key={index} index={index} data={item}/>
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
            </div>
        )
    }
}

LineComponent.defaultProps = {
    line: {
        items: [
            {
                bgColorNe: "#ffccaa",
                ne       : "PERSON",
                wiki     : 'Darth_Vador',
                words    : [
                    {
                        bgColorForm     : "rgba(255, 253, 168 , 0.2)",
                        bgColorPos      : "#e3e3e3",
                        cacheBgColorForm: "rgba(255, 253, 168 , 0.2)",
                        form            : "Darth",
                        pos             : "NNP"
                    },
                    {
                        bgColorForm     : "rgba(255, 253, 168 , 0.2)",
                        bgColorPos      : "#fffda8",
                        cacheBgColorForm: "rgba(255, 253, 168 , 0.2)",
                        form            : "Vador",
                        pos             : "NNP"
                    }
                ],
            },
            {
                words: [
                    {
                        form: ","
                    }
                ],
            },
            {
                words: [
                    {
                        bgColorForm     : "rgba(255, 253, 168 , 0.2)",
                        bgColorPos      : "#fffda8",
                        cacheBgColorForm: "rgba(255, 253, 168 , 0.2)",
                        form            : "also",
                        pos             : "NNP"
                    }
                ],
            },
            {
                words: [
                    {
                        bgColorForm     : "rgba(255, 253, 168 , 0.2)",
                        bgColorPos      : "#fffda8",
                        cacheBgColorForm: "rgba(255, 253, 168 , 0.2)",
                        form            : "known",
                        pos             : "NNP"
                    }
                ],
            }

        ],
        text : 'Darth Vador, also known as Anakin Skywalker is a fictional character.'
    }
};

// LineComponent.propTypes = {
//   line: React.PropTypes.any.required
// };


export default LineComponent;

