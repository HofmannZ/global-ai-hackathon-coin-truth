import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import {
  SvgIcon,
} from 'material-ui';
import { white } from 'material-ui/styles/colors';

// Type checking & defaults
const propTypes = {
  color: PropTypes.string.isRequired,
};
const defaultProps = {
  color: white,
};
const contextTypes = {};

const GithubIcon = (props) => {
  const { color } = props;
  return (
    <SvgIcon>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 23.41">
        <title>github</title>
        <path d="M12,0A12,12,0,0,0,8.21,23.39c.6.11.82-.26.82-.58s0-1,0-2c-3.34.73-4-1.61-4-1.61A3.18,3.18,0,0,0,3.64,17.4c-1.09-.74.08-.73.08-.73a2.52,2.52,0,0,1,1.84,1.24,2.55,2.55,0,0,0,3.49,1,2.56,2.56,0,0,1,.76-1.6C7.15,17,4.34,16,4.34,11.37A4.64,4.64,0,0,1,5.58,8.15,4.32,4.32,0,0,1,5.7,5s1-.32,3.3,1.23a11.37,11.37,0,0,1,6,0C17.3,4.65,18.3,5,18.3,5a4.31,4.31,0,0,1,.12,3.18,4.63,4.63,0,0,1,1.23,3.22c0,4.61-2.81,5.62-5.48,5.92A2.86,2.86,0,0,1,15,19.52c0,1.6,0,2.9,0,3.29s.22.69.83.58A12,12,0,0,0,12,0Z" fill={color} fillRule="evenodd"/>
      </svg>
    </SvgIcon>
  );
};

GithubIcon.propTypes = propTypes;
GithubIcon.defaultProps = defaultProps;
GithubIcon.contextTypes = contextTypes;

export default GithubIcon;
