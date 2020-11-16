import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";
import { Router, Link } from "@reach/router";
import { toast } from "react-toastify";


import Alumnos from "./Home/Alumno"

const ProfilePage = () => {

  // Asigna un user para leer el contexto del tema actual.
  // React encontrará el Provider superior más cercano y usará su valor.
  const user = useContext(UserContext);

  const { photoURL, displayName, email } = user;
  console.log(" Usuario ProfilePage : " + displayName + " - " + email);

  const signOut = () => {
    auth.signOut();  
  };

  return (
    <div>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" >EMPRESA</a>
          </div>
          <ul className="nav navbar-nav">
            <li><Link to="alumnos">Calculo de sueldo</Link></li>
            <button className="btn btn-danger" onClick={() => { signOut() }}>
              Salir</button>
          </ul>
        </div>
      </nav>






      <Router>
        
        <Alumnos exact path="alumnos"/>
      </Router>

     
          </div>
  )
};

export default ProfilePage;

