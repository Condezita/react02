import React, { useEffect } from 'react'
import { db } from '../firebase/firebase'
import { useState } from 'react'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'

const AppForm = (props) => {
  ///////////////////// GUARDAR / ACTUALIZAR /////////////////
  const camposRegistro = { nombre:"", edad:"", genero:"" }
  const [objeto, setObjeto] = useState(camposRegistro);

  const manejarEnvios = async (e) => {
    e.preventDefault();

    try {
      if(props.idActual === "") {
      }else{
        await updateDoc(doc(collection(db, "persona"), props.idActual),objeto);
        props.setIdactual('');

    }
        
        if(validarForm()){
          addDoc(collection(db, 'persona'), objeto);  
          console.log("Se guardo con éxito...");
        
      }else{
        console.log("Actualizando en BD");
      }
      setObjeto(camposRegistro);
    } catch (error) {
      console.error();
    }
  }

  const validarForm = () => {
    if(objeto.nombre === "" || /^\s+/.test(objeto.nombre)){
      alert("Escriba nombre...");
      return false;
    }

    if(objeto.edad === "" || /^\s+/.test(objeto.edad)){
      alert("Escriba edad...");
      return false;
    }

    if(objeto.genero === "" || /^\s+/.test(objeto.genero)){
      alert("Seleccionar genero...");
      return false;
    }
    //
    return true;
  }

  const manejarCambiosEntrada = (e) => {
    //console.log(e.target.value);        //Obtiene valor ingresado
    const {name, value} = e.target;       //name, value recibe de target
    console.log(name, value);             //obtiene name y value
    setObjeto({...objeto, [name]: value});//agrega a objeto name y value
  }
  ///////////obtener datos de base datos por aid //////////////
  useEffect(()=>{
    if(props.idActual === ""){
      setObjeto({...camposRegistro});
    }else{
      obtenerDatosPorId(props.idActual);
    }
  }, [props.idActual]);

  const obtenerDatosPorId = async (xId) => {
      const objPorId = doc(db, "persona", xId)
      const docPorId  = await getDoc(objPorId);
      if(docPorId.exists()){
        setObjeto(docPorId.data());
      }else{
        console.log("No hay documentos")
      }
  }
  





  return (
    <div style={{background:"orange", padding:"10px", textAlign:"center"}}>
      <form onSubmit={manejarEnvios} >
        <h>AppForm.js</h> <br/>
        <input onChange={manejarCambiosEntrada} value={objeto.nombre} 
          name='nombre' type='text' placeholder='Nombres...' /><br/>

        <input onChange={manejarCambiosEntrada} value={objeto.edad} 
          name='edad'   type='text' placeholder='Edad...' /><br/>

        <input onChange={manejarCambiosEntrada} value={objeto.genero} 
          name='genero' type='text' placeholder='Género...' /><br/>

        <button>
          { props.idActual===""? "Guardar": "Actualizar" }
        </button>
      </form>
    </div>
  )
}

export default AppForm