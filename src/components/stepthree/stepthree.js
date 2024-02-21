import React, { useState } from 'react';
import './stepthree.css';
import Header from "../shared/header/Header";
import chain from "../../assets/chain.png"
function Stepthree() {
  return (

<>
<Header />
      <div className="settingbackground" style={{height: "1280px"}}>
      <div className="loginheader">Nouveau rapport CAC BI</div>
        <div className="settingside">Étape 2 : Rapprochement des champs</div>
       <div className="teststeting">Importation des à nouveaux</div>
       <div className='centerbox'>
<p  style={{marginBottom:"4%"}}>Lors de l’étape de chargement des fichiers, il a été indiqué que la base de données N ne contient pas les reports à nouveaux.</p>
<p style={{marginBottom:"5%"}}>Ci-dessous il convient de sélectionner parmi les codes journaux importés, celui qui correspond aux reports à nouveaux dans la base N.</p>
<div className='styletext'>Code journal des AN - N</div>
<select style={{width:"40%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%"}} >
  <option label="Volvo">Volvo (Latin for "I roll")</option>
  <option label="Saab">Saab (Swedish Aeroplane AB)</option>
  <option label="Mercedes">Mercedes (Mercedes-Benz)</option>
  <option label="Audi">Audi (Auto Union Deutschland Ingolstadt)</option>
</select>
       </div>
        <button style={{marginLeft:"43%",marginTop:"2%"}} className='button2'>Enregistrer et passer à l’étape suivante</button>
      </div>  
</>
  );
}

export default Stepthree;
