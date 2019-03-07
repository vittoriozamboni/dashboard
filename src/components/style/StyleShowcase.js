import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Colors } from './Colors';
import { Headers } from './Headers';
import { PageHeader } from 'components/ui/PageHeader';
import { GridComponent } from './GridComponent';

const SECTIONS = {
    COLORS: 'colors',
    TYPOGRAPHY: 'typography',
    GRID_COMPONENT: 'grid-component'
};

export class StyleShowcase extends Component {
    state = {
        sectionName: SECTIONS.GRID_COMPONENT,
    }

    setSection = (sectionName) => {
        this.setState({ sectionName });
    }

    render() {
        const { sectionName } = this.state;

        const controls = <Controls setSection={this.setSection} sectionName={sectionName} />;

        return <div>
            <PageHeader controls={controls}>Style Showcase</PageHeader>
            <div className="page-body__container">
                {sectionName === SECTIONS.TYPOGRAPHY && <Headers />}
                {sectionName === SECTIONS.COLORS && <Colors />}
                {sectionName === SECTIONS.GRID_COMPONENT && <GridComponent />}
            </div>
        </div>;
    }
};

function Controls({ sectionName, setSection }) {
    const baseClass = 'button button--small';
    return <Fragment>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.COLORS ? 'button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.COLORS)}>Colors</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.TYPOGRAPHY ? 'button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.TYPOGRAPHY)}>Typography</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.GRID_COMPONENT ? 'button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.GRID_COMPONENT)}>Grid</button>
    </Fragment>;
}

Controls.propTypes = {
    sectionName: PropTypes.string,
    setSection: PropTypes.func,
};
