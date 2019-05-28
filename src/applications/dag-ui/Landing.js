import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { store } from 'store/store';
import { FullSectionLoader } from 'components/ui/Loader';
import { PageHeader } from 'components/ui/PageHeader';

import { reducers } from './reducers';
import { preload } from './preload';
import { GraphDetail } from './sections/graph-detail/GraphDetail';
import { InstanceDetail } from './sections/instance-detail/InstanceDetail';
import { withDAGUI } from './storeConnection';

import { LandingHeaderControls } from './demo/LandingHeaderControls';

import './style/dag-ui.css';

store.registerReducer('dag_store', reducers.dag_store);

const headerControls = <LandingHeaderControls />;

export function DagUILanding ({ dag_store }) {

    const [route, setRoute] = useState({
        path: 'instance-detail',
        params: { id: 'instance1' }
    });

    useEffect(() => {
        preload();
    }, []);

    if (!dag_store.initialized) {
        return <FullSectionLoader />;
    }

    return <Fragment>
        <PageHeader controls={headerControls}>            
            <div className="dag-ui__header">
                <div onClick={() => setRoute({ path: '' })}>DAG UI</div>
            </div>
        </PageHeader>        
        <div className="ui-page-body dag-ui__container">
            {route.path === '' &&
                <div>
                    <p>Welcome DAG (Directed Acyclic Graph) UI.</p>
                    <span onClick={() => setRoute({ path: 'graph-detail', params: {id: 'graph1'} })}>See details for Graph 1</span>
                    <span onClick={() => setRoute({ path: 'graph-detail', params: {id: 'graph2'} })}>See details for Graph 2</span>
                    <span onClick={() => setRoute({ path: 'instance-detail', params: {id: 'instance1'} })}>See details for Instance 1</span>
                </div>
            }
            {route.path === 'graph-detail' &&
                <GraphDetail graphId={route.params.id} />
            }
            {route.path === 'instance-detail' &&
                <InstanceDetail instanceId={route.params.id} />
            }
        </div>
    </Fragment>;
}

DagUILanding.propTypes = {
    dag_store: PropTypes.object.isRequired,
};

const connectedLanding = withDAGUI(DagUILanding);
export { connectedLanding as Landing };
