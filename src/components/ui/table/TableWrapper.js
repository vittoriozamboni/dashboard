import React, { Fragment, useState, useRef } from 'react';
import PropTypes from 'prop-types';


import { MainTable } from './MainTable';
import { PageController } from './PageController';
import { PinnedLeftTable } from './PinnedLeftTable';
import { StatusBar } from './StatusBar';
import { useScrollSync, useTableElements, useWindowSize } from './effects';
import { sortHandler } from './utils/sorting';
import { getFooterContainerClass } from './stylesAndClasses/footer';
import { getColumnsStyle, getCellsStyle } from './stylesAndClasses/table';


export function TableWrapper({ columns, entries, config, tableStyleState, setTableStyleState, container }) {

    const [pageState, setPageState] = useState({ page: 1, pageSize: 20 });

    const [scrollMaster, setScrollMaster] = useState(null);
    const [shadowedPinnedLeft, setShadowedPinnedLeft] = useState(false);

    const commonStyles = {
        columns: { style: getColumnsStyle(columns, tableStyleState) },
        cells: { style: getCellsStyle(columns, tableStyleState, config) },
    };

    const footerContainerClass = getFooterContainerClass();

    const tableHeaderContainerRef = useRef(null);
    const tableBodyContainerRef = useRef(null);
    const pinnedLeftTableHeaderContainerRef = useRef(null);
    const pinnedLeftTableBodyContainerRef = useRef(null);

    useScrollSync(tableBodyContainerRef, [tableHeaderContainerRef], scrollMaster, { scrollLeft: true },
        (scroll) => setShadowedPinnedLeft(scroll !== 0));
    useScrollSync(tableBodyContainerRef, [pinnedLeftTableBodyContainerRef], scrollMaster, { scrollTop: true });
    useScrollSync(pinnedLeftTableBodyContainerRef, [tableBodyContainerRef], scrollMaster, { scrollTop: true });

    const { width: windowWidth } = useWindowSize();

    useTableElements(tableHeaderContainerRef, tableBodyContainerRef, columns, config, setTableStyleState, tableStyleState, windowWidth, container);

    const pinnedLeft = tableStyleState.pinnedLeft
        ? columns.filter(col => tableStyleState.pinnedLeft.includes(col.prop))
        : [];

    const pageController = { visible: true, style: 'collapsed', ...(config.pageController || {}) };
    const statusBarController = { visible: true, ...(config.statusBarController || {}) };

    const sortFunction = config.sortHandler || sortHandler;

    const filteredEntries = tableStyleState.sortFields.length > 0
        ? sortFunction(entries, tableStyleState.sortFields)
        : entries;

    const commonConfig = {
        config,
        commonStyles,
        tableStyleState,
        setTableStyleState,
        setScrollMaster,
        pageState
    };

    return <Fragment>
        <MainTable
            columns={columns}
            entries={filteredEntries}
            refs={{ tableHeaderContainerRef, tableBodyContainerRef }}
            { ...commonConfig }
            pinnedLeft={pinnedLeft}
        />
        {pinnedLeft.length > 0 &&
            <PinnedLeftTable
                columns={pinnedLeft}
                entries={filteredEntries}
                refs={{ pinnedLeftTableHeaderContainerRef, pinnedLeftTableBodyContainerRef }}
                { ...commonConfig }
                shadowedPinnedLeft={shadowedPinnedLeft}
            />
        }
        {(statusBarController.visible || pageController.visible) &&
            <div className={footerContainerClass}>
                <div>
                    {statusBarController.visible && <StatusBar
                        config={{ ...config, statusBarController }}
                        pageState={pageState}
                        entries={filteredEntries}
                    />}
                </div>
                <div>
                    {pageController.visible && config.pagination && <PageController
                        config={{ ...config, pageController }}
                        pageState={pageState}
                        setPageState={setPageState}
                        totEntries={filteredEntries.length}
                    />}
                </div>
            </div>
        }
    </Fragment>;
}

TableWrapper.propTypes = {
    columns: PropTypes.array,
    entries: PropTypes.array,
    config: PropTypes.object,
    tableStyleState: PropTypes.object,
    setTableStyleState: PropTypes.func,
    container: PropTypes.object,
};
