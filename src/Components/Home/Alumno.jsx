import React, { useEffect, useState } from "react";
import AlumnosForm from "./AlumnosForm";

import { firestore } from "../../firebase";
import { toast } from "react-toastify";

const Alumnos = () => {
  const [Alumnos, setAlumnos] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const getAlumnos = async () => {
    firestore.collection("Alumnos").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setAlumnos(docs);
    });
  };

  const onDeleteAlumno = async (id) => {
    if (window.confirm("Desea eliminar el registro?")) {
      await firestore.collection("Alumnos").doc(id).delete();
      toast("Se elimino el registro", {
        type: "error",
        //autoClose: 2000
      });
    }
  };

  useEffect(() => {
    getAlumnos();
  }, []);

  const addOrEditAlumno = async (AlumnoObject) => {
    try {
      var valor;
      const descuentoisss = 0.0525;
      const descuentoafp = 0.0688;
      const descuentorenta = 0.1; 


    if (currentId === "") {
        if(AlumnoObject.horas <= 160){
          AlumnoObject.sueldob = AlumnoObject.horas * 9.75;
        }
        if (AlumnoObject.horas > 160 &&  AlumnoObject.horas <= 200){
          valor = AlumnoObject.horas - 160;
           AlumnoObject.sueldob = (160 * 9.75) + (valor * 11.50);
        }
        if (AlumnoObject.horas > 200 && AlumnoObject.horas <=250){
          valor = AlumnoObject.horas - 200;
          AlumnoObject.sueldob = (160 * 9.75) + (40 * 11.50) +(valor * 12.50);
        }

        AlumnoObject.isss = AlumnoObject.sueldob * descuentoisss;
        AlumnoObject.afp = AlumnoObject.sueldob * descuentoafp;
        AlumnoObject.renta = AlumnoObject.sueldob * descuentorenta;
        AlumnoObject.sueldol = AlumnoObject.sueldob - (AlumnoObject.isss + AlumnoObject.afp +AlumnoObject.renta);


        await firestore.collection("Alumnos").doc().set(AlumnoObject);
        toast("Registro agregado", {
          type: "success",
        });
      } 
    else {
        await firestore.collection("Alumnos").doc(currentId).update(AlumnoObject);
        toast("Se actualizo el registro", {
          type: "info",
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>     
      <div className="col-md-4 p-2 ">
        <br></br>
        
       
        <AlumnosForm {...{ addOrEditAlumno, currentId, Alumnos }} />
      </div>

      <div className="col-md-12 p-2">
        <div class="container">
        <br></br>
        <br></br>
        
          
          <table class="border-collapse border-2 border-gray-500">
            <thead>
              <tr>
                <th class="w-1/4 px-4 py-2">Nombres</th>
                <th class="w-1/4 px-4 py-2">Apellidos</th>
                <th class="w-1/4 px-4 py-2">Codigo</th>
                <th class="w-1/4 px-4 py-2">Horas trabajadas</th>
                <th class="w-1/4 px-4 py-2">Sueldo Base</th>
                <th class="w-1/4 px-4 py-2">Descuento ISSS</th>
                <th class="w-1/4 px-4 py-2">Descuento AFP</th>
                <th class="w-1/4 px-4 py-2">Descuento RENTA</th>
                <th class="w-1/4 px-4 py-2">Sueldo Liquido</th>
                <th class="w-1/4 px-4 py-2">Aciones</th>
              </tr>
            </thead>
            <tbody>
              {Alumnos.map((Alumno) => (
                <tr  class="bg-blue-100" key={Alumno.id}>
                  <td class="border px-4 py-2">{Alumno.nombre}</td>
                  <td class="border px-4 py-2">{Alumno.apellido}</td>
                  <td class="border px-4 py-2">{Alumno.codigo}</td>
                  <td class="border px-4 py-2">{Alumno.horas}</td>
                  <td class="border px-4 py-2">{Alumno.sueldob}</td>
                  <td class="border px-4 py-2">{Alumno.isss}</td>
                  <td class="border px-4 py-2">{Alumno.afp}</td>
                  <td class="border px-4 py-2">{Alumno.renta}</td>
                  <td class="border px-4 py-2">{Alumno.sueldol}</td>
                  
                  
                  <td class="border px-4 py-2">
                    <button className="btn btn-primary"  onClick={() => setCurrentId(Alumno.id)}>Editar</button>
                    &nbsp;
                    &nbsp;
                    <button className="btn btn-danger" onClick={() => onDeleteAlumno(Alumno.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Alumnos;

