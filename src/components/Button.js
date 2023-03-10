import React from 'react';
import PropTypes from "prop-types";

export default function Button(props) {
    return (
        <button type="button" className={"btn rounded-1 " + props.Class + (props.Icon !== "" ? " py-0 px-2 " : " ")} onClick={props.Clicked} disabled={props.Disabled}>
            {props.children}
            <span className={(props.Icon !== "" ? "me-1" : " ")}>{props.Label}</span>
        </button>
    );
}

Button.propTypes = {
    Clicked: PropTypes.func.isRequired,
    Class: PropTypes.string,
    Disabled: PropTypes.bool,
    Label: PropTypes.string,
}
Button.defaultProps = {
    Class: "btn-primary shadow-sm",
    Disabled: false,
    Label: "",
}