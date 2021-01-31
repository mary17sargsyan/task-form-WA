import React  from  'react';
import styles from './Titles.module.css';
 const titles = (props)=>{
            let title=null;
            if(props.title){
                title  = <h1 className={styles.TitleTextCenter}> {props.title} </h1>;
                return title;
            }
         
            return ( 
                <>   
                {title}  
                <h3> {props.err}  </h3>
                </>
            );
      
}
export default titles;