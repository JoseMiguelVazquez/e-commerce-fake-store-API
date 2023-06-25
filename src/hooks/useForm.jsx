import { useState } from 'react'

function useForm (callback, defaults) {
  // Estado unico para guardar los datos de mi formulario en un objeto
  const [input, setInput] = useState(defaults)

  // Funcion que se ejecutara cuando se envie el formulario
  const handleSubmit = (event) => {
    event.preventDefault()
    callback(input)
  }

  // Funcion que se ejecuta cuando se escriba en los inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setInput({ ...input, [name]: value })
  }

  const resetForm = () => {
    setInput(defaults)
  }

  return {
    input,
    handleInputChange,
    handleSubmit,
    resetForm
  }
}

export default useForm
