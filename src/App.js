
import React, {Component}from 'react';


import styles from './global.module.css'
import Input from './components/Ui/Input/input'
import Button from './components/Ui/Button/Button'
import {firstStepControls} from './Hoc/global-objects'
import {secondStepControls} from './Hoc/global-objects'
import {thirdStepControls} from './Hoc/global-objects'
import {changedValueHandler} from './Hoc/shared/multiplyFunction'
import Titles from './components/Ui/Titles/Titles';

class App extends Component{
    state={
        firstStepControl:{},
        secondStepControl:{},
        thirdStepControl:{},
        allCountryList:{},
        countryOption:[],
        step: 1,
        err: '',
         successful:''
    }
    componentDidMount(){
        let firstClone = Object.assign({}, firstStepControls.controls);
        let secondClone = Object.assign({}, secondStepControls.controls);
      let thirdClone = Object.assign({}, thirdStepControls.controls);
        const axios = require('axios');
        axios(
          "all-country.json"
        ).then(res => {
              if(res.data && firstClone){
                let option=[];
                for(let key in res.data){
                  let country={id: res.data[key].name, value: res.data[key].name }
                  option.push(country)
                }
                   this.setState({firstStepControl: firstClone, secondStepControl: secondClone, thirdStepControl: thirdClone, allCountryList: res.data, countryOption: option});
               }else{
                   console.log('error')
               }
               }).catch(err => {
                  console.log(err)
               })
  }
       
    
  changedElements=(event, id)=>{
    
  let updateControl;
      switch (this.state.step){
        case 1:
         updateControl = changedValueHandler(this.state.firstStepControl, id, event, this.state.allCountryList)
          this.setState({firstStepControl: updateControl});
          break;
          case 2:
          updateControl = changedValueHandler(this.state.secondStepControl, id, event)
            this.setState({secondStepControl: updateControl});
            break;
            case 3:
          updateControl = changedValueHandler(this.state.thirdStepControl, id, event);
            this.setState({thirdStepControl: updateControl});
            break;
      }
    }

    submit=()=>{
    
      let firstClone = Object.assign({}, firstStepControls.controls);
      let secondClone = Object.assign({}, secondStepControls.controls);
      let thirdClone = Object.assign({}, thirdStepControls.controls);
      this.setState({successful:"Registration was successful ☺", secondStepControl: secondClone,thirdStepControl:thirdClone,firstStepControl:firstClone,step: 1, err: '', successful: '' }  )
    }
    
    nextStepHandler=(count)=>{

      let activate;
      let err=''
      let successful;
      switch(this.state.step){
        case 1:
          for(let key in this.state.firstStepControl){
            if(this.state.firstStepControl[key].valide && this.state.firstStepControl[key].value>0){
              err=''
              activate=count+1;   
            }else{
              err= 'check All'
              activate=this.state.step;
            }
            }
            break;
            case 2:
              for(let key in this.state.secondStepControl){
                if(key==='premiumPackage' || key==='standartPackage'){
                  if(this.state.secondStepControl['premiumPackage'].value===false && this.state.secondStepControl['standartPackage'].value===false  ){
                    err= 'For the next step must be choosen paskage';
                   activate=this.state.step;
                  }else{
                    activate=count+1;
                  }
                }else  if(this.state.secondStepControl[key].valide && this.state.secondStepControl[key].value>0){
                  activate=count+1;
                } 

              }
             break;

            case 3:
          
              for(let key in this.state.thirdStepControl){      
                if(this.state.thirdStepControl[key].valide && this.state.thirdStepControl[key].value !== ''){            
                  activate=this.state.step+1;
                }else{
                  err= 'Check all'
                  activate=this.state.step
                }   
                }
                break;
            }   
      this.setState({step: activate, err: err})
     }
     
    
    
    prevStepHandler=(count)=>{
      this.setState({step:count})
    }



  render(){

    const Title ="Registration form";
    let controls;
    let submit;

    let prevButton;
 switch(this.state.step){
   case 1:
       controls=this.state.firstStepControl
       break;
   case 2:
      prevButton=true;
      controls=this.state.secondStepControl
      break;
      case 3:
        prevButton=true;
        controls=this.state.thirdStepControl;
        break;
        case 4:
          prevButton=false;
          submit=true;
          
 }
 
    let formElementsArray=[];
    for(let key in controls){
        formElementsArray.push({id: key, config: controls[key]});
    }


    let form = formElementsArray.map((formElement,index)=>{
      if(  formElement.config.elementType==='select'){
       formElement.config.elementConfig.options=this.state.countryOption;
      }

       return(    <Input
        key={formElement.id}
        id={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        label={formElement.config.label}
        changed={(event)=>this.changedElements(event,formElement.id)}
        valide={formElement.config.valide}
        invalid={!formElement.config.valide}
        disable={this.state.firstStepControl['dataForShipping'].value}
    />)

       
    
    }
 
         

    );
   
 

    return (
      <div >
        <Titles  title={Title} />
        <Titles err={this.state.err} />
        <Titles  title={this.state.successful} />

        <div className={styles.form}>
            {form}
           
            { prevButton?<Button titleButton='Previous' clicked={()=>this.prevStepHandler(this.state.step-1)}/>:null }
            { submit?<Button titleButton='Start Again' clicked={()=>this.submit()}/>: <Button titleButton='Next' disable={this.state.next} clicked={()=>this.nextStepHandler(this.state.step)}/>}
       </div>
     
      </div>
    );
  }
  
}

export default App;