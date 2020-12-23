import React, {Component} from "react";

class Name extends Component{
    render(){
        return(
            <span>{this.props.value}</span>
        )
    }
}
export default Name;