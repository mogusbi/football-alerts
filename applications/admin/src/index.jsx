import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';
import Amplify from 'aws-amplify';
import {create} from 'jss';
import React from 'react';
import {render} from 'react-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import App from './App';
import awsconfig from './aws-exports';
import * as serviceWorker from './serviceWorker';

Amplify.configure(awsconfig);

const styleNode = document.createComment('insertion-point-jss');

document.head.insertBefore(styleNode, document.head.firstChild);

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: 'insertion-point-jss'
});

render(
  <JssProvider generateClassName={generateClassName} jss={jss}>
    <App />
  </JssProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
