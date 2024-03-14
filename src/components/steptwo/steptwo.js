import React, { useEffect, useState } from 'react';
import './steptwo.css';
import Header from "../shared/header/Header";
import chain from "../../assets/chain.png"
import Cookies from 'universal-cookie';

function Steptwo() {
  const [selectOptionsN, setSelectOptionsN] = useState([]);
  const [selectOptionsNMinus1, setSelectOptionsNMinus1] = useState([]);

  useEffect(() => {
    const cookies = new Cookies();
    const listStrN = cookies.get('headersN')
    if (listStrN) {
      setSelectOptionsN(listStrN);
    }
    const listStrNMinus1 = cookies.get('headersNMinus1')
    if (listStrNMinus1) {
      setSelectOptionsNMinus1(listStrNMinus1);
    }
  }, []);

  return (

<>
<Header />
      <div className="settingbackground" style={{height: "1280px"}}>
      <div className="loginheader">Nouveau rapport CAC BI</div>
        <div className="settingside">Étape 2 : Rapprochement des champs</div>
        <div className="flexdiv" >
        <div className='boxone' >
        <div className="settingsetponeheader parent" style={{marginBottom:"3%"}}><span className='textspan'> <img style={{width:"40px"}} src={chain}/> Rapprochement des champs de la base de données N
          </span> </div>
          <div className='whiteboxone'><h4 style={{marginBottom:"3%",marginTop:"-1%"}}>Champs obligatoires</h4>
          <div className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Numéro de compte</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Désignation de compte</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Numéro d’écriture</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div>
          <div style={{marginTop:"3%"}} className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Libellé d’écriture</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Code journal</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Date comptable</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div>
          <h4 style={{marginTop:"5%",marginBottom:"5%"}}>Sous quel format l’information relative au solde comptable est-elle renseignée ?</h4>
          <div className='flexdiv'>
<div style={{width:"33%"}}>
<input style={{transform: "scale(1.3)"}} type='checkbox'/>
            <label style={{marginLeft:"10px",fontWeight:"500"}} > Débit et crédit</label><br/><br/>
            <input style={{transform: "scale(1.3)"}} type='checkbox'/>
            <label style={{marginTop:'100px',marginLeft:"10px",fontWeight:"500"}} > Solde en valeur relative</label><br/><br/>
            <input style={{transform: "scale(1.3)"}} type='checkbox'/>
            <label style={{marginTop:'100px',marginLeft:"10px",fontWeight:"500"}} > Solde en valeur absolue</label><br/>
            <br/>
</div>
<div style={{width:"67%"}} className='flexdiv'>
<div style={{width:"50%"}}>
          <div style={{fontWeight:"500"}}>Débit</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>  <div style={{width:"50%"}}>
          <div style={{fontWeight:"500"}}>Crédit</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
</div>
          </div>
          </div>
            <div className='whiteboxone' style={{marginTop:"3%"}}><h4 style={{marginBottom:"3%",marginTop:"-1%"}}>Champs facultatifs</h4>
          <div className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Etablissement</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Libellé journal</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Date validation</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div>
          <div style={{marginTop:"3%"}} className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Numéro auxiliaire</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Libellé auxiliaire</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Lettrage</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div>
          <h4 style={{marginBottom:"5%"}}></h4>
          <div className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Date lettrage</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Référence pièce</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Date pièce</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div> <div style={{marginTop:"3%"}} className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Montant en devise</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Devise</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div>
          </div>
        </div>
        <div className='boxone'>
        <div className="settingsetponeheader parent" style={{marginBottom:"3%"}}><span className='textspan'> <img style={{width:"40px"}} src={chain}/> Rapprochement des champs de la base de données N-1
          </span> </div>
          <div className='whiteboxone'><h4 style={{marginBottom:"3%",marginTop:"-1%"}}>Champs obligatoires</h4>
          <div className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Numéro de compte</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Désignation de compte</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Numéro d’écriture</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div>
          <div style={{marginTop:"3%"}} className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Libellé d’écriture</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Code journal</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Date comptable</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div>
          <h4 style={{marginTop:"5%",marginBottom:"5%"}}>Sous quel format l’information relative au solde comptable est-elle renseignée ?</h4>
          <div className='flexdiv'>
<div style={{width:"33%"}}>
<input style={{transform: "scale(1.3)"}} type='checkbox'/>
            <label style={{marginLeft:"10px",fontWeight:"500"}} > Débit et crédit</label><br/><br/>
            <input style={{transform: "scale(1.3)"}} type='checkbox'/>
            <label style={{marginTop:'100px',marginLeft:"10px",fontWeight:"500"}} > Solde en valeur relative</label><br/><br/>
            <input style={{transform: "scale(1.3)"}} type='checkbox'/>
            <label style={{marginTop:'100px',marginLeft:"10px",fontWeight:"500"}} > Solde en valeur absolue</label><br/>
            <br/>
</div>
<div style={{width:"67%"}} className='flexdiv'>
<div style={{width:"50%"}}>
          <div style={{fontWeight:"500"}}>Débit</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>  <div style={{width:"50%"}}>
          <div style={{fontWeight:"500"}}>Crédit</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
</div></div></div>
<div className='whiteboxone' style={{marginTop:"3%"}}><h4 style={{marginBottom:"3%",marginTop:"-1%"}}>Champs facultatifs</h4>
          <div className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Etablissement</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Libellé journal</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Date validation</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div>
          <div style={{marginTop:"3%"}} className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Numéro auxiliaire</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Libellé auxiliaire</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Lettrage</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div>
          <h4 style={{marginBottom:"5%"}}></h4>
          <div className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Date lettrage</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Référence de pièce</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Date pièce</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div>
          <div style={{marginTop:"3%"}} className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Montnat en devise</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Devise</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div>
          </div>
        </div>
        </div>
        <button style={{marginLeft:"43%",marginTop:"2%"}} className='button2'>Enregistrer et passer à l’étape suivante</button>
      </div>
</>
  );
}

export default Steptwo;
