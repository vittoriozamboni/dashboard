import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';


export default function TableHeader({ columns, entries, config={}, pinnedLeft=[], columnsStyle={}, cellsStyle={}, tablesStyle={}, tableContainerStyle={}, tableHeaderContainerRef, tableContainerClass='', tableStyleState, setTableStyleState }) {
    const columnsClass = getHeaderColumnsClass(columns, config);
    const cellsClass = getHeaderCellsClass(columns, config);

    const sortedFields = tableStyleState.sortFields.reduce((sf, fo) => ({ ...sf, [fo.field]: fo.direction || 'asc' }), {});

    return <div className={`ui-table__header__container ${tableContainerClass}`} ref={tableHeaderContainerRef} style={tableContainerStyle}>
        <table className="ui-table__header" style={tablesStyle}>
            <thead>
                <tr className="ui-table__header__row">
                    {pinnedLeft.map(col => {
                        return <th key={col.prop}
                            className={`ui-table__header__col ${columnsClass[col.prop]}`}
                            style={{ ...columnsStyle[col.prop], visibility: 'hidden' }}
                        ></th>;
                    })}
                    {columns.filter(col => !pinnedLeft.includes(col)).map(col => {
                        return <TableHeaderColumn key={col.prop}
                            col={col}
                            colClassName={columnsClass[col.prop]}
                            colStyle={columnsStyle[col.prop]}
                            isPinned={pinnedLeft.includes(col)}
                            cellClassName={cellsClass[col.prop]}
                            cellStyle={cellsStyle[col.prop]}
                            sortedFields={sortedFields}
                            tableStyleState={tableStyleState}
                            setTableStyleState={setTableStyleState}
                        />;
                    })}
                </tr>
            </thead>
        </table>
    </div>;
}

TableHeader.propTypes = {
    columns: PropTypes.array.isRequired,
    entries: PropTypes.array.isRequired,
    config: PropTypes.object,
    pinnedLeft: PropTypes.array,
    columnsStyle: PropTypes.object,
    cellsStyle: PropTypes.object,
    tablesStyle: PropTypes.object,
    tableHeaderContainerRef: PropTypes.object,
    tableContainerStyle: PropTypes.object,
    tableContainerClass: PropTypes.string,
    tableStyleState: PropTypes.object.isRequired,
    setTableStyleState: PropTypes.func.isRequired,
};


function getHeaderColumnsClass(columns, config) {
    const columnsClass = {};
    columns.forEach(col => {
        const classes = [];

        if (config.borderType) {
            classes.push(`ui-table__header__col--${config.borderType}-border`);
        }

        columnsClass[col.prop] = classes.join(' ');
    });

    return columnsClass;
}

function getHeaderCellsClass(columns, config) {
    const columnsClass = {};
    columns.forEach(col => {
        const classes = [];

        if (config.singleLine) {
            classes.push(`ui-table__header__cell--single-line`);
        }

        columnsClass[col.prop] = classes.join(' ');
    });

    return columnsClass;
}

function TableHeaderColumn({ col, colClassName, colStyle, isPinned, cellClassName, cellStyle, sortedFields, tableStyleState, setTableStyleState }) {
    const [isHovered, setIsHovered] = useState(false);
    const colRef = useRef(null);

    const compColClassName = `ui-table__header__col ${colClassName} ${isHovered ? 'ui-table__header__col--hovered' : '' }`;
    const compColStyle = { ...colStyle, ...(isPinned ? { visibility: 'hidden' } : {})};
    const compCellClassName = `ui-table__header__cell ${cellClassName} ${isHovered ? 'ui-table__header__cell--hovered' : '' }`;
    const compCellStyle = cellStyle;

    useEffect(() => {
        const node = colRef.current;

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
    }, [colRef.current]); // eslint-disable-line

    const isPinnedColumn = tableStyleState.pinnedLeft.includes(col.prop);

    return <th
        className={compColClassName}
        style={compColStyle}
        ref={colRef}
    >
        <span
            className={compCellClassName}
            style={compCellStyle}
        >
            <span>
                {col.title}
            </span>
            {sortedFields[col.prop] &&
                <span className='ui-table__header__col__order'>
                    <i className={`fas ${sortedFields[col.prop] === 'desc' ? 'fa-angle-down' : 'fa-angle-up' }`} />
                </span>
            }
            <span className='ui-table__header__col__controls' style={{ display: isHovered ? 'inline-flex' : 'none' }}>
                <span className="ui-table__header__col__controls__control">
                    <i className="fas fa-cog" />
                    <div className="ui-table__header__col__controls__control__content">
                        <div className="ui-table__header__col__controls__control__content__element"
                            onClick={() => {
                                setTableStyleState(ts => ({
                                    ...ts, sortFields: [{ field: col.prop, direction: 'asc' }]
                                }));
                            }}
                        >
                            Sort Ascending
                        </div>
                        <div className="ui-table__header__col__controls__control__content__element"
                            onClick={() => {
                                setTableStyleState(ts => ({
                                    ...ts, sortFields: [{ field: col.prop, direction: 'desc' }]
                                }));
                            }}
                        >
                            Sort Descending
                        </div>
                        <div className="ui-table__header__col__controls__control__content__divider"></div>
                        <div className="ui-table__header__col__controls__control__content__element"
                            onClick={() => {
                                console.log('Toggle the pinned col', col.prop, 'now is', isPinnedColumn);
                                setTableStyleState(ts => togglePinnedColumn(ts, col.prop, isPinnedColumn));
                            }}
                        >
                            {isPinnedColumn ? 'Unpin column' : 'Pin Left'}
                        </div>
                    </div>

                </span>
            </span>
        </span>
    </th>;
}

function togglePinnedColumn(ts, colName, isPinnedColumn) {
    const ns = isPinnedColumn
        ? { ...ts, pinnedLeft: ts.pinnedLeft.filter(f => f !== colName) }
        : { ...ts, pinnedLeft: [...ts.pinnedLeft, colName] };
    console.log(ns);
    return ns;
}
