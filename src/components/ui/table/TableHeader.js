import React from 'react';
import PropTypes from 'prop-types';

import { UI_TABLE_BASE_CLASS } from './constants';
import { getHeaderColumnClass, getHeaderCellClass, getContainerClass } from './stylesAndClasses/tableHeader';
import { TableHeaderColumn } from './TableHeaderColumn';


const HEADER_CLASS = `${UI_TABLE_BASE_CLASS}__header`;
const CONTAINER_CLASS = `${HEADER_CLASS}__container`;
const ROW_CLASS = `${HEADER_CLASS}__row`;
const COL_CLASS = `${HEADER_CLASS}__col`;
const COL_PINNED_OUTSIDE_CLASS = `${COL_CLASS}--pinned-outside`;
const CELL_CLASS = `${HEADER_CLASS}__cell`;


export default function TableHeader({ columns, config, pinnedLeft=[], stylesAndClasses, tableHeaderContainerRef, tableStyleState, setTableStyleState }) {
    const { className, style, ...rest } = config.headerContainerProps;
    const colClass = getHeaderColumnClass(COL_CLASS, { config });
    const cellClass = getHeaderCellClass(CELL_CLASS, { config });
    const headerContainerClass = `${getContainerClass(CONTAINER_CLASS, stylesAndClasses.header__container)} ${className || ''}`;
    const headerContainerStyle = { ...stylesAndClasses.header__container.style, ...style };

    if (config.hideHeader) {
        headerContainerStyle.height = 0;
        headerContainerStyle.marginBottom = 0;
    }

    const sortedFields = tableStyleState.sortFields.reduce((sf, fo) => ({ ...sf, [fo.field]: fo.direction || 'asc' }), {});

    return <div className={headerContainerClass} ref={tableHeaderContainerRef} style={headerContainerStyle} {...rest}>
        <table className={HEADER_CLASS} style={stylesAndClasses.header.style}>
            <thead>
                <tr className={ROW_CLASS}>
                    {pinnedLeft.map(col => {
                        return <th key={`table-header-col-${col.prop}-hidden-pinned`}
                            className={`${COL_CLASS} ${COL_PINNED_OUTSIDE_CLASS}`}
                            style={stylesAndClasses.columns.style[col.prop]}
                        ></th>;
                    })}
                    {columns.filter(col => !pinnedLeft.includes(col)).map(col => {
                        return <TableHeaderColumn
                            key={`table-header-col-${col.prop}`}
                            col={col}
                            stylesAndClasses={{
                                col: { style: stylesAndClasses.columns.style[col.prop], classes: colClass },
                                cell: { style: stylesAndClasses.cells.style[col.prop], classes: cellClass },
                            }}
                            isPinned={pinnedLeft.includes(col)}
                            sortedFields={sortedFields}
                            tableStyleState={tableStyleState}
                            setTableStyleState={setTableStyleState}
                            config={config}
                        />;
                    })}
                </tr>
            </thead>
        </table>
    </div>;
}

TableHeader.propTypes = {
    columns: PropTypes.array.isRequired,
    config: PropTypes.object.isRequired,
    pinnedLeft: PropTypes.array,
    stylesAndClasses: PropTypes.object.isRequired,
    tableHeaderContainerRef: PropTypes.object,
    tableStyleState: PropTypes.object.isRequired,
    setTableStyleState: PropTypes.func.isRequired,
};
