import React, { Component } from 'react';
import styles from './stylesToDo.module.css';
import { Form, Card, Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import idGenerator from '../helpers/idGenerator.js'

export default class ToDo extends Component {
    state = {
        inputValue: "",
        tasks: [],
        selectedTasks: []
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
    resetList = () => {
        this.setState({
            inputValue: "",
            tasks: []
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

    selectTask = (e, selectThisTask) => {
        let selected = [...this.state.selectedTasks];

        if(e.target.checked){
            selected = [...selected, selectThisTask];
        }else{
            selected = selected.filter((item)=>{
                return selectThisTask !== item
            })
        }
        this.setState({
            selectedTasks: selected
        })
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
                        <Form.Check type="checkbox" onChange={(event)=>this.selectTask(event, elem._id)}/>
                        <Card.Title>{elem.title}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </Card.Text>
                        <Button variant="danger" onClick={() => this.deleteElem(elem._id)}>Remove</Button>
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
                                    value={this.state.inputValue}
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-primary" onClick={this.addElem}>Add Task</Button>
                                    <Button variant="outline-secondary" onClick={this.resetList}>Reset</Button>
                                </InputGroup.Append>
                            </InputGroup>
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