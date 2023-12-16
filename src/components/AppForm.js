import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

const AppForm = (props) => {

  ////////////////GUARDAR O ACTUALIZAR////////////////
  const camposRegistro = { nombre: "", edad:"",genero:""}
  const [objeto, setObjeto] = useState(camposRegistro);
  console.log(objeto);

  const handleSubmit  = async (e)=> { //manejador de submit
    
    try {
        e.preventDefault();
        if(props.idActual === ""){  ////guardar
            if(validarForm()){
                addDoc (collection(db, 'persona'), objeto);
                console.log("se guardo con exito"); 
            }else{
                console.log("no se guardo")
            }
        }else{

            await updateDoc(doc(collection(db, "persona"), props.idActual), objeto);
            alert("Se actualizo...");

            props.setIdActual('');
        }
        setObjeto(camposRegistro);
    } catch (error) {
        console.log("Error en CREAR o Update:", error);
    }
    
  }

  // manejador del estado de cambios

  const handleStatusChange =(e) => {
    const {name, value} = e.target;
    setObjeto({...objeto,[name]:value});
    console.log(objeto,value);
  }
  //validacion
  const validarForm=()=> {
    if(objeto.nombre ===''){
      alert("escriba nombre...");
      return false;
    }
    return true;
  };
  ////////// obtener datos de BD/////
  useEffect(() => {
    if( props.idActual === ""){
        setObjeto({...camposRegistro});
    }else{
        obtenerDatosPorId(props.idActual);
    }
    
  }, [props.idActual]);

  const obtenerDatosPorId = async (xId) =>{
    const objPorId = doc(db, "persona", xId);
    const docPorId = await getDoc(objPorId);
    if (docPorId.exists()) {
        setObjeto(docPorId.data());
    } else {
        console.log("No hay doc....");
    }
  }

  


  return (
    <div style ={{background:"orange",padding:"10px", textAlign:"center"}}>
      <form onSubmit={ handleSubmit }>
      <h1>AppForm.js</h1>

      <input onChange={handleStatusChange} 
      value={objeto.nombre} name='nombre'
       type='text'placeholder='Nombre...'/> <br/>

      <input onChange={handleStatusChange} 
      value={objeto.edad} name='edad'
       type='text'placeholder='Edad...'/> <br/>
    
      
      <select onChange={handleStatusChange} 
        name='genero' value={objeto.genero}> 
        <option value="">Seleccione...</option>
        <option value= "M">Masculino...</option>
        <option value="F">Femenino...</option>
        </select><br/>
        <button>
          {props.idActual === "" ? "GUARDAR": "ACTUALIZAR"}

        </button>
      
      </form>
    </div>
  )
}

export default AppForm