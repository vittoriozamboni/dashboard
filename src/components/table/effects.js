import { useEffect } from 'react';
import { SCROLLBAR_SIZE } from './constants';


export function useScrollSync(master, elementsToSync, scrollMaster, sync, onChange) {
    useEffect(() => {
        if (master.current && master === scrollMaster) {
            const masterEl = master.current;
            const syncMaster = (e) => {
                elementsToSync.forEach(ref => {
                    if (!ref.current) return;
                    if (masterEl !== e.target || masterEl === ref.current) return;

                    if (sync.scrollLeft) {
                        if (ref.current.scrollLeft === masterEl.scrollLeft) return;
                        ref.current.scrollLeft = masterEl.scrollLeft;
                        onChange && onChange(masterEl.scrollLeft, 'scrollLeft');
                    }

                    if (sync.scrollTop) {
                        if (ref.current.scrollTop === masterEl.scrollTop) return;
                        ref.current.scrollTop = masterEl.scrollTop;
                        onChange && onChange(masterEl.scrollTop, 'scrollTop');
                    }
                });
            };

            masterEl.addEventListener('scroll', syncMaster);
            return () => {
                masterEl.removeEventListener('scroll', syncMaster);
            };
        }
    }, [master, elementsToSync, scrollMaster, sync, onChange]);
}

export function useTableElements(tableHeaderContainerRef, tableBodyContainerRef, columns, config, setTableStyleState) {
    useEffect(() => {
        if (tableHeaderContainerRef.current && tableBodyContainerRef.current) {
            const headerEl = tableHeaderContainerRef.current;
            const bodyEl = tableBodyContainerRef.current;
            const bodyHasVericalScrollBar = bodyEl.offsetHeight !== bodyEl.scrollHeight;
            const bodyHasHorizontalScrollBar = (bodyEl.offsetWidth - (bodyEl.scrollWidth + bodyHasVericalScrollBar * 14)) !== 0;
            const newTableStyleState = { bodyHasVericalScrollBar, bodyHasHorizontalScrollBar };

            if (columns.some(col => !col.width)) {
                const columnsWidth = columns.reduce((tot, col) => tot += col.width || 0, 0);
                newTableStyleState.expandableColumnWidth = headerEl.clientWidth
                    - columnsWidth
                    - ((SCROLLBAR_SIZE + 2) * bodyHasVericalScrollBar)
                ;
                newTableStyleState.bodyHasHorizontalScrollBar = false;
            }
            newTableStyleState.totalWidth = columns.reduce((tot, col) => {
                return tot + (col.width ? col.width : newTableStyleState.expandableColumnWidth);
            }, 0);
            console.log('Recreating table elements');
            setTableStyleState(tableStyleState => ({ ...tableStyleState, ...newTableStyleState }));
        }
    }, [columns, config]); // eslint-disable-line
};