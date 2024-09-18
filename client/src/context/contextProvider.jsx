import React , {useState} from 'react'
import { InfostructureContext } from './context'

const ContextProvider = ({children}) => {

    const [cartCount , setCartCount] = useState(0);
    const [isLogged , setLoggedIn] = useState(false);
    
    const ContextValues = {
      cartCount,
      setCartCount,
      isLogged ,
      setLoggedIn
    }

  return (
   <InfostructureContext.Provider value={ContextValues}>
    {children}
   </InfostructureContext.Provider>
  )
}

export default ContextProvider