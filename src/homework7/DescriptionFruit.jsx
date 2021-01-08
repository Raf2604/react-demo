import React, { Component } from 'react';

export default class DescriptionFruit extends Component{
    render(){
        return(
                <span>{this.props.value}</span>
        )
    }
}