import React from 'react';
import PropTypes from 'prop-types';

import { withDAGUI } from '../../storeConnection';
import { VerticalGraph } from '../../components/VerticalGraph';

function GraphDetail({ graph }) {
    return <div className="row" style={{ height: '100%' }}>
        <div className="col-xs-12 col-md-5">
            <VerticalGraph graph={graph} />
        </div>
        <div className="col-xs-12 col-md-7">
            <h2>Details</h2>
            <p>Details of the graph will be here.</p>

            <h2>Schedule</h2>
            <p>A calendar view will be here, with planned runs for this specific report.</p>

        </div>
    </div>;
}

GraphDetail.propTypes = {
    graph: PropTypes.object.isRequired,
};


function GraphDetailWrapper({ dag_store, graphId }) {
    return <GraphDetail graph={dag_store.graphs[graphId]} />;
}

GraphDetailWrapper.propTypes = {
    dag_store: PropTypes.object.isRequired,
    graphId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const connectedGraphDetail = withDAGUI(GraphDetailWrapper);
export { connectedGraphDetail as GraphDetail };