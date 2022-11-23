import { useState } from "react"

export default function useErrors() {
    const [errorObject, setErrorObject] = useState({className:'errorBox fade', list:[]})
    
    function setErrors(errors) {
      setErrorObject({className:'errorBox', list:errors})
      // using the spread operator to clone the old errorObject {...errorObject} actually causes double rendering
      // in the component using this state value. Explicit setting is required to avoid reassigning values.
      setTimeout(() => setErrorObject({className:'errorBox fade', list:errors}), 2000)
    }

    return [errorObject, setErrors]
}
    