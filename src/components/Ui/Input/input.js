import React from 'react';
import styles from'./input.module.css';
import {FaCcMastercard} from  'react-icons/fa';
const input=(props)=>{
    let disable;
    let typeCard='';
    if(props.disable){
        if(props.id==='shippingCity' || props.id==='shippingCountry' || props.id==='shippingAddress'|| props.id==='shippingPostalCode'){
            disable=true;
          }
    }
if(props.id==='card'){
    console.log('5406610000784574');
    typeCard=<span className={styles.cardType}> {props.valide} </span>
}
    let inputElement = null;
    let text;
    let inputClasses=[styles.inputElement];
    if(props.invalid){
        inputClasses=[styles.invalid];
        text=<span className={styles.textForInvalid}>Please check your information and try again for activation Next step </span>
    }
    if(props.elementConfig.type==='checkbox'){
        text=null;
        inputClasses=[styles.checkBox]
    }
    if(props.elementConfig.type==='radio'){
      
        text=null;
        inputClasses=[styles.radio]
    }

    if(props.elementType==='select'){
        inputClasses=[styles.select]
    }
        if(props.elementType==='select'){
            if(props.invalid){
                inputClasses=[styles.selectInvalid]
                text=<span className={styles.textForInvalid}>Please check your information and try again for activation Next step </span>
            }else{
                inputClasses=[styles.select];
        }
       
    }


    switch (props.elementType) {
        case('input'):
            inputElement = <div className={styles.round}><input
           disabled={disable}
                onChange={props.changed}
                className={inputClasses}
                {...props.elementConfig}
                value={props.value}/>
             
                 </div>;
            break;
        case ('select'):
            inputElement = <select
            disabled={disable}
                className={inputClasses}
                value={props.value}
                onChange={props.changed}
            >
                <option value='1'>{props.id==='shippingCountry'?"Choose sipping Country ":"Please choose your country..."}</option>
                {props.elementConfig.options.map( option=>(
                        <option key={option.value} value={option.value}> {option.value} </option>
                    )
                )}
            </select>;
            break;
        case('checkbox'):
            inputElement = <input
            
                type='checkbox'
                defaultChecked={props.value}
                onChange={props.changed}
                className={inputElement}
                />;
            break;
            case('radio'):
            inputElement = <input
                type='checkbox'
                defaultChecked={props.value}
                onChange={props.changed}
                className={inputElement}
                />;
        default:
            inputElement=<input
                onChange={props.changed}
                className={inputClasses}
                {...props.elementConfig}
                value={props.value} />;
    }
    let label=null;
       if(props.label ){
       label=
	    <label  className="label">
			{props.label}
		</label>
          
       
       }
       
      
    
    return(
        <div className={styles.Input}>
            {text}
            {inputElement}
            {typeCard}
            {label}
        </div>
    );


};
export default input;