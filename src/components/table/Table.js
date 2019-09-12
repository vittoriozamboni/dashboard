import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { useScrollSync, useTableElements } from './effects';
import { SCROLLBAR_SIZE } from './constants';
import { getColumnsStyle, getHeaderTablesStyle, getMainTableHeaderContainerStyle, getMainTableHeaderContainerClass, getMainTableBodyStyle } from './table_utils';


export function Table({ columns, entries, config={} }) {
    const [pagination, setPagination] = useState({ page: 1, pageSize: 20 });
    const [tableStyleState, setTableStyleState] = useState({
        expandableColumnWidth: null,
        bodyHasVericalScrollBar: false,
        bodyHasHorizontalScrollBar: false,
    });

    const columnsStyle = getColumnsStyle(columns, tableStyleState, config);
    const headerTableStyle = getHeaderTablesStyle(tableStyleState);
    const mainTableHeaderContainerStyle = getMainTableHeaderContainerStyle(tableStyleState);
    const mainTableHeaderContainerClass = getMainTableHeaderContainerClass(tableStyleState);
    const mainTableBodyContainerClass = getMainTableBodyContainerClass();
    const mainTableBodyStyle = getMainTableBodyStyle();

    const tableHeaderContainerRef = useRef(null);
    const tableBodyContainerRef = useRef(null);
    const pinnedLeftTableHeaderContainerRef = useRef(null);
    const pinnedLeftTableBodyContainerRef = useRef(null);

    useScrollSync(tableBodyContainerRef, [tableHeaderContainerRef], { scrollLeft: true });
    useScrollSync(tableBodyContainerRef, [pinnedLeftTableBodyContainerRef], { scrollTop: true });
    useScrollSync(pinnedLeftTableBodyContainerRef, [tableBodyContainerRef], { scrollTop: true });

    useTableElements(tableHeaderContainerRef, tableBodyContainerRef, columns, config, setTableStyleState);

    const pinnedLeftColumns = config.pinnedLeft
        ? columns.filter(col => config.pinnedLeft.includes(col.prop))
        : [];
    const pinnedLeftHeaderTableStyle = getPinnedLeftTableHeaderStyle(pinnedLeftColumns);
    const pinnedLeftHeaderTableContainerStyle = getPinnedLeftTableHeaderContainerStyle(pinnedLeftColumns);
    const pinnedLeftHeaderTableContainerClass = getPinnedLeftTableHeaderContainerClass();
    const pinnedLeftBodyTableStyle = getPinnedLeftBodyTableStyle(pinnedLeftColumns);
    const pinnedLeftTableBodyContainerClass = getPinnedLeftTableBodyContainerClass();

    return <div className="ui-table__container">
        <div className="ui-table__main-table__container">
            <TableHeader columns={columns} entries={entries} config={config}
                columnsStyle={columnsStyle}
                tableHeaderContainerRef={tableHeaderContainerRef}
                tableBodyContainerRef={tableBodyContainerRef}
                tablesStyle={headerTableStyle}
                tableContainerStyle={mainTableHeaderContainerStyle}
                tableContainerClass={mainTableHeaderContainerClass}
            />
            <TableBody
                columns={columns}
                entries={entries}
                config={config}
                pagination={pagination}
                columnsStyle={columnsStyle}
                tableStyle={mainTableBodyStyle}
                tableBodyContainerRef={tableBodyContainerRef}
                bodyContainerClass={mainTableBodyContainerClass}
            />
        </div>
        {config.pinnedLeft && config.pinnedLeft.length > 0 &&
            <div className="ui-table__pinned-left__container">
                <TableHeader
                    columns={pinnedLeftColumns}
                    entries={entries}
                    config={{ ...config, pinnedLeft: [] }}
                    columnsStyle={columnsStyle}
                    tableHeaderContainerRef={pinnedLeftTableHeaderContainerRef}
                    tableBodyContainerRef={pinnedLeftTableBodyContainerRef}
                    tablesStyle={pinnedLeftHeaderTableStyle}
                    tableContainerStyle={pinnedLeftHeaderTableContainerStyle}
                    tableContainerClass={pinnedLeftHeaderTableContainerClass}
                />
                <div className="ui-table__pinned-left__body__outer-container">
                    <div className="ui-table__pinned-left__body__inner-container">
                        <TableBody
                            columns={pinnedLeftColumns}
                            entries={entries}
                            config={{ ...config, pinnedLeft: [] }}
                            pagination={pagination}
                            columnsStyle={columnsStyle}
                            tableStyle={pinnedLeftBodyTableStyle}
                            tableBodyContainerRef={pinnedLeftTableBodyContainerRef}
                            bodyContainerClass={pinnedLeftTableBodyContainerClass}
                        />
                    </div>
                </div>
            </div>
        }
    </div>;
}

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            prop: PropTypes.string.isRequired,
            title: PropTypes.string,
        }).isRequired,
    ).isRequired,
    entries: PropTypes.array.isRequired,
    config: PropTypes.shape({
        padding: PropTypes.number,
        singleLine: PropTypes.bool,
        borderType: PropTypes.oneOf([undefined, 'row', 'cell']),
        height: PropTypes.number,
        pinnedLeft: PropTypes.arrayOf(PropTypes.string),
    }),
};

function getMainTableBodyContainerClass() {
    return 'ui-table__body__container';
}

function getPinnedLeftTableHeaderStyle(pinnedLeftColumns) {
    const style = {};
    style.width = pinnedLeftColumns.reduce((tot, col) => tot + col.width, 0) + 'px';

    return style;
}

function getPinnedLeftTableHeaderContainerStyle(pinnedLeftColumns) {
    const style = {};
    style.width = pinnedLeftColumns.reduce((tot, col) => tot + col.width, 0) + 'px';

    return style;
}

function getPinnedLeftTableHeaderContainerClass() {
    const classes = [];

    return classes.join(' ');
}

function getPinnedLeftBodyTableStyle(pinnedLeftColumns) {
    const style = {};
    style.width = pinnedLeftColumns.reduce((tot, col) => tot + col.width, 0) + 'px';

    return style;
}

function getPinnedLeftTableBodyContainerClass() {
    return 'ui-table__pinned-left__body__container';
}