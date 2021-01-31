import React from 'react';
import styles from'./input.module.css';

const input=(props)=>{
    let inputElement = null;
    let inputClasses=[styles.inputElement];
    if(props.elementType==='checkbox'){
        inputClasses=[classes.CheckBox]
    }
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.invalid);
    }


    switch (props.elementType) {
        case('input'):
            inputElement = <input
                onChange={props.changed}
                className={styles.inputElement}
                {...props.elementConfig}
                value={props.value}/>;
            break;
        case ('textarea'):
            inputElement = <textarea
                onChange={props.changed}
                className={styles.textareaElement}
                {...props.elementConfig}
                value={props.value}/>;
            break;
        case ('select'):

            inputElement = <select
                className={styles.inputElement}
                value={props.value}
                onChange={props.changed}
            >
                <option> </option>
                {props.elementConfig.options.map( option=>(
                        <option key={option.value} value={option.value}> {option.displayValue} </option>
                    )
                )}

            </select>;
            break;
        case('checkbox'):
            inputElement = <input
                type='checkbox'
                defaultChecked={props.value}
                onChange={props.changed}
                className={styles.inputElement}
                />;
            break;
        default:
            inputElement=<input
                onChange={props.changed}
                className={styles.inputElement}
                {...props.elementConfig}
                value={props.value} />;
    }

    let label=null;
    if(props.search){
        label=null
    }else{
       
            label=(<label className={styles.Label} key={props.labelKey}>
                {props.label}
                {props.important?<span className={styles.important}>*</span>: null }
            </label>)
       
      
    }
    return(
        <div className={styles.Input}>
            {label}
            {inputElement}
        </div>
    );


};
export default input;