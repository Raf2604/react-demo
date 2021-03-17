import React, { Component } from 'react';
import styles from './stylesToDo.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Search from '../../Search/Search';
import Task from '../../Task/Task';
import NewTask from '../../NewTask/NewTask';
import Confirm from '../../Confirm';
import Edit from '../../Edit';
import {connect} from 'react-redux';
import {getTasks, deleteTask, deleteTasks} from '../../../store/action';

class ToDo extends Component {
    state = {
        selectedTasks: new Set(),
        showConfirm: false,
        selected: false,
        toggleNewTaskModal: false,
        editTaskModal: null
    }

    componentDidMount(){
        this.props.getTasks()
    }

    componentDidUpdate(prevProps){
        if(!prevProps.addTaskSuccess && this.props.addTaskSuccess){
            this.setState({
                toggleNewTaskModal: false
            })
            return
        }
        if(!prevProps.deleteTasksSuccess && this.props.deleteTasksSuccess){
            this.setState({
                selectedTasks: new Set(),
                showConfirm: false
            })
            return
        }  
        if(!prevProps.editTaskSuccess && this.props.editTaskSuccess){
            this.setState({
                editTaskModal: null
            })
            return
        }  
        
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
        const { selectedTasks } = this.state;
        this.props.deleteTasks(selectedTasks);
    }

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };

    selectAll = () => {
        const selectAllTasks = this.props.tasks.map((task) => task._id);
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

    editElem = (editThisTask) => {
        this.setState({
            editTaskModal: editThisTask
        })
    }

    render() {
        const task = this.props.tasks.map((elem) => {
            return <Col key={elem._id} className={styles.marginTop}
                lg={3}
                md={4}
                sm={6}
                xs={12}
                >
                <Task
                    data={elem}
                    disabled={!!this.state.selectedTasks.size}
                    onDelete={this.props.deleteTask}
                    onSelect={this.selectTask}
                    selected={this.state.selectedTasks.has(elem._id)}
                    onEdit={this.editElem}
                />
            </Col>
        })

        return (
            <div>
                <h1 className={styles.title}>ToDo List</h1>
                <Container>
                    <Row>
                        <Col>
                            <Search/>
                        </Col>
                    </Row>
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
                                    !this.props.tasks.length || 
                                    this.props.tasks.length === this.state.selectedTasks.size
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
                                    !this.props.tasks.length ||
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
                        onClose={this.toggleNewTask}
                    />
                }       
                {
                    this.state.editTaskModal &&
                    <Edit
                        taskData={this.state.editTaskModal}
                        onClose={() => this.editElem(null)}
                    />
                }  
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        tasks: state.tasks,
        addTaskSuccess: state.addTaskSuccess,
        deleteTasksSuccess: state.deleteTasksSuccess,
        editTaskSuccess: state.editTaskSuccess
    };
};

const mapDispatchToProps = {
    getTasks: getTasks,
    deleteTask: deleteTask,
    deleteTasks: deleteTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo)