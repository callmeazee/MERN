const Form = ({ children, onValue }) => {
  
  const getValue = (e) => {
    e.preventDefault()
    const form = e.target
    const inputs = form.getElementsByTagName("input")
    const formData = {}
    for (let input of inputs) {
  

      const key = input.name 
      const value = input.value
      formData[key] = value
  
}
    onValue(formData)
}


  return (
    <form onSubmit={getValue}>
    {children}
    </form>
  )
};

export default Form;
