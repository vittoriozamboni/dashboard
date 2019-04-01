import React from 'react';
import PropTypes from 'prop-types';

export function Card({ icon, title, subtitle, description, controls, width, colors, styles }) {
    const sideColor = colors.side;
    const iconColor = colors.icon;
    const containerStyle = { ...styles.container, ...width && { width } };
    const sideStyle = { ...styles.side, ...sideColor && { backgroundColor: sideColor, borderColor: sideColor } };
    const iconStyle = { ...styles.icon, ...iconColor && { color: iconColor } };

    return <div className="ui-card__container" {...containerStyle && { style: containerStyle }}>
        <div className="ui-card__side__container" {...sideStyle && { style: sideStyle }}>
            {icon && <div className="ui-card__side__icon" {...iconStyle && { style: iconStyle }}>{icon}</div>}
        </div>
        <div className="ui-card__main__container">
            <div className="ui-card__main">
                {title && <div className="ui-card__title">{title}</div>}
                {subtitle && <div className="ui-card__subtitle">{subtitle}</div>}
                {description && <div className="ui-card__description">{description}</div>}
            </div>
            {controls &&
                <div className="ui-card__controls">
                    {controls}
                </div>
            }
        </div>
    </div>;
}

Card.propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    controls: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    styles: PropTypes.shape({
        container: PropTypes.object,
        side: PropTypes.object,
        icon: PropTypes.shape({
            backgroundColor: PropTypes.string,
            color: PropTypes.string,
        }),
    }),
    colors: PropTypes.shape({
        side: PropTypes.string,
        icon: PropTypes.string,
    }),
    width: PropTypes.string,
};

Card.defaultProps = {
    title: '',
    subtitle: '',
    description: '',
    width: '',
    styles: {},
    colors: {},
};
