import React, { Component } from 'react';
import { DashboardMenu } from 'components/dashboard-menu/DashboardMenu';
import { DashboardItem } from 'components/dashboard-menu/DashboardItem';
import './header.scss';

const RightComponent = () => {
    return <span>Hello User!</span>;
};

class Applications extends DashboardItem {
    constructor(props) {
        super(props);

        this.state = { test: 1 };
        this.dashboardItemName = 'applications';
    }
    render() {
        const { query } = this.props;
        const { test } = this.state;

        return <div className="applications-container">
            This will be the list of installed applications! Query: {query} {test}
            <button onClick={() => this.setState({ test: test + 1 })}>Up state</button>
        </div>;
    }
}

export class Header extends Component {
    render() {
        return <header>
            <DashboardMenu
                left={[{ headerLabel: 'Applications', bodyItem: ({ query }) => <Applications query={query} /> }, 'Menu Item 2']}
                center='Dashboard'
                right={<RightComponent />}
            />
        </header>;
    }
}
