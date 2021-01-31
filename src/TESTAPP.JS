
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
        step: 3,
        err: '',
    }
    componentDidMount(){
        let firstClone = Object.assign({}, firstStepControls.controls);
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
                   this.setState({firstStepControl: firstClone, secondStepControl: secondStepControls,thirdStepControl: thirdStepControls, allCountryList: res.data, countryOption: option});
               }else{
                   console.log('error')
               }
               }).catch(err => {
                  console.log(err)
               })
  }
       
    
  changedElements=(event, id)=>{
      console.log('1')
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
          console.log('10',updateControl)
            this.setState({thirdStepControl: updateControl});
            break;
      }
    }
    nextStepHandler=(count)=>{
      console.log(count)
      let activate;
      let err=''
      switch(this.state.step){
        case 1:
          for(let key in this.state.firstStepControl){
            if(this.state.firstStepControl[key].valide && this.state.firstStepControl[key].value>0){
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
     
      }
     
      this.setState({step: activate, err: err})
    }

    prevStepHandler=(count)=>{
      this.setState({step:count})
    }



  render(){
    const Title ="Registration form";
let controls;
 let disabledPrevious;

 switch(this.state.step){
   case 1:
       disabledPrevious=true;
       controls=this.state.firstStepControl
       break;
   case 2:
      disabledPrevious=false;
      controls=this.state.secondStepControl
      break;
      case 3:
        disabledPrevious=false;
        controls=this.state.thirdStepControl
        break;

   
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
        <Titles  err={this.state.err} />
        <div className={styles.form}>
            {form}
            <Button titleButton='Next' disable={this.state.next} clicked={()=>this.nextStepHandler(this.state.step)}/>
            <Button titleButton='Previous' disable={disabledPrevious} clicked={()=>this.prevStepHandler(this.state.step-1)}/>
       </div>
     
      </div>
    );
  }
  
}

export default App;
