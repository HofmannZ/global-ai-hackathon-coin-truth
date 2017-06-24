import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import {
  createStyleSheet,
  withStyles,
} from 'material-ui/styles';
import {
  AppBar,
  Toolbar,
  Drawer,
  Typography,
  IconButton,
} from 'material-ui';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';

// Components
import GithubIcon from '../GithubIcon';

// Type checking & defaults
const propTypes = {
  classes: PropTypes.object.isRequired,
};
const defaultProps = {};
const contextTypes = {};

// Styles
const styleSheet = createStyleSheet('ButtonAppBar', {
  root: {
    width: '100%',
  },
  drawer: {
    width: 249,
  },
  main: {
    marginLeft: 249,
    minHeight: '100vh',
  },
  appBar: {
    position: 'relative',
  },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 24px',
  },
  content: {
    marginTop: 64,
    maxWidth: 900,
  },
  section: {
    margin: '24px 0',
  },
  flex: {
    flex: 1,
  },
});

class App extends Component {
  handleGithubClick = () => {
    window.location = 'https://github.com/HofmannZ/global-ai-hackathon-coin-truth';
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Drawer
          classes={{ paper: classes.drawer }}
          docked
          open
        >
          <List>
            <ListItem button>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Demo" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Whitepaper" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.main}>
          <AppBar
            classes={{ root: classes.appBar }}
            position="fixed"
          >
            <Toolbar>
              <Typography
                className={classes.flex}
                type="title"
                color="inherit"
              >
                Coin truth
              </Typography>
              <IconButton
                color="contrast"
                onClick={this.handleGithubClick}
              >
                <GithubIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.contentWrapper}>
            <section className={classes.content}>
              <Typography type="display3" gutterBottom>
                Global AI Hackathon 2017
              </Typography>
              <section className={classes.section}>
                <Typography type="display1" gutterBottom>
                  The challenge
                </Typography>
                <Typography type="body2" gutterBottom>
                  The challenge is to build a model which will make it easier and more efficient to identify what really is fake news and what is not (+ everything in between). Our model should be able to determine a level of credibility, content authenticity, and limit the viral spread of fake content, including fake images.
                </Typography>
              </section>
              <section className={classes.section}>
                <Typography type="display1" gutterBottom>
                  Our interpretation
                </Typography>
                <Typography type="body2" gutterBottom>
                  We will narrow down our AI to finding fake news regarding flux in crypto currencies. In particular Bitcoin, this way we have a load of training data.
                </Typography>
              </section>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;
App.contextTypes = contextTypes;

export default withStyles(styleSheet)(App);
