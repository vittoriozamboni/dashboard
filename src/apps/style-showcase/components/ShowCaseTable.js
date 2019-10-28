import React, { Fragment, useState } from 'react';
import { Table } from 'components/table/Table';
import { CodeHighlight } from 'components/style/CodeHighlight';
import { PropsTable } from '../common/PropsTable';
import { Section } from 'components/ui/Section';
import { Block, RowBlock, ColumnBlock } from 'components/ui/Blocks';

const SAMPLE_ENTRIES = getEntries();

const SAMPLE_COLUMNS = [
    { prop: 'id', title: 'ID', width: 80},
    { prop: 'test1', title: 'Test 1', width: 200 },
    { prop: 'test2', title: 'Test 2', width: 150 },
    { prop: 'test3', title: 'Test 3', width: 500 },
    { prop: 'test4', title: 'Test 4', width: 170 },
    { prop: 'test5', title: 'Test 5', width: 100 },
    { prop: 'test6', title: 'Test 6', width: 100 },
];

export function ShowCaseTable() {
    const [singleLine, setSingleLine] = useState(true);
    const [padding, setPadding] = useState(9);
    const [borderType, setBorderType] = useState('cell');
    const [height, setHeight] = useState(200);
    const [pinnedLeft, setPinnedLeft] = useState(['id', 'test1']);
    const [zebra, setZebra] = useState(true);
    const [pagination, setPagination] = useState(true);
    const [pageController, setPageController] = useState({ visible: true, style: 'collapsed' });
    const [headerController, setHeaderController] = useState(true);
    const [verticalAlignment, setVerticalAlignment] = useState('top');

    const config = {
        singleLine,
        padding,
        borderType,
        height,
        pinnedLeft,
        zebra,
        headerController,
        pagination,
        pageController,
        verticalAlignment
    };

    return <Fragment>
        <Section title="Table">
            <Block title="Showcase" isOutstanding={true}>
                <p>
                    This is a sample table, with pinned columns and pagination.
                    You can change the generated config via the configurator below the table.
                </p>
                <Block>
                    <Table
                        columns={SAMPLE_COLUMNS}
                        entries={SAMPLE_ENTRIES}
                        config={config}
                    />
                </Block>
            </Block>

            <Block title="Configurator">
                <RowBlock>
                    <ColumnBlock className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <RowBlock>
                            <ColumnBlock className="col-xs-12 col-sm-6 col-md-6">
                                <h3>Spacing and size</h3>
                                <Block>
                                    <div className="ui-form__container">
                                        <div className="ui-form__field">
                                            <div className="ui-form__label w-100">Padding</div>
                                            <div className="ui-form__field-input">
                                                <input value={padding || ''} onChange={e => setPadding(e.target.value ? +e.target.value : undefined)} />
                                            </div>
                                        </div>
                                        <div className="ui-form__field">
                                            <div className="ui-form__label w-100">Height</div>
                                            <div className="ui-form__field-input"><input value={height || ''} onChange={e => setHeight(e.target.value ? +e.target.value : undefined)} /></div>
                                        </div>
                                    </div>
                                </Block>
                            </ColumnBlock>
                            <ColumnBlock className="col-xs-12 col-sm-6 col-md-6">
                                <h3>Header</h3>
                                <div className="ui-form__container">
                                    <div className="ui-form__field">
                                        <div className="ui-form__label w-100">Flags</div>
                                        <div className="ui-form__field-input">
                                            <button className={`ui-button ui-button--small ${headerController ? 'ui-button--positive' : ''}`} onClick={() => setHeaderController(!headerController) }>Header Controller</button>
                                        </div>
                                    </div>
                                    <div className="ui-form__field">
                                        <div className="ui-form__label w-100">Border Type</div>
                                        <div className="ui-form__field-input">
                                            <select value={borderType} onChange={e => setBorderType(e.target.value ? e.target.value : undefined)}>
                                                <option value=''>None</option>
                                                <option value='row'>Row</option>
                                                <option value='cell'>Cell</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <h3>Body</h3>
                                <div className="ui-form__container">
                                    <div className="ui-form__field">
                                        <div className="ui-form__label w-100">Flags</div>
                                        <div className="ui-form__field-input">
                                            <button className={`ui-button ui-button--small ${zebra ? 'ui-button--positive' : ''}`} onClick={() => setZebra(!zebra) }>Zebra</button>
                                        </div>
                                    </div>
                                    <div className="ui-form__field">
                                        <div className="ui-form__label w-100">Border Type</div>
                                        <div className="ui-form__field-input">
                                            <select value={borderType} onChange={e => setBorderType(e.target.value ? e.target.value : undefined)}>
                                                <option value=''>None</option>
                                                <option value='row'>Row</option>
                                                <option value='cell'>Cell</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="ui-form__field">
                                        <div className="ui-form__label w-100">Vertical Alignment</div>
                                        <div className="ui-form__field-input">
                                            <select value={verticalAlignment} onChange={e => setVerticalAlignment(e.target.value ? e.target.value : undefined)}>
                                                <option value=''>None</option>
                                                <option value='top'>Top</option>
                                                <option value='middle'>Middle</option>
                                                <option value='bottom'>Bottom</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </ColumnBlock>
                        </RowBlock>
                    </ColumnBlock>
                    <ColumnBlock className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <RowBlock>
                            <ColumnBlock className="col-xs-12 col-sm-6 col-md-6">
                                <h3>Pagination</h3>
                                <div className="ui-form__container">
                                    <div className="ui-form__field">
                                    <div className="ui-form__label w-100">Flags</div>
                                        <div className="ui-form__field-input">
                                            <button className={`ui-button ui-button--small ${zebra ? 'ui-button--positive' : ''}`} onClick={() => setPagination(!pagination) }>Pagination</button>
                                        </div>
                                    </div>
                                    <div className="ui-form__field">
                                        <div className="ui-form__label w-100">Page Controller</div>
                                        <div className="ui-form__field-input">
                                            <div>
                                                <button className={`ui-button ui-button--small ${pageController.visible ? 'ui-button--positive' : ''}`} onClick={() => setPageController({ ...pageController, visible: !pageController.visible }) }>Visible</button>
                                            </div>
                                            <div>
                                                <span className="m-l-10 m-r-10">Style</span>
                                                <select value={pageController.style} onChange={e => setPageController({ ...pageController, style: e.target.value })}>
                                                    <option value='collapsed'>Collapsed</option>
                                                    <option value='expanded'>Expanded</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h3>Other</h3>
                                <div className="ui-form__container">
                                    <div className="ui-form__field">
                                    <div className="ui-form__label w-100">Flags</div>
                                        <div className="ui-form__field-input">
                                        <button className={`ui-button ui-button--small ${singleLine ? 'ui-button--positive' : ''}`} onClick={() => setSingleLine(!singleLine) }>Single Line</button>
                                        </div>
                                    </div>
                                </div>

                            </ColumnBlock>
                            <ColumnBlock className="col-xs-12 col-sm-6 col-md-6">
                                <h3>Pinned Columns</h3>
                                <p>
                                    Note: this is the initial list, changes made directly in the table will
                                    be overridden if parameters are changed.
                                </p>
                                <RowBlock>
                                    <ColumnBlock>
                                        <h4>Left</h4>
                                        {SAMPLE_COLUMNS.map(column => {
                                            return <div key={`pinned-left-${column.prop}`}>
                                                <input
                                                    type="checkbox" id={`pin-column-left-${column.prop}`}
                                                    onChange={e => setPinnedLeft(pinColumn(column.prop, e.target.checked, pinnedLeft))} checked={pinnedLeft.includes(column.prop)} />
                                                <label htmlFor={`pin-column-left-${column.prop}`}>{column.title}</label>
                                            </div>;
                                        })}
                                    </ColumnBlock>
                                    <ColumnBlock>
                                        <h4>Left</h4>
                                        <p>To be done</p>
                                    </ColumnBlock>
                                </RowBlock>
                            </ColumnBlock>
                        </RowBlock>
                    </ColumnBlock>
                </RowBlock>
            </Block>

            <Block title="Generated Config">
                <RowBlock>
                    <ColumnBlock>
                        <CodeHighlight>{JSON.stringify(config, null, 4)}</CodeHighlight>
                    </ColumnBlock>
                    <ColumnBlock>
                        <h3>Todo</h3>
                        <ul>
                            <li><s>Header and Body components</s></li>
                            <li><s>Pinned Left</s></li>
                            <li><s>Zebra style</s></li>
                            <li><s>Pagination</s></li>
                            <li><s>Sort icons on column header</s></li>
                            <li><s>Options icon on column header</s></li>
                            <li>Pinned Right</li>
                            <li>Pinned columns without single line</li>
                        </ul>
                    </ColumnBlock>
                </RowBlock>
            </Block>
        </Section>

        <Props />
        <PropsConfig />
    </Fragment>;
}

