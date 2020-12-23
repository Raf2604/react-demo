import React, {Component} from "react";
import Name from './Name.jsx';
import Price from './Price.jsx';
import Description from './Description.jsx';

class Product extends Component{
    
    
    render(){
        const{name,price,description}=this.props;
        return(
            <span>
                <Name value={name}/>
                <Price value={price}/>
                <Description value={description}/>
            </span>
        )
    }
}
export default Product;