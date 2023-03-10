import React from "react";
import PropTypes from "prop-types";
import "./Spinner.css";

import { RotatingLines } from "react-loader-spinner";

export default function SpinnerLines(props) {
    return (
        props.Show && (
            <div className="overlay show">
                <div className="spanner show">
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="2"
                        animationDuration="0.85"
                        width="75"
                        visible={true}
                    />
                </div>
            </div>)
    )
}

SpinnerLines.propTypes = {
    Show: PropTypes.bool.isRequired
}
