import React, {Component} from 'react';
import NameFruit from './NameFruit.jsx';
import PriceFruit from './PriceFruit.jsx';
import DescriptionFruit from './DescriptionFruit.jsx';

class Fruit extends Component{
    constructor(props){
        super(props);
        this.state={
            currency: this.props.fruitPrice,
            buttonText: 'Change to AMD'
        }
    }
    
    changeCurrency=()=>{
        /* let currencyNumber=+this.state.currency.slice(0,this.state.currency.length-1); */
        let currencyNumber = parseFloat(this.state.currency);
        let resultNumber = 0, 
            resultButtonText= "";

        if(this.state.currency.includes("$")){
            resultNumber = currencyNumber * 500 + "֏";
            resultButtonText = 'Change to USD';
        }else{
            resultNumber = currencyNumber / 500 + "$";
            resultButtonText = 'Change to AMD';
        } 

        this.setState({
            currency:resultNumber,
            buttonText:resultButtonText
        }) 

    }
    render(){
        const {fruitName,fruitDescription}=this.props;
        const {currency,buttonText}=this.state;

        return(
               <div>
                    <NameFruit value={fruitName}/>
                    <DescriptionFruit value={fruitDescription}/>
                    <PriceFruit value={currency}/>!!
                    <button onClick={this.changeCurrency}>{buttonText}</button>
               </div> 
        )
    }
}

export default Fruit;