import * as actionTypes from '../store/actionTypes';

const defaultState={
    tasks: [],
    addTaskSuccess: false,
    deleteTasksSuccess: false,
    editTaskSuccess: false,
    spinnerShow: false
} 
export default function reducer(state=defaultState,action){
    switch(action.type){
      case actionTypes.PENDING:{
        return{
          ...state,
          addTaskSuccess: false,
          deleteTasksSuccess: false,
          editTaskSuccess: false,
          spinnerShow: true
        }
      }
      case actionTypes.GET_TASKS:{
        return{
          ...state,
          tasks:action.tasks,
          spinnerShow: false
        }
      }
      case actionTypes.ADD_TASK:{
        return{
          ...state,
          tasks:[...state.tasks, action.task],
          addTaskSuccess: true,
          spinnerShow: false
        }
      }
      case actionTypes.DELETE_TASK:{
        const afterDelete = state.tasks.filter((tasks) => action.taskId !== tasks._id)
        return{
          ...state,
          tasks: afterDelete,
          spinnerShow: false
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
            spinnerShow: false
        }
      }      
      case actionTypes.EDIT_TASK:{
        const tasks = [...state.tasks];
        const editedId = tasks.findIndex((task)=> task._id === action.editedTask._id);
        tasks[editedId] = action.editedTask
        return{
          ...state,
          tasks: tasks,
          editTaskSuccess: true,
          spinnerShow: false
        }
      }

      default:return state
    }
}