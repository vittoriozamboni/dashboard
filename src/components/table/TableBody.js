import React from 'react';
import PropTypes from 'prop-types';


export default function TableBody({ columns, entries, config={}, pagination, columnsStyle={}, cellsStyle={}, tableStyle={}, tableBodyContainerRef, bodyContainerClass='', pinnedLeft=[] }) {
    const firstElement = (pagination.page - 1) * pagination.pageSize;
    const lastElement = firstElement + pagination.pageSize;

    const bodyContainerStyle = getBodyContainerStyle(config);
    const columnsClass = getBodyColumnsClass(columns, config);
    const cellsClass = getBodyCellsClass(columns, config);

    return <div className={`${bodyContainerClass}`} ref={tableBodyContainerRef} style={bodyContainerStyle}>
        <table className="ui-table__body" style={tableStyle}>
            <tbody>
                {entries.slice(firstElement, lastElement).map((entry, eIndex) => {
                    return <tr key={eIndex} className={`ui-table__body__row ui-table__body__col--${eIndex % 2 === 0 ? 'even' : 'odd'}`}>
                        {pinnedLeft.map(col => {
                            return <td
                                key={`${eIndex}-${col.prop}`}
                                className={`ui-table__body__col ${columnsClass[col.prop]} ui-table__body__col--${eIndex % 2 === 0 ? 'even' : 'odd'} ${config.zebra && eIndex % 2 !== 0 ? 'ui-table__body__col--zebra-dark' : ''}`}
                                style={{ ...columnsStyle[col.prop], visibility: 'hidden' }}
                            >
                            </td>;
                        })}
                        {columns.filter(col => !pinnedLeft.includes(col)).map(col => {
                            return <td
                                key={`${eIndex}-${col.prop}`}
                                className={`ui-table__body__col ${columnsClass[col.prop]} ui-table__body__col--${eIndex % 2 === 0 ? 'even' : 'odd'} ${config.zebra && eIndex % 2 !== 0 ? 'ui-table__body__col--zebra-dark' : ''}`}
                                style={columnsStyle[col.prop]}
                            >
                                <span
                                    className={`ui-table__body__cell ${cellsClass[col.prop]}`}
                                    style={{ ...cellsStyle[col.prop] }}
                                >
                                    {entry[col.prop]}
                                </span>
                            </td>;
                        })}
                    </tr>;
                })}
            </tbody>
        </table>
    </div>;
}

TableBody.propTypes = {
    columns: PropTypes.array.isRequired,
    entries: PropTypes.array.isRequired,
    config: PropTypes.object,
    pagination: PropTypes.object.isRequired,
    columnsStyle: PropTypes.object,
    cellsStyle: PropTypes.object,
    tableStyle: PropTypes.object,
    tableBodyContainerRef: PropTypes.object,
    bodyContainerClass: PropTypes.string,
    pinnedLeft: PropTypes.array,
};


function getBodyContainerStyle(config) {
    const style = {};

    if (config.maxHeight)
        style.maxHeight = config.maxHeight;
    if (config.height)
        style.height = config.height;

    return style;
}

function getBodyColumnsClass(columns, config) {
    const columnsClass = {};
    columns.forEach(col => {
        const classes = [];

        if (config.borderType) {
            classes.push(`ui-table__body__col--${config.borderType}-border`);
        }

        columnsClass[col.prop] = classes.join(' ');
    });

    return columnsClass;
}

function getBodyCellsClass(columns, config) {
    const columnsClass = {};
    columns.forEach(col => {
        const classes = [];

        if (config.singleLine) {
            classes.push('ui-table__body__cell--single-line');
        }

        columnsClass[col.prop] = classes.join(' ');
    });

    return columnsClass;
}
