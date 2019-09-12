import React from 'react';
import PropTypes from 'prop-types';


export default function TableHeader({ columns, entries, config={}, columnsStyle={}, tablesStyle={}, tableContainerStyle={}, tableHeaderContainerRef, tableContainerClass='' }) {
    const columnsClass = getHeaderColumnsClass(columns, config);
    const cellsClass = getHeaderCellsClass(columns, config);
    const pinnedLeft = config.pinnedLeft || [];

    return <div className={`ui-table__header__container ${tableContainerClass}`} ref={tableHeaderContainerRef} style={tableContainerStyle}>
        <table className="ui-table__header" style={tablesStyle}>
            <thead>
                <tr className="ui-table__header__row">
                    {columns.map(col => {
                        return <th key={col.prop}
                            className={`ui-table__header__col ${columnsClass[col.prop]}`}
                            style={{ ...columnsStyle[col.prop], ...(pinnedLeft.includes(col.prop) ? { visibility: 'hidden' } : {})}}
                        >
                            {!pinnedLeft.includes(col.prop) ?
                                <span className={`ui-table__header__cell ${cellsClass[col.prop]}`}>
                                    {col.title}
                                </span>
                            : null}
                        </th>;
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
    columnsStyle: PropTypes.object,
    tablesStyle: PropTypes.object,
    tableHeaderContainerRef: PropTypes.object,
    tableContainerStyle: PropTypes.object,
    tableContainerClass: PropTypes.string,
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