function Props() {
    return <PropsTable propsList={[
        {
            propName: 'columns',
            propType: 'array',
            isRequired: true,
            description: 'A list of columns defintion. Each defintion is an object with the following properties: prop, title and width.'
        },
        {
            propName: 'entries',
            propType: 'array',
            isRequired: true,
            description: 'A list of objects that will be used to generate the rows.'
        },
        {
            propName: 'config',
            propType: 'array',
            isRequired: false,
            description: 'An object with the properties described in the table below.'
        },
    ]} />;
}

function PropsConfig() {
    return <PropsTable title='config' propsList={[
        {
            propName: 'padding',
            propType: 'number',
            default: 9,
            description: 'Table cell padding, both for header and body.'
        },
        {
            propName: 'singleLine',
            propType: 'boolean',
            default: 'false',
            description: 'If true, will not go on a new line and will use ellipses to truncate the value instead.' +
                'This has to be set to true if using pinned columns.'
        },
        {
            propName: 'borderType',
            propType: 'string',
            default: 'row',
            description: <div>
                Set the border type. Following values are accepted:
                <ul>
                    <li><pre className="ui-text__monospace">undefined</pre></li>
                    <li><pre className="ui-text__monospace">row</pre></li>
                    <li><pre className="ui-text__monospace">cell</pre></li>
                </ul>
            </div>},
        {
            propName: 'height',
            propType: 'number',
            description: 'Set the height of the table container.'
        },
        {
            propName: 'headerController',
            propType: 'boolean',
            default: 'true',
            description: 'Enable the header controller, which allows to sort or pin columns.'
        },
        {
            propName: 'verticalAligment',
            propType: 'string',
            default: 'middle',
            description: <div>
                Set the vertical alignment of Body cells. Accepted values are:
                <ul>
                    <li><pre className="ui-text__monospace">top</pre></li>
                    <li><pre className="ui-text__monospace">middle</pre></li>
                    <li><pre className="ui-text__monospace">bottom</pre></li>
                </ul>
            </div>
        },
        {
            propName: 'pagination',
            propType: 'boolean',
            default: 'false',
            description: 'Enable pagination.'
        },
        {
            propName: 'pageController',
            propType: 'object',
            description: <div>
                An object with the following properties:
                <ul>
                    <li><pre className="ui-text__monospace">visible</pre>: shows page controller (under the table)</li>
                    <li><pre className="ui-text__monospace">style</pre>: can be `collapsed` (all aligned to the right) or `expanded` (spread over all the width)</li>
                </ul>
            </div>
        },
    ]} />;
}

const pinColumn = function(column, pin, pinned) {
    if (pin) {
        return [...pinned, column];
    } else {
        return pinned.filter(c => c !== column);
    }
};

function getEntries() {
    const entries = [];
    const test2 = ['aaa aaa', 'bbbb bb', 'cc cccc', 'dd d dd'];
    for (let i=0; i<50; i++) {
        entries.push({
            id: i,
            test1: `Test field test1 for row ${i}`,
            test2: test2[randomNumber(0, 3)],
            test3: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis egestas semper leo ac porta. Integer metus urna, lacinia vitae purus et, pharetra auctor purus. Vivamus bibendum id lacus sit amet faucibus. Etiam tortor orci, varius at massa ut, tristique suscipit lorem. Nullam vel metus ex. Morbi vitae mauris volutpat erat commodo ultricies at ac magna. Cras condimentum id magna vitae blandit. Vestibulum auctor, magna porta sollicitudin egestas, elit quam interdum massa, consequat sollicitudin dui felis nec massa. Nullam aliquet velit eget metus placerat tempus.`,
            test4: `Short column for row ${i}`,
            test5: `Mid col row ${i}`,
            test6: `Test field test2`,
        });
    }
    return entries;
}

function randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
