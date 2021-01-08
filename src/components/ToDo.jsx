import React, {Component} from 'react';

export default class ToDo extends Component{
    state={
        inputValue:"",
        tasks:[]
    }

    inputTextChange = (event)=> {
        this.setState({
            inputValue:event.target.value
        })
    }
    addElem = ()=> {
        if(!this.state.inputValue.trim()){
            this.setState({            
                inputValue:""
            })
            return
        }
        const tasks=[...this.state.tasks,this.state.inputValue]
        this.setState({
            tasks:tasks,
            inputValue:""
        })
    }
    resetList = ()=> {
        this.setState({
            inputValue:"",
            tasks:[]
        })
    }

    render(){   
        const li = this.state.tasks.map((elem,index)=>{
            return <li className="items" key={index}>{elem}</li>
        })  
        return(
            <>    
                <input
                className="inputList"
                type="text" 
                onChange={this.inputTextChange}
                value={this.state.inputValue}
                />
                <button className="btn-addItem" onClick={this.addElem}>Add Task</button>
                <button className="btn-resetList" onClick={this.resetList}>Reset</button>
               <ol className="list">
                    {li}
                </ol> 
            </>
        )
    }
}