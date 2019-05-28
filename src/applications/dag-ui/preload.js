import { store } from 'store/store';
import { SET_APPLICATION_LOADING } from 'store/actions';
import { INITIALIZE } from './actions';

import { demoData } from './demo/data';

export function preload() {
    return new Promise(resolve => {
        store.dispatch({ type: SET_APPLICATION_LOADING, loading: true });
        console.log('Just set a loader');
        const preloadPromises = [
            demoData.graphs.get(),
            demoData.instances.get(),
        ];

        Promise.all(preloadPromises).then(() => {
            console.log('Done loading!');
            store.dispatch({ type: SET_APPLICATION_LOADING, loading: false });
            store.dispatch({ type: INITIALIZE });
            resolve();
        });
    });
}
