import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Router
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';

// Material UI
import {
  createStyleSheet,
  withStyles,
} from 'material-ui/styles';
import { black } from 'material-ui/styles/colors';
import {
  AppBar,
  Toolbar,
  Drawer,
  Typography,
  IconButton,
} from 'material-ui';
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';

// Pages
import Home from '../pages/Home';
import Demo from '../pages/Demo';
import Whitepaper from '../pages/Whitepaper';

// Components
import GithubIcon from '../components/GithubIcon';

// Type checking & defaults
const propTypes = {
  classes: PropTypes.object.isRequired,
};
const defaultProps = {};
const contextTypes = {};

// Styles
const styleSheet = createStyleSheet('App', {
  root: {
    width: '100%',
  },
  drawer: {
    width: 249,
  },
  link: {
    textDecoration: 'none',
    color: black,
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
    flex: 1,
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
            <Link
              className={classes.link}
              to="/"
            >
              <ListItem button>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link
              className={classes.link}
              to="/demo"
            >
              <ListItem button>
                <ListItemText primary="Demo" />
              </ListItem>
            </Link>
            <Link
              className={classes.link}
              to="/whitepaper"
            >
              <ListItem button>
                <ListItemText primary="Whitepaper" />
              </ListItem>
            </Link>
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
                Global AI Hackathon 2017
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
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/demo" component={Demo}/>
                <Route path="/whitepaper" component={Whitepaper}/>
              </Switch>
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
