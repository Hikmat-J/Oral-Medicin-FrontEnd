import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { propTypes } from 'react-bootstrap/esm/Image';

export default function Textarea(props) {

    function handleChange(event) {
        let { value } = event.target;
        if (props.OnChange && typeof (props.OnChange) == 'function')
            props.OnChange(value);
    }

    return (
        <div className={`col-md-3 col-12 m-1 ${props.Class}`}>
            <Form.Group controlId='textarea'>
                <Form.Label className={props.LabelClass}>{props.Label}</Form.Label>
                <Form.Control
                    as='textarea'
                    rows={props.Rows}
                    placeholder={props.PlaceHolder}
                    aria-label="defaultInput"
                    aria-describedby="basic-addon2"
                    onChange={handleChange}
                    size={props.Size}
                    value={props.Model}
                />
            </Form.Group>
        </div>
    )
}


Textarea.propTypes = {
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
    Class: PropTypes.string,
    Rows: PropTypes.number
}

Textarea.defaultValues = {
    Size: '',
    Disabled: false,
    Label: '',
    LabelClass: '',
    Class: '',
    Model: '',
    PlaceHolder: '',
    Rows: 3
}