import * as actions from './actions';

import { executeDemoAction } from './demo/demoActions';

const INITIAL_STATE = {
    initialized: false,
    graphs: {},
    instances: {},
    demo: {
        action: 0,
    }
};

const dag_store = (currentState, action) => {
    const state = currentState ? currentState : INITIAL_STATE;

    switch (action.type) {
        case actions.INITIALIZE:
            return { ...state, initialized: true };

        case actions.SET_GRAPHS:
            return { ...state, graphs: action.data };

        case actions.SET_INSTANCES:
            return { ...state, instances: action.data };

        case actions.DEMO_NEXT_ACTION:
            console.log('Execute demo action: ', state.demo.action);
            return executeDemoAction(state);

        default:
            return state;
    }
};

export const reducers = {
    dag_store,
};
