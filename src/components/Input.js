import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

 export default function Input(props) {

    function handleChange(event) {
        let { value } = event.target;
        if (props.OnChange && typeof (props.OnChange) == 'function')
            props.OnChange(value);
    }

    return (
        <div className={`col-md-3 col-12 m-1 ${props.Class}`}>
            <label className={props.LabelClass}>{props.Label}</label>
            <Form.Control
                placeholder={props.PlaceHolder}
                aria-label="defaultInput"
                aria-describedby="basic-addon2"
                onChange={handleChange}
                size={props.Size}
                value={props.Model}
            />
        </div>
    )
}


Input.propTypes = {
    OnChange: PropTypes.func.isRequired,
    Model: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    Size: PropTypes.string,
    Disabled: PropTypes.bool,
    Label: PropTypes.string,
    PlaceHolder: PropTypes.string,
    LabelClass: PropTypes.string,
    Class: PropTypes.string
}

Input.defaultProps = {
    Size: '',
    Disabled: false,
    Label: '',
    LabelClass: ' ',
    Class: ' text-success fw-bold  ',
    Model: '',
    PlaceHolder: ''
}