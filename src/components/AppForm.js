import React from 'react'

const AppForm = () => {
  return (
    <div style={{background: "orange" , padding: "orange",padding:"10px" ,textAlign :"center"}}>
      <h>AppForm.js</h><br/>
      <input placeholder='Nombres...'/><br/>
      <input placeholder='Edad...'/><br/>
      <input placeholder='Genero...'/><br/>
      <button>Guardar</button>
    </div>
  )
}

export default AppForm;