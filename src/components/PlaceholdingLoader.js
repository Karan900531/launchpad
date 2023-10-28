import React from 'react'

const PlaceholdingLoader = (props) => {
  const [valueone, setValueOne] = React.useState([30]);



   
    return (
        <div className={props.parentclassname}>
          <div className={props.subclassnames?props.subclassnames:""}>
        <div className='content'>
        <div className={props.classnames}>
        </div>
        </div>
        </div>
        </div>
                
    
    
    
      
       
    )
}

export default PlaceholdingLoader
