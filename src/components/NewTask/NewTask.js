import React, {Component} from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator';
import PropTypes from 'prop-types';

export default class NewTask extends Component{
    state = {
        title:"",
        description:""
    }

    inputTextChange = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    addFromKeyboard = (event) => {
        if(event.key === "Enter"){
            this.addElem();
        }
    }

    creatTask = () => {
        const {title, description} = this.state;
        if (!title.trim()) {
            this.setState({
                title:"",
                description:""
            })
            return
        }
        const newTask = {
            _id: idGenerator(),
            title: title,
            description: description
        }
        this.props.onAdd(newTask);
        this.setState({
                title:"",
                description:""
        })
    }

    render() {
        const {disabled} = this.props;
        return (
            <InputGroup className="mb-3 justify-content-center">
                <FormControl
                    placeholder="Enter title of task"
                    aria-describedby="basic-addon2"
                    onChange={this.inputTextChange}
                    onKeyDown={this.addFromKeyboard}
                    value={this.state.title}
                    disabled={disabled}
                />
                <InputGroup.Append>
                    <Button 
                        disabled={disabled} 
                        variant="outline-primary" 
                        onClick={this.creatTask}
                    >Add Task</Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}

NewTask.propType = {
    disabled: PropTypes.bool.isRequired,
    onAdd: PropTypes.func.isRequired
}