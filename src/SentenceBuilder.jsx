import ConfigBgColor from './ConfigBgColor';

class SentenceBuilder {
    constructor(configBgColors) {
        this.configBgColors = configBgColors;
    }

    buildListSentence(data = []) {

        let lst = [];
        data.map((sentence)=> {
            let anno = sentence.anno;
            let text = sentence.text;
            anno = anno.map((anno) => {
                let color = ConfigBgColor.getColor(this.configBgColors, anno[3]) ? ConfigBgColor.getColor(this.configBgColors, anno[3]):'';
                return {
                    form: text.substring(anno[1], anno[2] + 1),
                    pos: anno[3],
                    type: anno[0],
                    start: anno[1],
                    bgColorPos      : color,
                    bgColorForm     : this.convertHex(color, 20),
                    cacheBgColorForm: this.convertHex(color, 20),
                    end: anno[2]
                };
            });

            let listItem = [];
            let start = null,
                end = null;
            let item = {
                words: []
            };

            anno.map((anno) => {
                if (anno.type == 'wiki') {
                    start = anno.start;
                    end = anno.end;

                    item.wiki =  anno.pos;
                    item.start =  anno.start;
                    item.end =  anno.end;
                    item.words = [];
                    return;
                }
                if (anno.type == 'entity') {
                    start = anno.start;
                    end = anno.end;

                    item.ne =  anno.pos;
                    item.start =  anno.start;
                    item.end =  anno.end;
                    item.words = [];
                    item.bgColorNe = ConfigBgColor.getColor(this.configBgColors, anno.pos);
                    return;
                }

                if (start === null && end === null) {
                    listItem.push({words: [anno]});
                    return;
                }

                if (anno.start >= item.start && anno.end <= item.end) {
                    item.words.push(anno);
                } else {
                    listItem.push(item);
                    item = {words: [anno]};
                }
            });

            listItem.push(item);
            lst.push({
                text : text,
                items: listItem
            })
        });
        console.log(lst);
        return lst;
    }

    convertHex(hex, opacity) {
        if(hex) {
            hex   = hex.replace('#', '');
            let r = parseInt(hex.substring(0, 2), 16);
            let g = parseInt(hex.substring(2, 4), 16);
            let b = parseInt(hex.substring(4, 6), 16);

            return `rgba(${r}, ${g}, ${b} , ${opacity / 100})`;
        }
        return '';
    }
}

export default SentenceBuilder
