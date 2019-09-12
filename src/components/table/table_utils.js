import { SCROLLBAR_SIZE } from "./constants";

export function getColumnsStyle(columns, tableStyleState, config) {
    const columnsStyle = {};
    columns.forEach(col => {
        columnsStyle[col.prop] = {};
        if (col.width) {
            columnsStyle[col.prop].width = col.width + 'px';
        } else if (tableStyleState.expandableColumnWidth) {
            columnsStyle[col.prop].width = tableStyleState.expandableColumnWidth + 'px';
        }
        if (config.padding) {
            columnsStyle[col.prop].padding = config.padding + 'px';
        }
    });
    return columnsStyle;
}


export function getHeaderTablesStyle({ bodyHasVericalScrollBar }) {
    const style = {};
    style.width = bodyHasVericalScrollBar ? `calc(100% - ${SCROLLBAR_SIZE}px` : '100%';

    return style;
}

export function getMainTableHeaderContainerStyle({ bodyHasHorizontalScrollBar }) {
    const style = {};
    style.marginBottom = bodyHasHorizontalScrollBar ? '-14px' : undefined;
    return style;
}

export function getMainTableHeaderContainerClass({ bodyHasHorizontalScrollBar }) {
    const classes = [];
    if (bodyHasHorizontalScrollBar) {
        classes.push('ui-table__header__container--body-has-horizontal-scrollbar');
    }

    return classes.join(' ');
}

export function getMainTableBodyStyle() {
    const style = {};
    style.width = '100%';

    return style;
}
