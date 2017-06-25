import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import {
  createStyleSheet,
  withStyles,
} from 'material-ui/styles';
import { Typography } from 'material-ui';

// Type checking & defaults
const propTypes = {
  classes: PropTypes.object.isRequired,
};
const defaultProps = {};
const contextTypes = {};

// Styles
const styleSheet = createStyleSheet('Home', {
  root: {},
  section: {
    margin: '24px 0',
  },
});

class Home extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
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
      </div>
    );
  }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
Home.contextTypes = contextTypes;

export default withStyles(styleSheet)(Home);
