import React, { Component } from 'react';
import { Form, FormControl, Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import { formatDate } from "../helpers/utils";
import "react-datepicker/dist/react-datepicker.css";

export default class NewTask extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...props.taskData,
            date: props.taskData.date ? new Date(props.taskData.date) : ""
        };
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

    changeTask = () => {
        const title = this.state.title.trim();
        const description = this.state.description.trim();

        if (!title) {
            return
        }
        const newTask = {
            _id: this.state._id,
            title: title,
            description: description,
            date: formatDate(this.state.date.toISOString())
        }
        this.props.onSave(newTask);
    }

    handleChangeDate = (value) => {
        this.setState({
            date: value || new Date()
        })
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
                            Edit task
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormControl
                            className={"mb-3"}
                            value={this.state.title}
                            aria-describedby="basic-addon2"
                            onChange={(event)=>this.inputTextChange(event, "title")}
                            onKeyPress={this.addFromKeyboard}
                            name="title"
                        />
                        <Form.Control  
                            as="textarea" 
                            rows={3} 
                            value={this.state.description}
                            onChange={(event)=>this.inputTextChange(event, "description")}
                            name="description"
                        />
                        <DatePicker 
                            className={"mt-3"}
                            minDate={new Date()}
                            selected={this.state.date} 
                            onChange={this.handleChangeDate}  
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={this.changeTask}>Confirm</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </Modal.Footer>
                    </Modal>
        )
    }
}

NewTask.propType = {
    taskData: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
}