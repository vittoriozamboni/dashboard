import { store } from 'store/store';
import { SET_GRAPHS, SET_INSTANCES } from '../actions';

const graph3 = getTestGraph(3);

export const demoData = {
    graphs: {
        get: () => {
            return new Promise(resolve => {
                store.dispatch({
                    type: SET_GRAPHS,
                    data: {
                        'graph1': getTestGraph(1),
                        'graph2': getTestGraph(2),
                        'graph3': graph3,
                        'graph4': getTestGraph(2),
                    }
                });
                resolve();
            });
        }
    },
    instances: {
        get: () => {
            return new Promise(resolve => {
                store.dispatch({
                    type: SET_INSTANCES,
                    data: {
                        'instance1': getTestInstance1(graph3),
                    }
                });
                resolve();
            });
        }
    }
};

function getTestGraph(iterations) {
    const nodes = {};
    for (let i=0; i<iterations; i++) {
        nodes[`stage-${i * 5 + 1}`] = { ...generateNodeBaseInfo(i * 5 + 1), to: [`stage-${i * 5 + 2}`] };
        nodes[`stage-${i * 5 + 2}`] = { ...generateNodeBaseInfo(i * 5 + 2), to: [`stage-${i * 5 + 3}`, `stage-${i * 5 + 4}`] };
        nodes[`stage-${i * 5 + 3}`] = { ...generateNodeBaseInfo(i * 5 + 3), to: [`stage-${i * 5 + 5}`] };
        nodes[`stage-${i * 5 + 4}`] = { ...generateNodeBaseInfo(i * 5 + 4), to: [`stage-${i * 5 + 5}`] };
        nodes[`stage-${i * 5 + 5}`] = { ...generateNodeBaseInfo(i * 5 + 5), to: i === iterations - 1 ? [] : [`stage-${i * 5 + 6}`] };
    }
    return {
        name: `Test Graph ${iterations}`,
        nodes,
        info: {
            next_run: '2019-06-21',
            last_run: '2019-04-20',            
        }
    };
}

function generateNodeBaseInfo(number) {
    return {
        id: `stage-${number}`,
        label: `Stage ${number}`,
        steps: generateNodeBaseSteps(number),
    };
}

function generateNodeBaseSteps(stage) {
    const steps = [];
    for (let n=1; n<=Math.floor(Math.random() * 6) + 1; n++) {
        steps.push({
            id: `stage-${stage}-step-${n}`,
            label: `This is a step of stage ${stage}`,
            number: n,
        });
    }
    return steps;
}

function getTestInstance1(graph) {
    return {
        graphId: 'graph3',
        lastChange: 0,
        data: {
            'stage-1': generateInstanceNodeData(graph, 'completed', 1),
            'stage-2': generateInstanceNodeData(graph, 'completed', 2),
            'stage-3': generateInstanceNodeData(graph, 'running', 3),
            'stage-4': generateInstanceNodeData(graph, 'running', 4),
            'stage-5': generateInstanceNodeData(graph, 'queued', 5),
            'stage-6': generateInstanceNodeData(graph, 'queued', 6),
            'stage-7': generateInstanceNodeData(graph, 'queued', 7),
            'stage-8': generateInstanceNodeData(graph, 'skipped', 8),
            'stage-9': generateInstanceNodeData(graph, 'queued', 9),
            'stage-10': generateInstanceNodeData(graph, 'skipped', 10),
            'stage-11': generateInstanceNodeData(graph, 'queued', 11),
            'stage-12': generateInstanceNodeData(graph, 'queued', 12),
            'stage-13': generateInstanceNodeData(graph, 'queued', 13),
            'stage-14': generateInstanceNodeData(graph, 'queued', 14),
            'stage-15': generateInstanceNodeData(graph, 'queued', 15),
        }
    };
}

function generateInstanceNodeData(graph, status, stage) {
    const steps = {};
    const totSteps = graph.nodes[`stage-${stage}`].steps.length;
    for (let n=1; n<=totSteps; n++) {
        const step = {
            status,
            start_date: '2019-05-21 09:35',
            end_date: '2019-05-21 09:35',
        };
        if (status === 'running' && totSteps >= 2) {
            step.status = n === 1 ? 'completed' : n === 2
                ? 'running' : 'queued';
        }
        steps[`stage-${stage}-step-${n}`] = step;
    }
    return {
        id: `stage-${stage}`,
        status,
        start_date: '2019-05-21 09:35',
        end_date: '2019-05-21 09:35',
        steps,
    };
}