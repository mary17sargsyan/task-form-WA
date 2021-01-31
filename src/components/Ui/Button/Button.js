import React from 'react';
//import styles from './Button.module.css'
import styles from './Button.module.css'

const button =(props)=>{
    return(
        <button disabled={props.disable} onClick={props.clicked} className={styles.Button}>
        {props.titleButton}
   </button>
    )
}
    
   

     
   

    



export default button;