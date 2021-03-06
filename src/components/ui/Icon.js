import React from 'react';
import PropTypes from 'prop-types';

// import '@fortawesome/fontawesome-free/css/all.css';
// import 'font-awesome/css/font-awesome.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';


const UI_ICON_CLASS = 'ui-icon';
const SPACEBAR_CODE = 32;

export function Icon({ name, size='normal', modifiers=[], className='', ...rest }) {
    const sizeClass = `${UI_ICON_CLASS}--${size}`;

    const modifiersList = Array.isArray(modifiers) ? modifiers : [modifiers];
    if (rest.onClick && !modifiersList.includes('clickable'))
        modifiersList.push('clickable');
    const modifiersClasses = modifiersList.map(m => `${UI_ICON_CLASS}--${m}`).join(' ');

    return <i className={`${UI_ICON_CLASS} material-icons ${name} ${modifiersClasses} ${sizeClass} ${className}`} {...rest} />;
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    modifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    className: PropTypes.string,
    size: PropTypes.oneOf(['smaller', 'small', 'normal', 'big', 'bigger', 'huge']),
};


export function IconControl({ className='', ...rest }) {
    const iconControlClassName = `${className} ui-icon__control`;

    const onKeyDown = rest.onKeyDown ? rest.onKeyDown : rest.onClick
        ? e => {
            if (e.keyCode === SPACEBAR_CODE) {
                e.preventDefault();
                e.stopPropagation();
                rest.onClick();
            }
        }
        : undefined;

    return <Icon size="smaller" className={iconControlClassName} onKeyDown={onKeyDown} {...rest} />;
}

IconControl.propTypes = {
    className: PropTypes.string,
};
