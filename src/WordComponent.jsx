import React from 'react';

class WordComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state        = {
            data: {
                words: []
            }
        };
        this.mouseOverPos = this.mouseOverPos.bind(this);
        this.mouseOutPos  = this.mouseOutPos.bind(this);
        this.mouseOverNe  = this.mouseOverNe.bind(this);
        this.mouseOutNe   = this.mouseOutNe.bind(this);
    }

    componentWillMount() {
        this.setState({data: this.props.data});
    }

    mouseOverPos(index) {
        this.state.data.words[index].bgColorForm = this.state.data.words[index].bgColorPos;
        this.setState({data: this.state.data})
    }

    mouseOutPos(index) {
        this.state.data.words[index].bgColorForm = this.state.data.words[index].cacheBgColorForm;
        this.setState({data: this.state.data})
    }

    mouseOverNe() {
        this.state.data.words.map(item => {
            item.bgColorForm = this.state.data.bgColorNe;
            return item;
        });
        this.setState({data: this.state.data})
    }

    mouseOutNe() {
        this.state.data.words.map(item => {
            item.bgColorForm = item.cacheBgColorForm;
            return item;
        });
        this.setState({data: this.state.data})
    }


    render() {
        let renderForm = this.state.data.words.map((item, index) => {
            let renderPos    = '';
            let mouseOverPos = this.mouseOverPos.bind(this, index);
            let mouseOutPos  = this.mouseOutPos.bind(this, index);

            if (item.pos && this.props.settings.pos) {
                renderPos =
                    <div className="cat cursor-pointer"
                         onMouseOver={mouseOverPos}
                         onMouseOut={mouseOutPos} style={{backgroundColor: item.bgColorPos}}>
                        {item.pos}
                    </div>
            }
            return <div key={index} className="item-cat">
                {renderPos}
                <div className="form" style={{backgroundColor: item.bgColorForm}}>
                    {item.form}
                </div>
            </div>
        });

        let renderNe = '';
        if (this.state.data.ne && this.props.settings.ne) {
            renderNe = <div className="word-ne cursor-pointer"
                            onMouseOver={this.mouseOverNe}
                            onMouseOut={this.mouseOutNe}
                            style={{backgroundColor: this.state.data.bgColorNe}}>
                {this.state.data.ne}
            </div>;
        }

        let renderWiki = '';
        if(this.state.data.wiki && this.props.settings.wiki) {
            renderWiki = <div>
                {this.state.data.wiki}
            </div>;
        }

        return (
            <div className="word">
                <div className="padding-word-wrapper">
                    <div className="padding-word">
                        {renderNe}
                        {renderWiki}
                    </div>
                </div>
                {renderForm}
            </div>
        )
    }
}

export default WordComponent;

