import { useEffect, useState, useRef } from 'react';
import { SCROLLBAR_SIZE } from './constants';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

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


export function useContainerSizeForAutoWidth(tableContainerRef, columns, setTableStyleState, tableStyleState) {

    useEffect(() => {
        if (tableContainerRef.current && !tableStyleState.configured) {
            const containerEl = tableContainerRef.current;
            const newTableStyleState = {};

            if (columns.some(col => !col.width)) {
                const columnsWidth = columns.reduce((tot, col) => tot += col.width || 0, 0);
                const expandableColumnWidth = containerEl.clientWidth - columnsWidth;
                newTableStyleState.expandableColumnWidth = Math.max(expandableColumnWidth, 100);
            }

            newTableStyleState.totalWidth = columns.reduce((tot, col) => {
                return tot + (col.width ? col.width : newTableStyleState.expandableColumnWidth);
            }, 0);

            setTableStyleState({ ...tableStyleState, ...newTableStyleState, configured: true });
        }
    }, [columns, tableStyleState, setTableStyleState]); // eslint-disable-line
};


export function useTableElements(tableHeaderContainerRef, tableBodyContainerRef, columns, config, setTableStyleState, tableStyleState, windowWidth, container) {
    const subState = {
        bodyHasVericalScrollBar: tableStyleState.bodyHasVericalScrollBar,
        bodyHasHorizontalScrollBar: tableStyleState.bodyHasHorizontalScrollBar,
        expandableColumnWidth: tableStyleState.expandableColumnWidth,
        totalWidth: tableStyleState.totalWidth,
        pinnedLeft: tableStyleState.pinnedLeft,
    };
    const prevTableStyleState = usePrevious(subState);
    const prevContainerWidth = usePrevious(container && container.current && container.current.clientWidth);

    useEffect(() => {
        if (tableStyleState.configured) {
            const stateChanged = JSON.stringify(subState) !== JSON.stringify(prevTableStyleState);
            const currentContainerWidth = container && container.current && container.current.clientWidth;
            const containerWidthChanged = prevContainerWidth !== currentContainerWidth;
            if (tableHeaderContainerRef.current && tableBodyContainerRef.current && (stateChanged || containerWidthChanged)) {
                const headerEl = tableHeaderContainerRef.current;
                const bodyEl = tableBodyContainerRef.current;
                const bodyHasVericalScrollBar = bodyEl.offsetHeight !== bodyEl.scrollHeight;
                const bodyHasHorizontalScrollBar = (bodyEl.offsetWidth - (bodyEl.scrollWidth + bodyHasVericalScrollBar * 15)) !== 0;
                const newTableStyleState = { bodyHasVericalScrollBar, bodyHasHorizontalScrollBar };

                if (columns.some(col => !col.width)) {
                    const columnsWidth = columns.reduce((tot, col) => tot += col.width || 0, 0);
                    const expandableColumnWidth = headerEl.clientWidth
                        - columnsWidth
                        - (SCROLLBAR_SIZE * bodyHasVericalScrollBar)
                        - (SCROLLBAR_SIZE * bodyHasHorizontalScrollBar)
                    ;
                    newTableStyleState.expandableColumnWidth = Math.max(expandableColumnWidth, 100);
                    newTableStyleState.bodyHasHorizontalScrollBar = false;
                }
                newTableStyleState.totalWidth = columns.reduce((tot, col) => {
                    return tot + (col.width ? col.width : newTableStyleState.expandableColumnWidth);
                }, 0);

                setTableStyleState({ ...tableStyleState, ...newTableStyleState });
            }
        }
    }, [columns, config, windowWidth, tableStyleState, prevContainerWidth]); // eslint-disable-line
};


export function useScrollbarsState(tableHeaderContainerRef, tableBodyContainerRef, tableStyleState, windowWidth, container) {
    const [scrollbarsState, setScrollbarsState] = useState({ horizontal: false, vertical: false });

    const prevTableStyleState = usePrevious(tableStyleState);
    const prevContainerWidth = usePrevious(container && container.current && container.current.clientWidth);

    useEffect(() => {
        const stateChanged = JSON.stringify(tableStyleState) !== JSON.stringify(prevTableStyleState);
        const currentContainerWidth = container && container.current && container.current.clientWidth;
        const containerWidthChanged = prevContainerWidth !== currentContainerWidth;
        if (tableHeaderContainerRef.current && tableBodyContainerRef.current && (stateChanged || containerWidthChanged)) {
            const bodyEl = tableBodyContainerRef.current;
            const bodyHasVericalScrollBar = bodyEl.offsetHeight !== bodyEl.scrollHeight;
            const bodyHasHorizontalScrollBar = (bodyEl.offsetWidth - (bodyEl.scrollWidth + bodyHasVericalScrollBar * 15)) !== 0;

            setScrollbarsState({ horizontal: bodyHasHorizontalScrollBar, vertical: bodyHasVericalScrollBar });
        }
    }, [windowWidth, tableStyleState, prevContainerWidth]); // eslint-disable-line

    return scrollbarsState;
};

export function useHover(ref) {
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const node = ref.current;

        if (node) {
            const hoverIn = () => setIsHovered(true);
            const hoverOut = () => setIsHovered(false);

            node.addEventListener('mouseover', hoverIn);
            node.addEventListener('mouseout', hoverOut);

            return () => {
                node.removeEventListener('mouseover', hoverIn);
                node.removeEventListener('mouseout', hoverOut);
            };
        }
    }, [ref.current]); // eslint-disable-line

    return isHovered;
}

export function useWindowSize() {
    const isClient = typeof window === 'object';

    function getWindowSize() {
        if (!isClient) return { width: undefined, height: undefined };

        return { width: window.innerWidth, height: window.innerHeight };
    };
    const [size, setSize] = useState(getWindowSize());

    useEffect(() => {
        if (!isClient) return;

        const updateSize = () => setSize(getWindowSize);
        window.addEventListener('resize', updateSize);
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []); // eslint-disable-line

    return size;
}
