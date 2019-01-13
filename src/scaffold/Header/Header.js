import React, { Component } from 'react';
import { DashboardMenu, DashboardItem } from 'components/dashboard-menu/DashboardMenu';

const RightComponent = () => {
    return <span>Hello User!</span>;
};

class Applications extends DashboardItem {
    render() {
        const { query } = this.props;

        return <div>
            This will be the list of installed applications! Query: {query}
        </div>;
    }
}

export class Header extends Component {
    render() {
        return <header>
            <DashboardMenu
                left={[{ headerLabel: 'Applications', bodyItem: Applications }, 'Menu Item 2']}
                center='Dashboard'
                right={<RightComponent />}
            />
        </header>;
    }
}
