import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './dashboard-menu.scss';
import { ELEMENTS_PROPS } from './constants';

export class DashboardMenu extends Component {
    constructor(props) {
        super(props);
        this.elementsProps = [ELEMENTS_PROPS.LEFT, ELEMENTS_PROPS.CENTER, ELEMENTS_PROPS.RIGHT];

        this.state = {
            bodyStatus: {
                open: false,
            },
            openItem: null
        };
    }

    toggleBodyOpen = (forcedStatus) => {
        const { bodyStatus } = this.state;
        const newOpenStatus = forcedStatus !== undefined
            ? forcedStatus
            : bodyStatus.open ? false : true;
        this.setState({ bodyStatus: {...bodyStatus, open: newOpenStatus } });
    }

    render() {
        const { bodyStatus } = this.state;
        const usedSections = this.elementsProps.filter(elementProp => this.props[elementProp] !== undefined).length;
        const sectionWidth = Math.floor(100 / usedSections);
        
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
                            return <Fragment key={`dashboard-menu-header-${elementProp}-${index}`}>
                                {typeof item === 'string' &&
                                    <span className="dashboard-menu__header-item">{item}</span>
                                }
                                {React.isValidElement(item) &&
                                    item
                                }
                            </Fragment>;
                        })}
                    </div>;
                })}
            </div>
            {bodyStatus.open &&
                <div className="dashboard-menu__body">
                    This is the body of the menu, will include useful links to any application part!
                </div>
            }
        </div>;
    }
};

const elementsPropType = PropTypes.oneOfType([
    PropTypes.node, PropTypes.string,
    PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.node, PropTypes.string
        ])
    )
]);

DashboardMenu.propTypes = {
    left: elementsPropType,
    center: elementsPropType,
    right: elementsPropType,
};
