import './Box.css';

import React from 'react';

const Box = (props) => {
    console.log(props);
    const styles = { color: 'green', ...props.style };
    const extraClasses = props.rounded ? 'Box--rounded' : undefined;
    let classes = `Box ${extraClasses}`;
    classes = `${classes} ${props.className}`;
    return (
        <div className={classes} style={styles}>
            {props.children}
        </div>
    );
};

export default Box;
