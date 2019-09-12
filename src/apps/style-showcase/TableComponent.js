import React, { Fragment, useState } from 'react';
import { Table } from 'components/table/Table';
import { CodeHighlight } from 'components/style/CodeHighlight';

const entries = [];
for (let i=0; i<1000; i++) {
    entries.push({
        id: i,
        test1: `Test field test1 for row ${i}`,
        test2: `Test field test2`,
        test3: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis egestas semper leo ac porta. Integer metus urna, lacinia vitae purus et, pharetra auctor purus. Vivamus bibendum id lacus sit amet faucibus. Etiam tortor orci, varius at massa ut, tristique suscipit lorem. Nullam vel metus ex. Morbi vitae mauris volutpat erat commodo ultricies at ac magna. Cras condimentum id magna vitae blandit. Vestibulum auctor, magna porta sollicitudin egestas, elit quam interdum massa, consequat sollicitudin dui felis nec massa. Nullam aliquet velit eget metus placerat tempus.`,
        test4: `Short column for row ${i}`,
        test5: `Mid col row ${i}`,
        test6: `Test field test2`,
    });
}

const pinColumn = function(column, pin, pinned) {
    if (pin) {
        return [...pinned, column];
    } else {
        return pinned.filter(c => c !== column);
    }
};

export function TableComponent() {
    const [showControls, setShowControls] = useState(false);
    const [singleLine, setSingleLine] = useState(true);
    const [padding, setPadding] = useState(9);
    const [borderType, setBorderType] = useState('cell');
    const [height, setHeight] = useState(300);
    const [pinnedLeft, setPinnedLeft] = useState(['id', 'test1']);

    const [zebra, setZebra] = useState(true);
    const [rowBorder, setRowBorder] = useState(true);
    const [sectionBorder, setSectionBorder] = useState(true);
    const [pinnedRight, setPinnedRight] = useState([]);
    const [width, setWidth] = useState();


    const columns = [
        { prop: 'id', title: 'ID', width: 40},
        { prop: 'test1', title: 'Test 1', width: 200 },
        { prop: 'test2', title: 'Test 2', width: 150 },
        { prop: 'test3', title: 'Test 3', width: 500 },
        { prop: 'test4', title: 'Test 4', width: 170 },
        { prop: 'test5', title: 'Test 5', width: 100 },
        { prop: 'test6', title: 'Test 6', width: 100 },
    ];

    const gridOptions = {
        columnsWidth: { id: 40, test7: 400 },
        width, height,
        pinnedColumns: { left: pinnedLeft, right: pinnedRight },
        styles: { zebra, rowBorder, sectionBorder },
    };

    const config = {
        singleLine,
        padding,
        borderType,
        height,
        pinnedLeft,
    };

    return <div>
        <div className="ui-section">
            <button className={`ui-button ui-button--small`} onClick={() => setShowControls(!showControls) }>Toggle show Controls</button>
        </div>
        {showControls && <Fragment>
            <div className="ui-section">
                <div className="ui-section__column w-50pc">
                    <h2 className="ui-title">Sizes</h2>
                    <div className="ui-section ui-form__container">
                        <div className="ui-form__field">
                            <div className="ui-form__label w-100">Width</div>
                            <div className="ui-form__field-input">
                                <input value={width || ''} onChange={e => setWidth(e.target.value ? +e.target.value : undefined)} />
                            </div>
                        </div>
                        <div className="ui-form__field">
                            <div className="ui-form__label w-100">Height</div>
                            <div className="ui-form__field-input"><input value={height || ''} onChange={e => setHeight(e.target.value ? +e.target.value : undefined)} /></div>
                        </div>
                    </div>
                    <h2 className="ui-title">Spacing</h2>
                    <div className="ui-section ui-form__container">
                        <div className="ui-form__field">
                            <div className="ui-form__label w-100">Padding</div>
                            <div className="ui-form__field-input">
                                <input value={padding || ''} onChange={e => setPadding(e.target.value ? +e.target.value : undefined)} />
                            </div>
                        </div>
                    </div>
                    <h2 className="ui-title">Styles</h2>
                    <div className="ui-section">
                        <button className={`ui-button ui-button--small ${zebra ? 'ui-button--positive' : ''}`} onClick={() => setZebra(!zebra) }>Zebra</button>
                        <button className={`ui-button ui-button--small ${rowBorder ? 'ui-button--positive' : ''}`} onClick={() => setRowBorder(!rowBorder) }>Row Border</button>
                        <button className={`ui-button ui-button--small ${sectionBorder ? 'ui-button--positive' : ''}`} onClick={() => setSectionBorder(!sectionBorder) }>Section Border</button>
                        <button className={`ui-button ui-button--small ${singleLine ? 'ui-button--positive' : ''}`} onClick={() => setSingleLine(!singleLine) }>Single Line</button>
                        <select value={borderType} onChange={e => setBorderType(e.target.value ? e.target.value : undefined)}>
                            <option value=''>None</option>
                            <option value='row'>Row</option>
                            <option value='cell'>Cell</option>
                        </select>
                    </div>
                </div>
                <div className="ui-section__column w-50pc">
                    <h2 className="ui-title">Pinned Columns</h2>
                    <div className="ui-section">
                        <div className="ui-section__column w-50pc">
                            <h4 className="ui-title ui-section__title">Left</h4>
                            {columns.map(column => {
                                return <div key={`pinned-left-${column.prop}`}>
                                    <input
                                        type="checkbox" id={`pin-column-left-${column.prop}`}
                                        onChange={e => setPinnedLeft(pinColumn(column.prop, e.target.checked, pinnedLeft))} checked={pinnedLeft.includes(column.prop)} />
                                    <label htmlFor={`pin-column-left-${column.prop}`}>{column.title}</label>
                                </div>;
                            })}
                        </div>
                        <div className="ui-section__column w-50pc">
                            <h4 className="ui-title ui-section__title">Right</h4>
                            {columns.map(column => {
                                return <div key={`pinned-right-${column.prop}`}>
                                    <input
                                        type="checkbox" id={`pin-column-right-${column.prop}`}
                                        onChange={e => setPinnedRight(pinColumn(column.prop, e.target.checked, pinnedRight))} checked={pinnedRight.includes(column.prop)} />
                                    <label htmlFor={`pin-column-right-${column.prop}`}>{column.title}</label>
                                </div>;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>}

        <Table
            {...gridOptions}
            columns={columns}
            entries={entries}
            config={config}
        />

        <div>
            <h2 className="ui-title">Generated <em>props</em></h2>
            <CodeHighlight>
                {JSON.stringify({ ...gridOptions, rows: [] }, null, 4)}
            </CodeHighlight>
        </div>
    </div>;
}