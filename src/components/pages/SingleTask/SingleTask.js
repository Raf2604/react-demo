import { React, Component } from 'react';
import { Container, Row, Col, Card,Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from "../../../helpers/utils";
import Edit from '../../Edit';

export default class SingleTask extends Component{
    state={
        task:null,
        singleTaskModal:false
    }
    componentDidMount(){
        fetch(`http://localhost:3001/task/${this.props.match.params.taskId}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        })
        .then(async(response) => {
            const res = await response.json();
            if(response.status >= 400 && response.status <= 599){
                if(res.error){
                    throw res.error;
                }
                else {
                    throw new Error('Something went wrong!!!');
                }
            }
            this.setState({
                task:res
           })
        })
        .catch((error)=>{
            console.log('catch error', error);
        });
    }

    handleDeleteSingleTask = ()=> {
        fetch(`http://localhost:3001/task/${this.state.task._id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json'
            }
        })
        .then(async(response) => {
            const res = await response.json();
            if(response.status >= 400 && response.status <= 599){
                if(res.error){
                    throw res.error;
                }
                else {
                    throw new Error('Something went wrong!!!');
                }
            }
            this.props.history.push('/');
        })
        .catch((error)=>{
            console.log('catch error', error);
        }); 
    }

    handleSaveTask = (editedTask)=>{
        
        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedTask),
            headers: {
                "Content-Type": 'application/json'
            }
        })
        .then(async(response) => {
            const res = await response.json();
            if(response.status >= 400 && response.status <= 599){
                if(res.error){
                    throw res.error;
                }
                else {
                    throw new Error('Something went wrong!!!');
                }
            }
            this.setState({
                task: res,
                singleTaskModal: false
            })

        })
        .catch((error)=>{
            console.log('catch error', error);
        });
    }

    handleEditSingleTask = ()=>{
        this.setState({
            singleTaskModal:!this.state.singleTaskModal
        })
    }
    
    render(){
        const {task} = this.state;
        return(
            <div>
                <Container className='text-center'>
                    <Row>
                        <Col xs={12}>
            {
                this.state.task?
                    <Card>
                        <Card.Body>
                            <Card.Title>{task.title}</Card.Title>
                            <Card.Text>Description: {task.description}</Card.Text>
                            <Card.Text>Date: {formatDate(task.date)}</Card.Text>
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
                        onSave={this.handleSaveTask}
                    />
                }
            </div>

        );
    }
};