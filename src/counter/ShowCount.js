import React from 'react';
import {connect} from 'react-redux';

function ShowCount(props){
    return(
        <h1>
            Count: {props.value}
        </h1>
    )
}
const mapStateToProps = (state) => {
    return{
        value:state.count
    }
}

export default connect(mapStateToProps)(ShowCount);