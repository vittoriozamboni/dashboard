export function getColumnsStyle(columns, tableStyleState, config) {
    const columnsStyle = {};
    columns.forEach(col => {
        columnsStyle[col.prop] = {};
        if (col.width) {
            columnsStyle[col.prop].width = col.width + 'px';
        } else if (tableStyleState.expandableColumnWidth) {
            columnsStyle[col.prop].width = tableStyleState.expandableColumnWidth + 'px';
        }
    });
    return columnsStyle;
}

export function getCellsStyle(columns, tableStyleState, config) {
    const cellsStyle = {};
    columns.forEach(col => {
        cellsStyle[col.prop] = {};
        if (col.width) {
            cellsStyle[col.prop].maxWidth = (col.width - 5) + 'px';
        } else if (tableStyleState.expandableColumnWidth) {
            cellsStyle[col.prop].maxWidth = (tableStyleState.expandableColumnWidth - 5) + 'px';
        }
        if (config.padding) {
            cellsStyle[col.prop].padding = config.padding + 'px';
        }
    });
    return cellsStyle;
}


export function getHeaderTablesStyle({ tableStyleState }) {
    const style = {};

    style.width = tableStyleState.totalWidth + 'px';
    style.display = 'block';

    return style;
}

export function getMainTableHeaderContainerStyle({ bodyHasHorizontalScrollBar }) {
    const style = {};
    style.marginBottom = '-15px';

    return style;
}

export function getMainTableHeaderContainerClass({ bodyHasHorizontalScrollBar }) {
    const classes = [];
    if (bodyHasHorizontalScrollBar) {
        classes.push('ui-table__header__container--body-has-horizontal-scrollbar');
    }

    return classes.join(' ');
}

export function getMainTableBodyStyle({ tableStyleState }) {
    const style = {};

    style.width = tableStyleState.totalWidth + 'px';
    style.display = 'block';

    return style;
}
