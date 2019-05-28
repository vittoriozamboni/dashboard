export function getDirectedGraphDict(graph) {
    const dirGraph = {};

    Object.values(graph.nodes).forEach(source => {
        dirGraph[source.id] = source.to ? [...source.to] : [];
    });

    return dirGraph;
}

export function getInvertedGraphDict(graph) {
    const invGraph = {};

    Object.values(graph.nodes).forEach(source => {
        if (source.to) {
            source.to.forEach(destination => {
                if (!invGraph[destination]) invGraph[destination] = [];    
                invGraph[destination].push(source.id);
            });
        } else {
            if (!invGraph.root) invGraph.root = [];
            invGraph.root.push(source.id);
        }
    });
    return invGraph;
}

export function getSiblingsGraphDict(invGraph) {
    const sibGraph = {};
    const keys = Object.keys(invGraph);
    keys.forEach(nodeId => sibGraph[nodeId] = {});
    for (let i=0; i<keys.length - 1; i++) {
        const nodeId = keys[i];
        for (let j=i + 1; j<keys.length; j++) {            
            const nodeIdCheck = keys[j];
            invGraph[nodeId].forEach(parent => {
                if (invGraph[nodeIdCheck].includes(parent)) {
                    sibGraph[nodeId][nodeIdCheck] = true;
                    sibGraph[nodeIdCheck][nodeId] = true;
                }
            });            
        }
    }
    return sibGraph;
}
