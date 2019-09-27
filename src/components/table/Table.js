import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { PageController } from './PageController';
import { useScrollSync, useTableElements } from './effects';
import { getColumnsStyle, getHeaderTablesStyle, getMainTableHeaderContainerStyle, getMainTableHeaderContainerClass, getMainTableBodyStyle, getCellsStyle } from './table_utils';


export function Table({ columns, entries, config={} }) {
    const [pagination, setPagination] = useState({ page: 1, pageSize: 20 }); // eslint-disable-line
    const [tableStyleState, setTableStyleState] = useState({
        expandableColumnWidth: null,
        bodyHasVericalScrollBar: false,
        bodyHasHorizontalScrollBar: false,
        totalWidth: 0,
        pinnedLeft: [...(config.pinnedLeft || [])],
        sortFields: [{ field: 'test2' }, { field: 'id', direction: 'desc' }],
    });
    const [scrollMaster, setScrollMaster] = useState(null);
    const [shadowedPinnedLeft, setShadowedPinnedLeft] = useState(false);

    const allColumnsHaveWidth = columns.every(c => c.width !== undefined);
    const columnsStyle = getColumnsStyle(columns, tableStyleState, config);
    const cellsStyle = getCellsStyle(columns, tableStyleState, config);
    const headerTableStyle = getHeaderTablesStyle({ columns, tableStyleState });
    const mainTableHeaderContainerStyle = getMainTableHeaderContainerStyle(tableStyleState);
    const mainTableHeaderContainerClass = getMainTableHeaderContainerClass(tableStyleState);
    const mainTableBodyContainerClass = getMainTableBodyContainerClass();
    const mainTableBodyStyle = getMainTableBodyStyle({ tableStyleState, allColumnsHaveWidth });

    const tableHeaderContainerRef = useRef(null);
    const tableBodyContainerRef = useRef(null);
    const pinnedLeftTableHeaderContainerRef = useRef(null);
    const pinnedLeftTableBodyContainerRef = useRef(null);

    useScrollSync(tableBodyContainerRef, [tableHeaderContainerRef], scrollMaster, { scrollLeft: true }, (scroll) => setShadowedPinnedLeft(scroll !== 0));
    useScrollSync(tableBodyContainerRef, [pinnedLeftTableBodyContainerRef], scrollMaster, { scrollTop: true });
    useScrollSync(pinnedLeftTableBodyContainerRef, [tableBodyContainerRef], scrollMaster, { scrollTop: true });

    useTableElements(tableHeaderContainerRef, tableBodyContainerRef, columns, config, setTableStyleState);

    const pinnedLeft = tableStyleState.pinnedLeft
        ? columns.filter(col => tableStyleState.pinnedLeft.includes(col.prop))
        : [];
    console.log('pinnedLeft: ', pinnedLeft.map(c => c.prop));
    const pinnedLeftHeaderTableStyle = getPinnedLeftTableHeaderStyle(pinnedLeft);
    const pinnedLeftHeaderTableContainerStyle = getPinnedLeftTableHeaderContainerStyle(pinnedLeft);
    const pinnedLeftHeaderTableContainerClass = getPinnedLeftTableHeaderContainerClass();
    const pinnedLeftBodyTableStyle = getPinnedLeftBodyTableStyle(pinnedLeft);
    const pinnedLeftTableBodyContainerClass = getPinnedLeftTableBodyContainerClass({ tableStyleState });
    const pinnedLeftTableBodyOuterContainerStyle = getPinnedLeftTableBodyOuterContainerStyle({ tableStyleState });
    const pageController = config.pageController || {};
    const sortFunction = config.sortHandler || sortHandler;

    const filteredEntries = sortFunction(entries, tableStyleState.sortFields);

    return <div className="ui-table__container">
        <div className="ui-table__main-table__container"
            onMouseEnter={() => setScrollMaster(tableBodyContainerRef)}
            onMouseLeave={() => setScrollMaster(null)}
        >
            <TableHeader columns={columns} entries={filteredEntries} config={config}
                pinnedLeft={pinnedLeft}
                columnsStyle={columnsStyle}
                cellsStyle={cellsStyle}
                tableHeaderContainerRef={tableHeaderContainerRef}
                tableBodyContainerRef={tableBodyContainerRef}
                tablesStyle={headerTableStyle}
                tableContainerStyle={mainTableHeaderContainerStyle}
                tableContainerClass={mainTableHeaderContainerClass}
                tableStyleState={tableStyleState}
                setTableStyleState={setTableStyleState}
            />
            <TableBody
                columns={columns}
                entries={filteredEntries}
                config={config}
                pinnedLeft={pinnedLeft}
                pagination={pagination}
                columnsStyle={columnsStyle}
                cellsStyle={cellsStyle}
                tableStyle={mainTableBodyStyle}
                tableBodyContainerRef={tableBodyContainerRef}
                bodyContainerClass={mainTableBodyContainerClass}
            />
        </div>
        {config.pinnedLeft && config.pinnedLeft.length > 0 &&
            <div className={`ui-table__pinned-left__container ${shadowedPinnedLeft ? 'ui-table__pinned-left__container--shadowed' : ''}`}
                onMouseEnter={() => setScrollMaster(pinnedLeftTableBodyContainerRef)}
                onMouseLeave={() => setScrollMaster(null)}
            >
                <TableHeader
                    columns={pinnedLeft}
                    entries={filteredEntries}
                    config={config}
                    columnsStyle={columnsStyle}
                    cellsStyle={cellsStyle}
                    tableHeaderContainerRef={pinnedLeftTableHeaderContainerRef}
                    tableBodyContainerRef={pinnedLeftTableBodyContainerRef}
                    tablesStyle={pinnedLeftHeaderTableStyle}
                    tableContainerStyle={pinnedLeftHeaderTableContainerStyle}
                    tableContainerClass={pinnedLeftHeaderTableContainerClass}
                    tableStyleState={tableStyleState}
                    setTableStyleState={setTableStyleState}
                />
                <div className="ui-table__pinned-left__body__outer-container" style={pinnedLeftTableBodyOuterContainerStyle}>
                    <TableBody
                        columns={pinnedLeft}
                        entries={filteredEntries}
                        config={config}
                        pagination={pagination}
                        columnsStyle={columnsStyle}
                        cellsStyle={cellsStyle}
                        tableStyle={pinnedLeftBodyTableStyle}
                        tableBodyContainerRef={pinnedLeftTableBodyContainerRef}
                        bodyContainerClass={pinnedLeftTableBodyContainerClass}
                    />
                </div>
            </div>
        }
        {pageController.visible && <PageController pagination={pagination} setPagination={setPagination} totEntries={filteredEntries.length} config={config} />}
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
        zebra: PropTypes.bool,
        pageController: PropTypes.shape({
            visible: PropTypes.bool,
            style: PropTypes.oneOf(['collapsed', 'expanded'])
        }),
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
    style.overflow = 'hidden';
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

function getPinnedLeftTableBodyContainerClass({ tableStyleState }) {
    const classes = ['ui-table__pinned-left__body__container'];

    if (tableStyleState.bodyHasHorizontalScrollBar)
        classes.push('ui-table__pinned-left__body__container--with-scroll');

    return classes.join(' ');
}

function getPinnedLeftTableBodyOuterContainerStyle({ tableStyleState }) {
    const style = {};

    if (tableStyleState.bodyHasHorizontalScrollBar)
        style.marginBottom = '-15px';

    return style;
}

function sortHandler(entries, props) {
    const sortWithProps = (a, b) => compareByProperties(a, b, props);


    return entries.sort(sortWithProps);
}

function compareByProperties(a, b, props) {
    if (!props || props.length === 0) return 0;
    const prop1 = props[0];
    const [dir1, dir2] = prop1.direction === 'desc' ? [-1, 1] : [1, -1];

    return a[prop1.field] > b[prop1.field]
        ? dir1
        : a[prop1.field] < b[prop1.field]
            ? dir2
            : compareByProperties(a, b, props.slice(1));
}
