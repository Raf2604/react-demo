import { React, Component } from 'react';
import { Container, Row, Col, Card,Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faCheck, faRedo } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from "../../../helpers/utils";
import Edit from '../../Edit';
import {connect} from 'react-redux';
import {getTask, deleteTask, editTask} from '../../../store/action';

class SingleTask extends Component{
    state={
        singleTaskModal:false
    }

    componentDidMount(){
        this.props.getTask(this.props.match.params.taskId)
    }

    componentDidUpdate(prevProps){
        if(!prevProps.editSingleTaskSuccess && this.props.editSingleTaskSuccess){
            this.setState({
                singleTaskModal: false
            })
            return
        }
    }

    handleDeleteSingleTask = ()=> {
        this.props.deleteTask(this.props.task._id, 'singleTask')
    }

    handleEditSingleTask = ()=>{
        this.setState({
            singleTaskModal:!this.state.singleTaskModal
        })
    }

    render(){
        const {task, editTask} = this.props;
        return(
            <div>
                <Container className='text-center'>
                    <Row>
                        <Col xs={12}>
            {
                task?
                    <Card>
                        <Card.Body>
                            <Card.Title>{task.title}</Card.Title>
                            <Card.Text>Description: {task.description}</Card.Text>
                            <Card.Text>Status: {formatDate(task.status)}</Card.Text>
                            <Card.Text>Created at: {formatDate(task.created_at)}</Card.Text>
                            <Card.Text>Date: {formatDate(task.date)}</Card.Text>
                            {
                                task.status === "active" ?
                                <Button  
                                    className={"m-1"}
                                    variant="success" 
                                    onClick={() => editTask({_id: task._id, status: "done"}, "singleTask")}
                                >
                                    <FontAwesomeIcon icon={faCheck} />
                                </Button>:
                                <Button  
                                    className={"m-1"} 
                                    variant="dark" 
                                    onClick={() => editTask({_id: task._id, status: "active"}, "singleTask")}
                                >
                                    <FontAwesomeIcon icon={faRedo} />
                                </Button>
                            }
                            <Button  
                                className={"m-1"} 
                                variant="warning" 
                                onClick={this.handleEditSingleTask}
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button  
                                className={"m-1"}
                                variant="danger" 
                                onClick={this.handleDeleteSingleTask}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </Button>
                        </Card.Body>
                    </Card>:
                <p>Loading...</p>
            }
                </Col>
                </Row>
            </Container>

                {
                    this.state.singleTaskModal &&
                    <Edit
                        taskData={task}
                        onClose={this.handleEditSingleTask}
                        from="singleTask"
                    />
                }
            </div>

        );
    }
};

const mapStateToProps = (state)=>{
    return {
        task: state.task,
        editSingleTaskSuccess: state.editSingleTaskSuccess
    };
};

const mapDispatchToProps = {
    getTask: getTask,
    deleteTask: deleteTask,
    editTask: editTask
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask)