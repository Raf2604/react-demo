import React, { Component } from 'react';
import styles from './stylesToDo.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../Task/Task';
import NewTask from '../NewTask/NewTask';
import Confirm from '../Confirm';

export default class ToDo extends Component {
    state = {
        tasks: [],
        selectedTasks: new Set(),
        showConfirm: false,
        selected: false,
        toggleNewTaskModal: false
    }

    addElem = (newTask) => {
        const tasks = [...this.state.tasks, newTask]
        this.setState({
            tasks: tasks,
            toggleNewTaskModal: false
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
            selectedTasks: new Set(),
            showConfirm: false
        })
    }

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };

    selectAll = () => {
        const selectAllTasks = this.state.tasks.map((task) => task._id);
        this.setState({
            selectedTasks: new Set(selectAllTasks)
        })
    }

    deselectAll = () => {
        this.setState({
            selectedTasks: new Set()
        })
    }
    toggleNewTask = () => {
        this.setState({
            toggleNewTaskModal: !this.state.toggleNewTaskModal
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
                <Task
                    data={elem}
                    disabled={!!this.state.selectedTasks.size}
                    onDelete={this.deleteElem}
                    onSelect={this.selectTask}
                    selected={this.state.selectedTasks.has(elem._id)}
                />
            </Col>
        })

        return (
            <>
                <h1 className={styles.title}>ToDo List</h1>
                <Container>
                    <Row className="justify-content-center">
                        <Col className={`${styles.taskButtons} `}>
                            <Button 
                                disabled={!!this.state.selectedTasks.size}
                                variant="primary" 
                                className="mb-3 justify-content-center" 
                                onClick={this.toggleNewTask}                           
                            >
                            Add task
                            </Button>
                        </Col>
                        <Col className={`${styles.taskButtons} `}>
                            <Button 
                                disabled={
                                    !this.state.tasks.length || 
                                    this.state.tasks.length === this.state.selectedTasks.size
                                }
                                variant="warning" 
                                className="mb-3 justify-content-center" 
                                onClick={this.selectAll}                           
                            >
                            Select All
                            </Button>
                        </Col>
                        <Col className={`${styles.taskButtons} `}>
                            <Button 
                                disabled={
                                    !this.state.tasks.length ||
                                    !this.state.selectedTasks.size
                                }
                                variant="warning" 
                                className="mb-3 justify-content-center" 
                                onClick={this.deselectAll}                           
                            >
                            Deselect all
                            </Button>
                        </Col>
                        <Col className={`${styles.taskButtons} `}>
                            <Button 
                                disabled={!this.state.selectedTasks.size} 
                                variant="danger" 
                                className="mb-3 justify-content-center" 
                                onClick={this.toggleConfirm}                               
                            >
                            Delete selected
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        {task}
                    </Row>
                </Container>  
                {
                    this.state.showConfirm &&               
                    <Confirm
                        onRemoveConfirm={this.deleteSelected}
                        onRemoveCancel={this.toggleConfirm}
                        tasksSize={this.state.selectedTasks.size}
                    /> 
                }
                {
                    this.state.toggleNewTaskModal &&
                    <NewTask
                        onAdd={this.addElem}
                        onClose={this.toggleNewTask}
                    />
                }         
            </>
        )
    }
}