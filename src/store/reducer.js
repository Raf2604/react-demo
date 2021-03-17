import * as actionTypes from '../store/actionTypes';

const defaultState={
    tasks: [],
    task: null,
    addTaskSuccess: false,
    deleteTasksSuccess: false,
    editTaskSuccess: false,
    editSingleTaskSuccess: false,
    spinnerShow: false,
    successMessage: null,
    errorMessage: null
} 
export default function reducer(state=defaultState,action){
    switch(action.type){

      case actionTypes.PENDING:{
        return{
          ...state,
          addTaskSuccess: false,
          deleteTasksSuccess: false,
          editTaskSuccess: false,
          editSingleTaskSuccess: false,
          spinnerShow: true,
          successMessage: null,
          errorMessage: null
        }
      }

      case actionTypes.ERROR:{
        return{
          ...state,
          spinnerShow: false,
          errorMessage: action.error
        }
      }

      case actionTypes.GET_TASKS:{
        return{
          ...state,
          tasks:action.tasks,
          spinnerShow: false
        }
      }

      case actionTypes.GET_TASK:{
        return{
          ...state,
          task:action.task,
          spinnerShow: false
        }
      }

      case actionTypes.ADD_TASK:{
        return{
          ...state,
          tasks:[...state.tasks, action.task],
          addTaskSuccess: true,
          spinnerShow: false,
          successMessage: 'Task created successfully!!'
        }
      }
      
      case actionTypes.DELETE_TASK:{
        if(action.from === 'singleTask'){
          return {
            ...state,
            task: null,
            spinnerShow: false,
            successMessage: 'Task deleted successfully!!!'
          }
        }
        const afterDelete = state.tasks.filter((tasks) => action.taskId !== tasks._id)
        return{
          ...state,
          tasks: afterDelete,
          spinnerShow: false,
          successMessage: 'Task deleted successfully!!'
        }
      } 

      case actionTypes.DELETE_TASKS:{
        let deleteSelectedTasks = state.tasks.filter((task) => {
          if(action.taskIds.has(task._id)){
              return false
          }else{
              return true
          }
        })
        return{
            ...state,
            tasks: deleteSelectedTasks,
            deleteTasksSuccess: true,
            spinnerShow: false,
            successMessage: 'Tasks deleted successfully!!'
        }
      }    

      case actionTypes.EDIT_TASK:{
        let message = 'Task edited successfully!!'
        if(action.status === 'active'){
          message = 'The task is active now!!';
        }else{
          message = 'You have completed the task!!';
        }

        if(action.from === 'singleTask'){
          return {
            ...state,
            task: action.editedTask,
            editSingleTaskSuccess: true,
            spinnerShow: false,
            successMessage: message
          }
        }
        
        const tasks = [...state.tasks];
        const editedId = tasks.findIndex((task)=> task._id === action.editedTask._id);
        tasks[editedId] = action.editedTask
        return{
          ...state,
          tasks: tasks,
          editTaskSuccess: true,
          spinnerShow: false,
          successMessage: message
        }
      }

      default:return state
    }
}