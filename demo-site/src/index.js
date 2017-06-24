import React from 'react';
import ReactDOM from 'react-dom';

// Material UI
import {
  MuiThemeProvider,
  createMuiTheme,
} from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import {
  blue,
  pink,
  red,
} from 'material-ui/styles/colors';

// Components
import App from './App';

// Styles
import 'normalize.css';
import 'typeface-roboto';

// Offline
import registerServiceWorker from './registerServiceWorker';

// Theme
const theme = createMuiTheme({
  palette: createPalette({
    primary: blue,
    accent: pink,
    error: red,
  }),
});

ReactDOM.render((
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
), document.getElementById('root'));
registerServiceWorker();
