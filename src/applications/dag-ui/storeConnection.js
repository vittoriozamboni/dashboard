import { connect } from 'react-redux';

function mapStateToProps(state) {
    const { dag_store } = state;

    return {
        dag_store
    };
}

export const withDAGUI = connect(mapStateToProps);

