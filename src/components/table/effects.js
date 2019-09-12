import { useEffect } from 'react';
import { SCROLLBAR_SIZE } from './constants';


export function useScrollSync(master, elementsToSync, sync) {
    useEffect(() => {
        if (master.current) {
            const masterEl = master.current;
            const syncMaster = (e) => {
                elementsToSync.forEach(ref => {
                    if (!ref.current) return;
                    if (masterEl !== e.target) return;

                    if (sync.scrollLeft)
                        ref.current.scrollLeft = masterEl.scrollLeft;
                    if (sync.scrollTop)
                        ref.current.scrollTop = masterEl.scrollTop;
                });
            };
            masterEl.addEventListener('scroll', syncMaster);
            return () => {
                masterEl.removeEventListener('scroll', syncMaster);
            };
        }
    }, [master, elementsToSync, sync]);
}

export function useTableElements(tableHeaderContainerRef, tableBodyContainerRef, columns, config, setTableStyleState) {
    useEffect(() => {
        if (tableHeaderContainerRef.current && tableBodyContainerRef.current) {
            const headerEl = tableHeaderContainerRef.current;
            const bodyEl = tableBodyContainerRef.current;
            const bodyHasVericalScrollBar = bodyEl.offsetHeight !== bodyEl.scrollHeight;
            const bodyHasHorizontalScrollBar = (bodyEl.offsetWidth - (bodyEl.scrollWidth + bodyHasVericalScrollBar * 14)) !== 0;

            const newTableStyleState = { bodyHasVericalScrollBar, bodyHasHorizontalScrollBar };

            if (columns.some(col => !!col.width)) {
                const columnsWidth = columns.reduce((tot, col) => tot += col.width || 0, 0);
                const totCols = columns.length;
                newTableStyleState.expandableColumnWidth = headerEl.clientWidth
                    - columnsWidth
                    - ((SCROLLBAR_SIZE + 3) * bodyHasVericalScrollBar)
                    - (totCols * (config.padding || 0) * 2)
                    - (totCols * 4) * (config.borderType ? 1 : 0)
                ;
            }
            setTableStyleState(newTableStyleState);
        }
    }, [columns, config]); // eslint-disable-line
};