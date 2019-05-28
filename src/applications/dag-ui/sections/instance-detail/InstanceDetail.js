import React from 'react';
import PropTypes from 'prop-types';

import { withDAGUI } from '../../storeConnection';
import { VerticalGraph } from '../../components/VerticalGraph';
import { getDetailSubGraph } from 'applications/dag-ui/utils/detail-graph';

import { getCustomStyle, getInstanceStepIcon } from './graphStyle';

function InstanceDetail({ graph, instance }) {
    const runningNodes = Object.values(instance.data).filter(node => node.status === 'running').map(node => node.id);
    const subGraph = getDetailSubGraph(graph, runningNodes, 1);
    
    const subGraphCustomStyle = getCustomStyle(graph, instance);
    const graphCustomStyle = getCustomStyle(graph, instance);
    graphCustomStyle.node.label = '';
    delete graphCustomStyle.node.width;
    
    return <div className="row" style={{ height: '100%' }}>
        <div className="col-xs-12 col-md-3">
            <div className="dag-ui__full-section-container dag-ui__section">
                <VerticalGraph graph={graph} customStyle={graphCustomStyle} />
            </div>
        </div>
        <div className="col-xs-12 col-md-5">
            <div className="dag-ui__full-section-container dag-ui__section">
                <VerticalGraph graph={subGraph} customStyle={subGraphCustomStyle} />
            </div>
        </div>
        <div className="col-xs-12 col-md-4">
            <div className="dag-ui__full-section-container">
                <div className="dag-ui__instance__details-container">
                <h2 style={{ marginTop: 0 }}>Running steps</h2>
                {runningNodes.map(runningNode => {
                    const stage = graph.nodes[runningNode];
                    const stageInstance = instance.data[runningNode];
                    return <div key={`running-node-${runningNode}`} className="dag-ui__section" style={{ marginBottom: '15px' }}>
                        <h3><i className="fas fa-sitemap" style={{ fontSize: '12px' }} /> {stage.label}</h3>
                        {stage.steps.map(step => {
                            const stepInstance = stageInstance.steps[step.id];
                            const status = stepInstance.status;
                            return <div
                                key={`running-node-${runningNode}-step-${step.id}`}
                                className={`dag-ui__instance-step dag-ui__instance-step-${status}`}
                            >
                                <div className="dag-ui__instance-step__title">
                                    <div>
                                        <i className={getInstanceStepIcon(status)} /> {step.label}
                                    </div>
                                    {status === 'completed' && 
                                        <div className="dag-ui__instance-step__title-details">
                                            <label>Completed on: </label> {stepInstance.end_date}
                                        </div>
                                    }
                                </div>
                                {status === 'running' && 
                                    <div className="dag-ui__instance-step__details">
                                        <div><label>Start date</label> {stepInstance.start_date}</div>
                                        <div><label>Completion date</label></div>
                                    </div>
                                }
                            </div>;
                        })}
                    </div>;
                })}
                </div>
            </div>
        </div>
    </div>;
}

InstanceDetail.propTypes = {
    graph: PropTypes.object.isRequired,
    instance: PropTypes.object.isRequired,
};


function InstanceDetailWrapper({ dag_store, instanceId }) {
    const instance = dag_store.instances[instanceId];
    return <InstanceDetail graph={dag_store.graphs[instance.graphId]} instance={instance} />;
}

InstanceDetailWrapper.propTypes = {
    dag_store: PropTypes.object.isRequired,
    instanceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const connectedInstanceDetail = withDAGUI(InstanceDetailWrapper);
export { connectedInstanceDetail as InstanceDetail };