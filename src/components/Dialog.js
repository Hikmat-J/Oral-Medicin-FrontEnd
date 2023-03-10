import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import PropTypes from "prop-types";

function Dialog(props) {

    function handleSubmit() {
        if (props.OnSave && typeof (props.OnSave === 'function'))
            props.OnSave()
    }
    function handleClose() {
        if (props.OnClose && typeof (props.OnClose === 'function'))
            props.OnClose()
    }

    return (
        <>
            <Modal show={props.Show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.Title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.children}

                    {/* <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {props.CloseLabel}
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        {props.SaveLabel}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Dialog;


Dialog.propTypes = {
    OnSave: PropTypes.func,
    OnClose: PropTypes.func,
    Show: PropTypes.bool.isRequired,
    Title: PropTypes.string,
    CloseLabel: PropTypes.string,
    SaveLabel: PropTypes.string,
}

Dialog.defaultProps = {
    Title: '',
    Show: false,
    CloseLabel: 'Close',
    SaveLabel: 'Save Changes',
}