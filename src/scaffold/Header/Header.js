import React, { Component } from 'react';
import { DashboardMenu, DashboardItem, DashboardItemBodyPropTypes } from 'components/dashboard-menu/DashboardMenu';

const RightComponent = () => {
    return <span>Hello User!</span>;
};

class ApplicationsBody extends Component {
    render() {
        return <div>
            This will be the list of installed applications!
        </div>;
    }
}

ApplicationsBody.propTypes = {
    ...DashboardItemBodyPropTypes,
};

const Applications = () => <DashboardItem bodyComponent={ApplicationsBody} />;

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