import React, {Component} from 'react';
import {Card, Button} from 'react-bootstrap';
import styles from './taskStyle.module.css';

export default class Task extends Component{
    state={
        selectColor:false
    }

    handleChange = ()=>{
        const {data, onSelect}=this.props
        onSelect(data._id);
        this.setState({
            selectColor:!this.state.selectColor
        })
    }

    render(){
        const {data, onDelete, disabled}=this.props
        return(
                <Card className={`${styles.tasks} ${this.state.selectColor ? styles.select : ""} `}>
                    <Card.Body>
                        <input type="checkbox" onChange={this.handleChange}/>
                        <Card.Title>{data.title}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </Card.Text>
                        <Button  
                        disabled={disabled}  
                        variant="danger" 
                        onClick={() => onDelete(data._id)}
                        >Remove</Button>
                    </Card.Body>
                </Card>
        );
    }
}