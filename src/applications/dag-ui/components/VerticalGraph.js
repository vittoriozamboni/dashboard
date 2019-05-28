import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

cytoscape.use( dagre );

export class VerticalGraph extends Component {

    constructor(props) {
        super(props);

        this.graphContainer = React.createRef();
        this.graphInstance = null;
    }

    generateGraph = () => {
        const { graph, customStyle } = this.props;
        const elements = graphToElements(graph);
        const style = getBaseStyle(customStyle || {});
        const graphConfig = {
            container: this.graphContainer.current,
            layout: { name: 'dagre'},            
            style,
            elements,
            userZoomingEnabled: false,
            userPanningEnabled: false,
            boxSelectionEnabled: false,
        };
        this.graphInstance = cytoscape(graphConfig);
    }

    componentDidMount() {
        this.generateGraph();
    }

    componentDidUpdate() {
        this.graphInstance.unmount();
        this.generateGraph();
    }

    render() {
        return <div ref={this.graphContainer} className="dag-ui__graph-container"></div>;
    }
}

VerticalGraph.propTypes = {
    graph: PropTypes.object.isRequired,
    customStyle: PropTypes.object,
};

function graphToElements(graph) {
    const elements = {
        nodes: [],
        edges: [],
    };
    Object.values(graph.nodes).forEach(node => {
        elements.nodes.push({ data: { id: node.id }});
        if (node.to) {
            node.to.forEach(to => {
                elements.edges.push({
                    data: { source: node.id, target: to }
                });
            });            
        }
    });

    return elements;
}

function getBaseStyle(customStyle = {}) {
    if (!customStyle.node) customStyle.node = {};
    if (!customStyle.edge) customStyle.edge = {};
    return [
        {
            selector: 'node',
            style: {
                'background-color': '#666',
                label: 'data(id)',
                shape: 'rectangle',
                ...customStyle.node
            }
        },
        {
            selector: 'edge',
            style: {
                width: 4,
                'target-arrow-shape': 'triangle',
                'line-color': '#9dbaea',
                'target-arrow-color': '#9dbaea',
                'curve-style': 'taxi',
                ...customStyle.edge
            }
        }
    ];
}