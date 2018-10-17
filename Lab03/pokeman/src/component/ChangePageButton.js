import React from 'react';

function ChangePageButton (props) {
    return (
        <button onClick={props.onClick}>{props.buttonName}</button>
    );
}

export default ChangePageButton;