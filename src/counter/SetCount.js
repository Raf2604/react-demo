import React from 'react';
import Increment from './Increment';
import Decrement from './Decrement';

export default function Counter(){
    return(
        <div>
            <Decrement/> 
            <Increment/>   
        </div>
    )
}