import React, { PureComponent } from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from './taskStyle.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

export default class Task extends PureComponent{

    handleChange = ()=>{
        const {data, onSelect}=this.props
        onSelect(data._id);
    }
    render(){
        const {data, onDelete, disabled, selected, onEdit} = this.props;
        return(
                <Card className={`${styles.tasks} ${selected ? styles.select : ""} `}>
                    <Card.Body>
                        <input 
                            type="checkbox" 
                            onChange={this.handleChange}
                            checked={selected}
                        />
                        <Card.Title>{data.title}</Card.Title>
                        <Card.Text>{data.description}</Card.Text>
                        <Button  
                            className={"m-1"}
                            disabled={disabled}  
                            variant="warning" 
                            onClick={() => onEdit(data)}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button  
                            className={"m-1"}
                            disabled={disabled}  
                            variant="danger" 
                            onClick={() => onDelete(data._id)}
                        >
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                    </Card.Body>
                </Card>
        );
    }
}

Task.propType = {
    data: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    selected: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
}