import { createContext, useState } from "react"

const initialValues = {
    products: null,
    productsLength:0
}

const MyContext = createContext({})

const MyProvider = ({children}:any) => {
    const [state, setState] = useState<any>(initialValues)

    return(
        <MyContext.Provider value={{state,setState}}>
            {children}
        </MyContext.Provider>
    )
}

export{MyContext, MyProvider}

