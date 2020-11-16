import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase";
import { toast } from "react-toastify";

const AlumnosForm = (props) => {

  const initialStateValues = {
    nombre: "",
    apellido: "",
    codigo: "",
    horas:"",
    sueldob :"",
    sueldol:"",
    isss:"",
    afp:"",
    renta:"",

  };

  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  function validaNumeros(){
    var inputhoras = document.getElementById('horas');
    var valor = inputhoras.value;
    for (let i= 0; i< valor.length; i++) {
      var code = valor.charCodeAt(i);
      if(code<48 || code>57){
        inputhoras.value = "";
        toast("Solo puedes agregar numeros enteros", {
          type: "warning",
        });
        return;
      }
      
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    props.addOrEditAlumno(values);
    setValues({ ...initialStateValues });
  };

  const getAlumnoById = async (id) => {
    const doc = await firestore.collection("Alumnos").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      //https://stackoverflow.com/questions/56059127/how-to-fix-this-error-function-collectionreference-doc
      if (props.currentId !== null && props.currentId !== undefined) {
        getAlumnoById(props.currentId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId]);

  return (
    
    <div class="text-black-700 text-aling bg-blue-400 p-2">
    <form onSubmit={handleSubmit} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
       <h3>Agregar datos del empleado</h3>
       <br></br>
      <div className="form-group">
        <div className=" bg-light">
          <i className="material-icons">Nombres:</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese nombre"
          required
          value={values.nombre}
          name="nombre"
          onChange={handleInputChange}
    
        />
      </div>
      <div className="form-group ">
        <div className="bg-light">
          <i className="material-icons">Apellidos:</i>
        </div>
        <input
          type="text"
          value={values.apellido}
          name="apellido"
          placeholder="Ingrese apellido"
          required
          className="form-control"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group ">
        <div className=" bg-light">
          <i className="material-icons">Codigo:</i>
        </div>
        <input
          type="text"
          value={values.codigo}
          name="codigo"
          placeholder="Ingrese codigo"
          required
          className="form-control"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group ">
        <div className=" bg-light">
          <i className="material-icons">Horas trabajadas:</i>
        </div>
        <input
          type="text"
          value={values.horas}
          name="horas"
          placeholder="Horas trabajadas"
          required
          className="form-control"
        
          id = "horas"
          onKeyDown = {validaNumeros}
          onChange={handleInputChange}
        />
      </div>
      
      <button className="btn btn-primary btn-block" >
        {props.currentId === "" ? "Ingresar" : "Actualizar"}
      </button>
    </form>
    </div>
  );
};

export default AlumnosForm;
