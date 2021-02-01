export const firstStepControls = {
  controls: {

          firstName: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'First Name...'
              },
              value:  '',
              rules:{
                max: 15,
                min: 2
              },
              valide: true
          },
          lastName: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'Last Name...'
              },
              value: '',
              rules:{
                max: 20,
                min: 2
              },
              valide:true
              
          },
          country: {
              elementType: 'select',
              elementConfig: {
                  type: 'text',
                  options:[],
              },
              value:  '',
              rules:{
                max: 50,
                min: 2
              },
              valide: true
              
          },
      city:{
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'City...'
          },
          value:  '',
          rules:{
            max: 15,
            min: 2
          },
          valide: true
      
    },
    address:{
      elementType: 'input',
      elementConfig: {
          type: 'text',
          placeholder: 'Address...'
      },
      value: '',
      rules:{
        max: 100,
        min: 5
      },
      valide: true
  },
  postalCode:{
      elementType: 'input',
      elementConfig: {
          type: 'text',
          placeholder: 'Postal code...'
      },
      value: '',
      rules:{
        max: 4,
        min: 5
      },
      valide: true
  },

  dataForShipping:{
      elementType: 'checkbox',
      elementConfig: {
          type: 'checkbox',
      },
      label:"Use filled data for shipping",
      valide: true,
      value: true,
      rules:{
       
      },
     
    },
    shippingCountry: {
      elementType: 'select',
      elementConfig: {
          type: 'text',
          options:[],
      },
      value:  '',
      rules:{
        max: 50,
        min: 2
      },
      valide: true
      
  },
  shippingCity: {
      elementType: 'input',
      elementConfig: {
          type: 'text',
          placeholder: 'Shipping city...'
      },
      value:  '',
      rules:{
        max: 15,
        min: 2
      },
      valide: true
  },
  shippingAddress: {
      elementType: 'input',
      elementConfig: {
          type: 'text',
          placeholder: 'Shipping address...'
      },
      value: '',
      rules:{
        max: 100,
        min: 5
      },
      valide:true
      
  },
  shippingPostalCode:{
    elementType: 'input',
    elementConfig: {
        type: 'text',
        placeholder: 'Shipping postal code...'
    },
    value: '',
    rules:{
      max: 4,
      min: 5
    },
    valide: true
},

}


}


export const secondStepControls ={
  controls: {
  email: {
    elementType: 'input',
    elementConfig: {
        type: 'text',
        placeholder: 'E:mail...'
    },
    value:  '',
    rules:{
      max: 50,
      min: 2
    },
    valide: true
},
password: {
    elementType: 'input',
    elementConfig: {
        type: 'password',
        placeholder: 'Password...'
    },
    value: '',
    rules:{
      max: 50,
      min: 2
    },
    valide:true
    
},
repeatPassword: {
    elementType: 'input',
    elementConfig: {
        type: 'password',
        placeholder: 'Please repeat password...'
    },
    value:  '',
    rules:{
      max: 50,
      min: 2
    },
    valide: true
    
},
standartPackage:{
  elementType: 'checkbox',
  elementConfig: {
      type: 'radio',
  },
  label:"Standart paskage",
  value: false,
  
 
},

premiumPackage: {
  elementType: 'checkbox',
  elementConfig: {
      type: 'radio',
  },
  label:"Premium package",
  value:  false,  
},
  }
}




export const thirdStepControls={
  controls:{
    card: {
      elementType: 'input',
      elementConfig: {
          type: 'text',
          placeholder: 'xxxx xxxx xxxx xxxx'
      },
      cardType:'',
      value:'',
      valide: true
  },
  cardName: {
      elementType: 'input',
      elementConfig: {
          type: 'text',
          placeholder: 'Full card name...'
      },
      value: '',
      rules:{
        max: 100,
        min: 2
      },
      valide:true
      
  },
  cvc:{
  elementType: 'input',
  elementConfig: {
      type: 'text',
      placeholder: 'CVC...'
  },
  value: '',
  rules:{
    max: 4,
    min: 1
  },
  valide: true
  
  },
  expiryDate:{
    elementType: 'input',
    elementConfig: {
        type: 'date',
        placeholder: 'Expiry date ex: 12/01/2025'
    },
    value:  '',
    rules:{
      max: 10,
      min: 8
    },
    valide: true
    
    },
  }


}

