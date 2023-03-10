import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

function Select(props) {
    function handler(event) {
        const { value } = event.target;
        if (props.OnChange && typeof props.OnChange == "function")
            props.OnChange(value, props.Options, props.ID);
    }
    return (
        <div className={props.containerClass}>
            {props.Label && (
                <label className={props.LabelClass}>{props.Label}</label>
            )}
            <div className={`border rounded input-group `} >
                <select
                    className={`form-select form-select-sm rounded border border-0 p-2 ${props.Class}`}
                    disabled={props.Disabled}
                    onChange={handler}
                    value={props.Model}>

                    {props.Options.find((item) => +item[props.Key] === 0) === undefined && (
                        <option defaultValue value="0">{props.FirstSelect}</option>
                    )}
                    {props.Options.map((item) => {
                        return (
                            <option key={item[props.Key]} value={item[props.Key]}>
                                {item[props.Value]}
                            </option>
                        );
                    })}
                </select>
                {props.Icon &&
                    <Button Icon={props.Icon} Class=" text-white btn-secondary" />
                }
            </div>
        </div>

    );
}

Select.propTypes = {
    Label: PropTypes.string,
    LabelClass: PropTypes.string,
    Options: PropTypes.array.isRequired,
    Class: PropTypes.string,
    Disabled: PropTypes.bool,
    Key: PropTypes.string,
    ID: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    Value: PropTypes.string,
    Model: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
    ]),
    OnChange: PropTypes.func,
    containerClass: PropTypes.string,
    FirstSelect: PropTypes.string
};

Select.defaultProps = {
    Class: "",
    Key: "Key",
    ID: "ID",
    Value: "Value",
    LabelClass: "text-success fw-bold ",
    Disabled: false,
    containerClass: " my-2",
    Model: false,
    FirstSelect: "Please Select"
};

export default Select;
