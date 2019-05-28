export function getInstanceNodeColor(status) {
    if (status === 'completed') return '#199473';
    if (status === 'queued') return '#f0b428';
    if (status === 'running') return '#1280bf';
    if (status === 'skipped') return '#7b8793';
    return 'red';
}

export function getCustomStyle(graph, instance) {
    return {
        node: {
            'background-color': (elem) => {
                const node = elem.data();
                return getInstanceNodeColor(instance.data[node.id] ? instance.data[node.id].status : 'queued');
            },
            'label': (elem) => graph.nodes[elem.data().id].label || elem.data().id,
            'shape': 'round-rectangle',
            'text-valign': 'center',
            'text-halign': 'center',
            'width': 'label',
            'padding': 10,
            'color': 'white',
            'font-size': '13px',
            'text-wrap': 'wrap',
            'text-max-width': 100
        }
    };
}

export function getInstanceStepIcon(status) {
    if (status === 'completed') return 'fas fa-check';
    if (status === 'queued') return 'fas fa-hourglass-start';
    if (status === 'running') return 'fas fa-spinner fa-pulse';
    if (status === 'skipped') return 'fas fa-dot-circle';
    return 'fas fa-times';
}