import request from '../helpers/request';
import * as actionTypes from '../store/actionTypes';

export function getTasks(){
    return(dispatch)=>{
        dispatch({type:actionTypes.PENDING});
        request('http://localhost:3001/task')
        .then((tasks)=>{
            dispatch({type:actionTypes.GET_TASKS,tasks:tasks})
        })
    }
}

export function addTask(newTask){
    return(dispatch)=>{
        dispatch({type:actionTypes.PENDING});
        request('http://localhost:3001/task','POST', newTask)
        .then((task)=>{
            dispatch({type:actionTypes.ADD_TASK, task:task})
        })
    }
}

export function deleteTask(taskId){
    return(dispatch)=>{
        dispatch({type:actionTypes.PENDING});
        request(`http://localhost:3001/task/${taskId}`,'DELETE')
        .then(()=>{
            dispatch({type:actionTypes.DELETE_TASK, taskId: taskId})
        })
    }
}

export function deleteTasks(taskIds){
    return(dispatch)=>{
        dispatch({type:actionTypes.PENDING});
        request("http://localhost:3001/task",'PATCH', {tasks:[...taskIds]})
        .then(()=>{
            dispatch({type:actionTypes.DELETE_TASKS, taskIds: taskIds})
        })
    }
}

export function editTask(data){
    return(dispatch)=>{
        dispatch({type:actionTypes.PENDING});
        request(`http://localhost:3001/task/${data._id}`,'PUT', data)
        .then((editedTask)=>{
            dispatch({type:actionTypes.EDIT_TASK, editedTask: editedTask})
        })
    }
}