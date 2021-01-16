import React, { Component } from 'react';
import styles from './stylesToDo.module.css';
import { Card, Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import idGenerator from '../helpers/idGenerator.js'

export default class ToDo extends Component {
    state = {
        inputValue: "",
        tasks: [],
        selectedTasks: new Set()
    }

    inputTextChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }
    addElem = () => {
        if (!this.state.inputValue.trim()) {
            this.setState({
                inputValue: ""
            })
            return
        }
        const newTask = {
            _id: idGenerator(),
            title: this.state.inputValue
        }
        const tasks = [...this.state.tasks, newTask]
        this.setState({
            tasks: tasks,
            inputValue: ""
        })
    }

    deleteElem = (deleteThisTask) => {
        const afterDelete = this.state.tasks.filter((tasks) => {
            return deleteThisTask !== tasks._id
        })
        this.setState({
            tasks: afterDelete
        })
    }

    selectTask = (selectThisTask) => {
        let newSelectedTasks = new Set(this.state.selectedTasks);

        if(newSelectedTasks.has(selectThisTask)){
            newSelectedTasks.delete(selectThisTask);
        }else{
            newSelectedTasks.add(selectThisTask);
        }
        this.setState({
            selectedTasks: newSelectedTasks
        })
    }

    deleteSelected = () => {
        const {tasks, selectedTasks} = this.state;
        let deleteSelectedTasks = tasks.filter((task) => {
            if(selectedTasks.has(task._id)){
                return false
            }else{
                return true
            }
        })
        this.setState({
            tasks: deleteSelectedTasks,
            selectedTasks: new Set()
        })
    }

    addFromKeyboard = (event) =>{
        if(event.key === "Enter"){
            this.addElem();
        }
    }

    render() {
        const task = this.state.tasks.map((elem) => {
            return <Col key={elem._id}
                xl={2}
                lg={3}
                md={4}
                sm={6}
                xs={12}
            >
                <Card className={styles.tasks}>
                    <Card.Body>
                        <input type="checkbox" onChange={()=>this.selectTask(elem._id)}/>
                        <Card.Title>{elem.title}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </Card.Text>
                        <Button  disabled={!!this.state.selectedTasks.size}  variant="danger" onClick={() => this.deleteElem(elem._id)}>Remove</Button>
                    </Card.Body>
                </Card>
            </Col>
        })

        return (
            <>
                <h1 className={styles.title}>ToDo List</h1>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={10}>
                            <InputGroup className="mb-3 justify-content-center">
                                <FormControl
                                    placeholder="Enter your task"
                                    aria-describedby="basic-addon2"
                                    onChange={this.inputTextChange}
                                    onKeyDown={this.addFromKeyboard}
                                    value={this.state.inputValue}
                                    disabled={!!this.state.selectedTasks.size} 
                                />
                                <InputGroup.Append>
                                    <Button disabled={!!this.state.selectedTasks.size} variant="outline-primary" onClick={this.addElem}>Add Task</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={4}>
                            <Button 
                                disabled={!this.state.selectedTasks.size} 
                                variant="outline-danger" 
                                className="mb-3 justify-content-center"
                                onClick={this.deleteSelected}
                            >Delete selected</Button>
                        </Col>
                    </Row>
                    <Row>
                        {task}
                    </Row>
                </Container>               
            </>
        )
    }
}