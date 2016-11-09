import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';

import MenuBar from './MenuBar';

const styles = {
    menuBar: {
        backgroundColor: '#2e98d1',
    },
    menuIcon: {
        color: 'white',
    },
};

class AppMenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onMenuTran = this.onMenuTran.bind(this);
        this.onMenuAnal = this.onMenuAnal.bind(this);
    }

    onMenuTran(item) {
        this.props.onCheckMenuTran(item);
    }

    onMenuAnal(item) {
        this.props.onCheckMenuAnal(item);
    }

    handleToggle (){
        this.setState({open: !this.state.open})
    };

    handleClose (){
        this.setState({open: false});
    }


    render() {
        return (
            <div>
                <AppBar
                    title="JukaiNLP"
                    onLeftIconButtonTouchTap={this.handleToggle}
                    iconElementRight={
                    <IconButton
                        iconClassName="muidocs-icon-custom-github"
                        tooltip="GitHubリンク"
                        tooltipPosition="bottom-left"
                        href="https://github.com/hshindo/JukaiNLP.jl"
                        target="_blank"
                    />
                }
                    style={ styles.menuBar }
                />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <MenuBar onMenuAnal={this.onMenuAnal} onMenuTran={this.onMenuTran}/>
                </Drawer>
            </div>

        );
    }
}

export default AppMenuBar;
