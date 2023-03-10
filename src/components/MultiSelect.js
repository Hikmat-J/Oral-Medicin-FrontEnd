import React, { useEffect, useState } from "react";
import { MultiSelect as MSelect } from "react-multi-select-component";
import PropTypes from 'prop-types';

export default function MultiSelect(props) {
    const [options, setOptions] = useState([])

    useEffect(() => {
        if (props.Options && props.Options.length > 0) {

            var tempOptions = []
            props.Options.map(item => {

                let tempItem = { value: item[props.Key], label: item[props.Value] }
                tempOptions.push(tempItem)
            })
            setOptions(tempOptions)
        }

    }, [props.Options])

    function handleOnChange(values) {
        if (props.OnChange && typeof (props.OnChange) == 'function')
            return props.OnChange(values, values.map(i => i.value))
    }
    return (
        <div className="my-2">
            <label className={props.LabelClass}>{props.Label}</label>
            <MSelect
                options={options}
                value={props.Model}
                onChange={handleOnChange}
                labelledBy="MultiSelect"
            />
        </div>
    )
}


MultiSelect.propTypes = {
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
    Model: PropTypes.array,
    OnChange: PropTypes.func,
    containerClass: PropTypes.string,
    FirstSelect: PropTypes.string
}

MultiSelect.defaultProps = {
    Class: " bg-white text-dark ",
    Key: "_id",
    Label: 'Label',
    Value: "Value",
    LabelClass: "text-success fw-bold  ",
    Disabled: false,
    containerClass: " mt-2",
    Model: [],
    FirstSelect: "Please Select"
}