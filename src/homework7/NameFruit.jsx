import React, { Component } from 'react';

export default class NameFruit extends Component{
    render(){
        return(
                <span>{this.props.value}</span>
        )
    }
}