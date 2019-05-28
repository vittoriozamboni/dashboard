export function executeDemoAction(state) {
    let currentAction = state.demo.action;
    let instance = { ...state.instances['instance1'] };

    switch (currentAction) {
        case 0: {            
            instance.lastChange++;
            instance = completeStage(instance, 'stage-3');
            break;
        }
        case 1: {            
            instance.lastChange++;
            instance = completeStage(instance, 'stage-4');            
            instance = runStage(instance, 'stage-5');            
            break;
        }
        case 2: {            
            instance.lastChange++;
            instance = completeStage(instance, 'stage-5');            
            instance = runStage(instance, 'stage-6');            
            break;
        }
        default:
            break;
    }

    return { ...state, instances: { instance1: instance }, demo: { ...state.demo, action: currentAction + 1 }};
}

function completeStage(instance, stageId) {
    const steps = instance.data[stageId].steps;
    instance.data[stageId] = {
        ...instance.data[stageId],
        status: 'completed',
        steps: Object.keys(steps).reduce((acc, step) => {
            acc[step] = steps[step];
            acc[step].status = 'completed';
            return acc;
        }, {})
    };
    return instance;
}

function runStage(instance, stageId) {
    const steps = instance.data[stageId].steps;
    instance.data[stageId] = {
        ...instance.data[stageId],
        status: 'running',
        steps: Object.keys(steps).reduce((acc, step, currentIndex) => {
            acc[step] = steps[step];
            if (currentIndex === 0)
                acc[step].status = 'running';
            return acc;
        }, {})
    };
    return instance;
} 