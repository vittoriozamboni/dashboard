import React from 'react';
import PropTypes from 'prop-types';

import { store } from 'store/store';

import { withDAGUI } from '../storeConnection';
import { DEMO_NEXT_ACTION } from '../actions';

function HeaderControls({ dag_store }) {
    return <div>
        Demo <i className="icon-control fas fa-play" onClick={() => store.dispatch({ type: DEMO_NEXT_ACTION })} />
    </div>;
}

HeaderControls.propTypes = {
    dag_store: PropTypes.object,
};

const connectedHeaderControls = withDAGUI(HeaderControls);
export { connectedHeaderControls as LandingHeaderControls };