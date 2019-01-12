import React, { Component } from 'react';
import { DashboardMenu } from 'components/dashboard-menu/DashboardMenu';

const RightComponent = () => {
    return <span>Hello User!</span>;
};

export class Header extends Component {
    render() {
        return <header>
            <DashboardMenu
                left={['Menu Item 1', 'Menu Item 2']}
                center='Dashboard'
                right={<RightComponent />}
            />
        </header>;
    }
}