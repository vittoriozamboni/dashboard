import { getDirectedGraphDict, getInvertedGraphDict, getSiblingsGraphDict } from './transform';

export function getDetailSubGraph(graph, runningNodes, deep = 2) {
    const dirGraph = getDirectedGraphDict(graph);
    const invGraph = getInvertedGraphDict(graph);
    const sibGraph = getSiblingsGraphDict(invGraph);

    let subGraphIds = [];

    runningNodes.forEach(nodeId => {
        subGraphIds = [
            ...subGraphIds,
            nodeId,
            ...Object.keys(sibGraph[nodeId]),
            ...addNodeLevel(nodeId, dirGraph, deep),
            ...addNodeLevel(nodeId, invGraph, deep),
        ];    
    });

    const subGraphIdsDict = subGraphIds.reduce((acc, id) => {
        acc[id] = true;
        return acc;
    }, {});

    const selectedNodes = Object.values(graph.nodes).filter(node => subGraphIdsDict[node.id]);
    const nodes = selectedNodes.reduce((acc, node) => {
        acc[node.id] = {
            ...node,
            id: node.id,
            to: node.to ? node.to.filter(to => subGraphIdsDict[to]) : [],    
        };
        return acc;    
    }, {});

    return { nodes };
}

function addNodeLevel(nodeId, relations, deep) {
    if (deep === 0) return [];

    let partial = [];

    if (relations[nodeId] && relations[nodeId].length > 0) {
        relations[nodeId].forEach(nextNodeId => {
            if (deep > 1 && relations[nextNodeId] && relations[nextNodeId].length > 0) {
                partial = [
                    ...partial,
                    nextNodeId,
                    ...addNodeLevel(nextNodeId, relations, deep - 1)
                ];
            } else {
                partial.push(nextNodeId);
            }
        });
    }

    return partial;
}