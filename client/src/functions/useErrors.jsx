import { useEffect, useRef, useState } from "react"

function useErrors() {
    const [errors, setErrors] = useState([])
    const errorBox = useRef(null)
    useEffect(() => {
        errorBox.current = document.getElementById(`wikiErrorBox${element.id}`)
      }, [editToggle, deleteToggle])

    return [setErrors, errorBox]
}
    