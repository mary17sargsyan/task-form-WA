

export const checkValidity=(value, controls, id,  countryList)=>{
if(id==='expiryDate'){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy+mm+dd;

for(let i=0; i<value.length;i++){
    if(value[i]==='-'){
        value=value.slice(0, i)+value.slice(i+1, value.length);
    }
   
}
if(value>=today){
   
    return true;
}else{
    return false
}

}
if(controls.hasOwnProperty('dataForShipping')){
    if(controls['dataForShipping'].value===true){
        if(id==='shippingCountry'|| id==='shippingCity' ||id=== 'shippingAddress' || id==='shippingPostalCode' ){
            return true;
        }
    }
}
    

if(id==='card'){

 let cardType= creditCardType(value);
 if(cardType){
    return cardType;
 }
}

    if(id==='country' || id==='shippingCountry'){
        for(let key in countryList){
            if(countryList[key].name === value){
                return true;
            }
        }
    }

    if(id==='postalCode' || id==='shippingPostalCode'){
        let code;
        for(let key in countryList){
        if(controls.country.value){
            let country;
            id==='postalCode'?country='country':country='shippingCountry'
            if( countryList[key].name===controls[country].value){
                let postalCodes=countryList[key].postalCode;
                let found = postalCodes.find(element => element == value);
                if(found){
                    code=true;
                }
            }
        }else{
            let postalCodes=countryList[key].postalCode;
            let found = postalCodes.find(element => element == value);
            if(found){
                code=true;
            }
          
        } 
    }
        return code;
    }


  if(id==='repeatPassword' ){
      if(controls['password'].value.length>0){
          if(controls['password'].value===value){
              return true
          }else{
              return false
          }
      } else{
          return true
      } 
  }
  
  
if(id==='firstName' || id==='lastName'  || id==='city' || id==='address'   || id==='shippingAddress' || id==='shippingCity'  || id==='password' || id==='repeatPassword' || id==='cardName' || id==='cvc' ){
    
        if( value.length <= controls[id].rules.max && value.length>=controls[id].rules.min ){
            return true;
        }else{
            return false
        }
    }
    if(id === 'email'){ 
        //

        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)){
            if(value.length<=controls[id].rules.min || value.length>= controls[id].rules.max){
                return(false)
            } else{
                return(true)
            }
         
        }else{
            return false
        }
      
    }

}
export const updateObject = (oldObject, updatedValues)=>{
    return{
        ...oldObject,
        ...updatedValues

    };
};
export  const changedValueHandler = (controls, controlName, event, countryList)=>{

    let updateControl;
    let value=event.target.value;
 
    if(controlName === 'cvc' || controlName==='card'){
   if(controlName==='card'){
   if(event.nativeEvent.inputType !== 'deleteContentBackward'){
       if(value.length === 4 || value.length===9 || value.length===14 || value.length===19  || value.length===24) {
        value=value+' '

        }
   }
   }

   for(let i=0; i<=value.length; i++){

    if(value.charCodeAt(i)<48  ||  value.charCodeAt(i)>58){
        if(value.charCodeAt(i)===32){
            if(i === 4 || i ===9 || i ===14 || i===19 || i===24 ){

            }else{
                value=value.slice(0, i)+value.slice(i+1, value.length);
            }
          
        }else{
            value=value.slice(0, i)+value.slice(i+1, value.length);
        }
      
        

    }
   }

   }



    if(controls[controlName].elementType === 'checkbox' ){
     controls[controlName].value?value=false:value=true
    };


    
 
  
  updateControl = updateObject(controls, {...controls,
    [controlName]: updateObject(controls[controlName],{
       value: value,
       valide: checkValidity(value, controls, controlName, countryList)
     })
  });

  if(controls.hasOwnProperty('dataForShipping')){
  if(controls['dataForShipping'].value===true){
    if(controlName==='country'||controlName==='city'||controlName==='address'||controlName==='postalCode'){
        let change;
        if(controlName==='country'){
            change='shippingCountry';
        }else if (controlName==='city'){
            change='shippingCity';    
        }else if(controlName==='address'){
            change='shippingAddress'
        }else if(controlName==='postalCode'){
            change='shippingPostalCode'
        }
        let checked=upt(updateControl, change, value)
        updateControl=checked;
    }
    
}
}

if(controlName==='country' && controls['postalCode'].value ){
         updateControl = updateObject(updateControl, {...updateControl,
             ['postalCode']: updateObject(controls['postalCode'], {
                 value: updateControl['postalCode'].value,
                valide: checkValidity(updateControl['postalCode'].value, updateControl,'postalCode', countryList)
              })
           })
 }


 if(controlName==='shippingCountry' && controls['shippingPostalCode'].value ){
    updateControl = updateObject(updateControl, {...updateControl,
        ['shippingPostalCode']: updateObject(controls['shippingPostalCode'], {
            value: updateControl['shippingPostalCode'].value,
           valide: checkValidity(updateControl['shippingPostalCode'].value, updateControl,'shippingPostalCode', countryList)
         })
      })
}



 if(controlName==='password'){


     if(updateControl['repeatPassword'].value.length>0){
        let checked=upt(updateControl, 'repeatPassword', ''  )
        updateControl=checked;
     }
   
  }
  
 
  

  return updateControl;
  
  }
  
  export const upt =(controls, controlName, event, countryList)=>{
    
  let  upt = updateObject(controls, {...controls,
    [controlName]: updateObject(controls[controlName], {
        value: event,
        valide: checkValidity(controls[controlName].value, controls, controlName, countryList)
     })
  })
  return upt;
  };


  export const creditCardType=(dd) =>{
    var cc = dd.split(' ').join('');
    let amex = new RegExp('^3[47][0-9]{13}$');
    let visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
    let cup1 = new RegExp('^62[0-9]{14}[0-9]*$');
    let cup2 = new RegExp('^81[0-9]{14}[0-9]*$');
   
    let mastercard = new RegExp('^5[1-5][0-9]{14}$');
    let mastercard2 = new RegExp('^2[2-7][0-9]{14}$');
   
    let disco1 = new RegExp('^6011[0-9]{12}[0-9]*$');
    let disco2 = new RegExp('^62[24568][0-9]{13}[0-9]*$');
    let disco3 = new RegExp('^6[45][0-9]{14}[0-9]*$');
    
    let diners = new RegExp('^3[0689][0-9]{12}[0-9]*$');
    let jcb =  new RegExp('^35[0-9]{14}[0-9]*$');
   
   
    if (visa.test(cc)) {
    
      return 'VISA';
    }
    if (amex.test(cc)) {
      
      return 'AMEX';
    }
    if (mastercard.test(cc) || mastercard2.test(cc)) {
       

      return 'MASTERCARD';
    }
    if (disco1.test(cc) || disco2.test(cc) || disco3.test(cc)) {
    
      return 'DISCOVER';
    }
    if (diners.test(cc)) {
      return 'DINERS';
    }
    if (jcb.test(cc)) {
   
      return 'JCB';
    }
    if (cup1.test(cc) || cup2.test(cc)) {
      return 'CHINA_UNION_PAY';
    }
    return undefined;
  }
  




