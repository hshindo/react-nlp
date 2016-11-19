import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
    subHeaderItem: {
        cursor: 'pointer',
    },
};

class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuLang : [
                {
                    text: 'Auto',
                    type: 'lang_auto'
                },
                {
                    text: 'English',
                    type: 'lang_en'
                },
                {
                    text: 'Japanese',
                    type: 'lang_jp'
                }
            ],
            menuAnal : [
                {
                    text   : 'POS',
                    checked: true,
                    type   : 'pos'
                },
                {
                    text   : 'NE',
                    checked: true,
                    type   : 'ne'
                },
                {
                    text   : 'Wiki-link',
                    checked: true,
                    type   : 'wikilink'
                }
            ],
            menuTrans: [
                {
                    text   : 'English',
                    checked: true,
                    type   : 'tran_en'
                },
                {
                    text   : 'Japanese',
                    checked: true,
                    type   : 'tran_ja'
                },
                {
                    text   : 'Chinese',
                    checked: true,
                    type   : 'tran_cn'
                }
            ]
        }
        this.onCheckMenuTran = this.onCheckMenuTran.bind(this);
    }
    
    onCheckMenuAnal(item) {
        item.checked = !item.checked;
        this.state.menuAnal.map((menu)=> {
            if (menu.type == item.type) {
                return item;
            }
            return item;
        });
        this.setState({menuAnal: this.state.menuAnal});
        this.props.onMenuAnal(item);

    }

    onCheckMenuTran(item) {
        item.checked = !item.checked;
        this.state.menuTrans.map((menu)=> {
            if (menu.type == item.type) {
                return item;
            }
            return item;
        });
        this.setState({menuTrans: this.state.menuTrans});
        this.props.onMenuTran(item);
    }


    render() {
        let renderMenuAnal = this.state.menuAnal.map((item, index)=> {
            var onCheck = this.onCheckMenuAnal.bind(this, item);
            return (
                <MenuItem key={index} className="menu-item">
                    <List>
                        <ListItem
                            leftCheckbox={
                            <Checkbox
                                  label={item.text}
                                  checked={item.checked}
                                  onCheck={onCheck}
                                />

                            }
                        />
                    </List>
                </MenuItem>
            );
        });
        let renderMenuLang = this.state.menuLang.map((item, index)=> {
            return (
                <RadioButton key={index}
                             value={item.type}
                             label={<span style={{paddingLeft: '10px'}}>{item.text}</span>}
                             style={{paddingLeft: '15px', paddingTop: '15px', paddingBottom: '15px'}}
                />
            );
        });
        let renderMenuTran = this.state.menuTrans.map((item, index)=> {
            var onCheck = this.onCheckMenuTran.bind(this, item);
            return (
                <MenuItem key={index} className="menu-item">
                    <List>
                        <ListItem
                            primaryText={item.text}
                            leftCheckbox={
                                <Checkbox
                                    checked={item.checked}
                                    onCheck={onCheck}
                                />
                            }
                        />
                    </List>
                </MenuItem>
            );
        });
        return (
            <div>
                <MenuItem className="menu-item" disabled={ true } style={ styles.subHeaderItem }>
                    <Subheader>Analysis</Subheader>
                </MenuItem>
                {renderMenuAnal}

                <MenuItem className="menu-item" disabled={ true } style={ styles.subHeaderItem }>
                    <Subheader>Language</Subheader>
                </MenuItem>
                <div style={{paddingLeft: '15px'}}>
                    <RadioButtonGroup name="shipSpeed" defaultSelected="lang_auto">
                        {renderMenuLang}
                    </RadioButtonGroup>
                </div>
                <MenuItem className="menu-item" disabled={ true } style={ styles.subHeaderItem }>
                    <Subheader>Translation</Subheader>
                </MenuItem>
                {renderMenuTran}
            </div>
        );
    }
}

export default MenuBar;
