import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './dashboard-menu.scss';
import { ELEMENTS_PROPS } from './constants';

export class DashboardMenu extends Component {
    constructor(props) {
        super(props);
        this.elementsProps = [ELEMENTS_PROPS.LEFT, ELEMENTS_PROPS.CENTER, ELEMENTS_PROPS.RIGHT];

        this.state = {
            bodyOpen: false,
            selectedItem: null,
            query: '',
        };
    }

    toggleBodyOpen = (forcedStatus) => {
        const { bodyOpen } = this.state;
        const newOpenStatus = forcedStatus !== undefined
            ? forcedStatus
            : bodyOpen ? false : true;
        this.setState({ bodyOpen: newOpenStatus });
    }

    toggleSetItem = (item, openBody) => {
        const { selectedItem, bodyOpen } = this.state;
        if (selectedItem === item) {
            if (!bodyOpen) {
                this.setState({ bodyOpen: openBody });
            } else {
                this.setState({
                    selectedItem: null,
                    bodyOpen: false
                });            
            }
        } else {
            const newState = {selectedItem: item};
            if (openBody !== undefined) newState.bodyOpen = openBody;
            this.setState(newState);
        }
    }

    updateQuery = (query) => {
        this.setState({query});
    }

    handleChangeQuery = (event) => {
        this.updateQuery(event.target.value);
    }

    render() {
        const { bodyOpen, selectedItem, query } = this.state;
        const usedSections = this.elementsProps.filter(elementProp => this.props[elementProp] !== undefined).length;
        const sectionWidth = Math.floor(100 / usedSections);
        
        const SelectedItemBody = selectedItem && selectedItem.hasOwnProperty('bodyItem') ? selectedItem.bodyItem : null;

        return <div className="dashboard-menu__container">
            <div className="dashboard-menu__header">
                {this.elementsProps.map(elementProp => {
                    if (!this.props[elementProp]) return <Fragment></Fragment>;
                    const items = Array.isArray(this.props[elementProp]) ? this.props[elementProp] : [this.props[elementProp]];

                    return <div
                            className={`dashboard-menu__header-block dashboard-menu__header-block--${elementProp}`}
                            style={{width: `${sectionWidth}%`}}
                            key={`dashboard-menu-header-${elementProp}`}
                        >
                        {items.map((item, index) => {
                            const itemHeader = item.hasOwnProperty('headerLabel') ? item.headerLabel : null;
                            return <Fragment key={`dashboard-menu-header-${elementProp}-${index}`}>
                                {typeof item === 'string' &&
                                    <span className="dashboard-menu__header-item">{item}</span>
                                }
                                {itemHeader &&
                                    <span className="dashboard-menu__header-item dashboard-menu__header-dashboard-item" onClick={() => this.toggleSetItem(item, true)}>{item.headerLabel}</span>
                                }
                                {React.isValidElement(item) && !item.hasOwnProperty('renderHeader') &&
                                    item
                                }
                            </Fragment>;
                        })}
                    </div>;
                })}
            </div>
            {bodyOpen &&
                <div className="dashboard-menu__body">
                    <div className="dashboard-menu__body-header">
                        <div className="dashboard-menu__body-query">
                            <input type="text" value={query} placeholder="Type your query here..."
                                className="dashboard-menu__body-query__input"
                                onChange={this.handleChangeQuery} />
                        </div>
                        <div className="dashboard-menu__body-controls">
                            <i className="fas fa-times dashboard-menu__body-controls__control" onClick={() => this.toggleBodyOpen(false)}></i>
                        </div>
                    </div>
                    {SelectedItemBody &&
                        <div className="dashboard-menu__body-item">
                            <SelectedItemBody query={query} />
                        </div>
                    }
                </div>
            }
        </div>;
    }
};

const elementsPropType = PropTypes.oneOfType([
    PropTypes.node, PropTypes.string, PropTypes.object,
    PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.node, PropTypes.string, PropTypes.object
        ])
    )
]);

DashboardMenu.propTypes = {
    left: elementsPropType,
    center: elementsPropType,
    right: elementsPropType,
};
