import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';

import { Dashboard } from './Dashboard';

export default function App ({ store }) {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        </Provider>
    );
};

App.propTypes = {
  store: PropTypes.object.isRequired
};
