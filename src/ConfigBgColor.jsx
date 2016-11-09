const listColor = {
    "CC"           : "white",
    "-LRB-"        : "#e3e3e3",
    "-RRB-"        : "#e3e3e3",
    "JJ"           : "#fffda8",
    "JJR"          : "#fffda8",
    "JJS"          : "#fffda8",
    "RB"           : "#fffda8",
    "RBR"          : "#fffda8",
    "RBS"          : "#fffda8",
    "WRB"          : "#fffda8",
    "DT"           : "#ccadf6",
    "PDT"          : "#ccdaf6",
    "WDT"          : "#ccdaf6",
    "CD"           : "#ccdaf6",
    "NN"           : "#a4bced",
    "NNP"          : "#a4bced",
    "NNPS"         : "#a4bced",
    "NNS"          : "#a4bced",
    "PRP"          : "#ccdaf6",
    "PRP__DOLLAR__": "#ccdaf6",
    "WP"           : "#ccdaf6",
    "WP__DOLLAR__" : "#ccdaf6",
    "IN"           : "#ffe8be",
    "TO"           : "#ffe8be",
    "MD"           : "#adf6a2",
    "VB"           : "#adf6a2",
    "VBD"          : "#adf6a2",
    "VBG"          : "#adf6a2",
    "VBN"          : "#adf6a2",
    "VBP"          : "#adf6a2",
    "VBZ"          : "#adf6a2",
    "EX"           : "#e4cbf6",
    "FW"           : "#e4cbf6",
    "LS"           : "#e4cbf6",
    "POS"          : "#e4cbf6",
    "RP"           : "#e4cbf6",
    "SYM"          : "#e4cbf6",
    "UH"           : "#e4cbf6",
    "__DOLLAR__"   : "#e4cbf6",
    "DATE"         : "#9affe6",
    "DURATION"     : "#9affe6",
    "TIME"         : "#9affe6",
    "LOCATION"     : "#95dfff",
    "MISC"         : "#f1f447",
    "NUMBER"       : "#df99ff",
    "ORGANIZATION" : "#8fb2ff",
    "PERCENT"      : "#ffa22b",
    "PERSON"       : "#ffccaa",
    "SET"          : "#ff7c95"
};

class ConfigBgColor {

    static getColor(bgColors = listColor, key) {
        return bgColors[key];
    }

    static getBgColors() {
        return listColor;
    }
}

export default ConfigBgColor;

