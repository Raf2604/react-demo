import React, { Component } from 'react';
import { Form, FormControl, Modal, Button } from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator';
import PropTypes from 'prop-types';

export default class NewTask extends Component {
    state = {
        title: "",
        description: ""
    }

    inputTextChange = (event, name) => {
        this.setState({
            [name]: event.target.value
        })
    }

    addFromKeyboard = (event) => {
        if (event.key === "Enter") {
            this.creatTask();
        }
    }

    creatTask = () => {
        const title = this.state.title.trim();
        const description = this.state.description.trim();

        if (!title) {
            this.setState({
                title: "",
                description: ""
            })
            return
        }
        const newTask = {
            _id: idGenerator(),
            title: title,
            description: description
        }
        this.props.onAdd(newTask);
    }

    render() {
        const { onClose } = this.props;
        return (
                <Modal
                    onHide={onClose}
                    show={true}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton >
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add new task
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormControl
                            className={"mb-3"}
                            placeholder="Enter title of task"
                            aria-describedby="basic-addon2"
                            onChange={(event)=>this.inputTextChange(event, "title")}
                            onKeyPress={this.addFromKeyboard}
                            name="title"
                        />
                        <Form.Control  
                            as="textarea" 
                            rows={3} 
                            placeholder="Enter description of task"
                            onChange={(event)=>this.inputTextChange(event, "description")}
                            name="description"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={this.creatTask}>Create</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </Modal.Footer>
                    </Modal>
        )
    }
}

NewTask.propType = {
    onAdd: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}