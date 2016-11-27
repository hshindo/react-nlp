# react-nlp

Visualization of Natural Language Processing for React

## Installation

```
npm install react-nlp
```

## Usage

```
import React from "react";
import { render } from "react-dom";
import { View } from "react-nlp";

render(
  <View
    types={types}
    data={data}
    colors={colors}
  />,
  document.getElementById("root")
);
```

## Properties of View Component

|     Property      |     Type     |    Optional    |  Default  | Description                                        |
|:------------------|:-------------|:---------------|:----------|:---------------------------------------------------|
| types             | Array        | No             | -         | Annotation type list                               |
| data              | Array        | No             | -         | Text and annotation data                           |
| colors            | Object       | Yes            | -         | Color map for annotation labels                    |
| linum             | boolean      | Yes            | `true`    | If true, show line numbers                         |
| lineBreak         | boolean      | Yes            | `true`    | If true, enable line break                         |
| keepWhiteSpaces   | boolean      | Yes            | `false`   | If true, show multiple consecutive whitespace      |
| theme             | Object       | Yes            | -         | Override the [defaultTheme](./src/Theme.js#L1-L13) |


### types

The `types` is an array of annotation type to show.

The annotations are shown in the order of `types`.

example:

```
["wiki", "ne", "pos"]
```

### data

The `data` is an array of the object consists of a text and annotation data .

|     Property      |     Type     |    Optional    | Description                         |
|:------------------|:-------------|:---------------|:------------------------------------|
| data[].text       | string       | No             | Text                                |
| data[].anno       | Array        | No             | Annotation data for the text        |
| data[].anno[][0]  | string       | No             | Annotation type                     |
| data[].anno[][1]  | number       | No             | Start index of the text to annotate |
| data[].anno[][2]  | number       | No             | End index of the text to annotate   |
| data[].anno[][3]  | string       | No             | Annotation label                    |

example:

```
[
  {
    text: "Darth Vador, also known as Anakin Skywalker is a fictional character.",
    anno: [
      ["wiki", 0, 10, "Darth_Vador"],
      ["wiki", 27, 41, "Darth_Vador"],
      ["ne", 0, 10, "PERSON"],
      ["ne", 27, 41, "PERSON"],
      ["pos", 0, 4, "NNP"],
      ["pos", 6, 10, "NNP"],
      ["pos", 11, 11, ","]
    ]
  },
  {
    text: "He is originally a good person, but",
    anno: [
      ["pos", 0, 1, "PRP"],
      ["pos", 3, 4, "VBZ"],
      ["pos", 6, 15, "RB"],
      ["pos", 17, 17, "DT"],
    ]
  }
]
```

### colors

The `colors` is a map for colors for annotation labels.

example:

```
{
  "wiki": {
    "Darth_Vador": "gray"
  },
  "ne": {
    "PERSON": "yellow"
  },
  "pos": {
    ",": "#84b62b"
  }
}
```

### theme

|     Property          |     Type       | Default                  | Description                         |
|:----------------------|:---------------|:-------------------------|:------------------------------------|
| fontSize              | string\|number | `14`                     | text font size                      |
| borderStyle           | number         | `1`                      | 0: none, 1: full, 2: simple         |
| border                | string         | `"solid 1px #9a9a9a"`    | css border format                   |
| color                 | string         | `"black"`                | text font color                     |
| linumColor            | string         | `"#9a9a9a"`              | linum color                         |
| stripe                | boolean        | `true`                   | enable/disable stripe               |
| stripeColor           | Array          | `["#ffffff", "#f2f2f2"]` | stripe color                        |
| linePadding           | string\|number | `"3px 5px"`              | line padding                        |
| annotationLinePadding | string\|number | `"2px 3px"`              | annotation line padding             |
| labelFontSize         | string\|number | `"0.6em"`                | label font size                     |
| labelColor            | string         | `"black"`                | label color                         |
| labelPadding          | string         | `"2px 3px"`              | label padding                       |
| labelBorder           | string         | `"solid 1px gray"`       | label border                        |
| characterPadding      | string\|number | `0`                      | character padding                   |

## Run Example

```
npm install
npm install react react-dom
npm run build
npm run example
```

Then, access [http://localhost:8080/](http://localhost:8080/) in your browser.

If enable `Server Mode`, access [http://localhost:8080/?server=yes](http://localhost:8080/?server=yes).


## Run Demo App

```
npm install
npm install react react-dom
npm run build
npm run demo
```

Then, access [http://localhost:8080/](http://localhost:8080/) in your browser.

## Dependencies

* react
* react-dom
* css-element-queries
* color

## License

MIT
