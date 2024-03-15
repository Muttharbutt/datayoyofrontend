import React, { useEffect, useState } from 'react';
import './steptwo.css';
import Header from "../shared/header/Header";
import chain from "../../assets/chain.png"
import Cookies from 'universal-cookie';

function Steptwo() {
  const [selectOptionsN, setSelectOptionsN] = useState([]);
  const [selectOptionsNMinus1, setSelectOptionsNMinus1] = useState([]);

  const [selectValues, setSelectValues] = useState({});

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSelectValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSaveAndContinue = async () => {
    try {
      const cookies = new Cookies();

      const body = selectValues;
      body['report'] = cookies.get('reportId')

      const response = await fetch('http://localhost:8000/reports/mapping/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      // Handle success (e.g., navigate to next step, show success message)
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show error message)
    }
  };

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
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="compte_n" id="compte_n" value={selectValues['compte_n'] || ''} onChange={handleSelectChange} required>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Désignation de compte</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="compte_lib_n" id="compte_lib_n" value={selectValues['compte_lib_n'] || ''} onChange={handleSelectChange} required>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Numéro d’écriture</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="ecriture_numero_n" id="ecriture_numero_n" value={selectValues['ecriture_numero_n'] || ''} onChange={handleSelectChange} required>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div>
          <div style={{marginTop:"3%"}} className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Libellé d’écriture</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="ecriture_lib_n" id="ecriture_lib_n" value={selectValues['ecriture_lib_n'] || ''} onChange={handleSelectChange} required>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Code journal</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="code_journal_n" id="code_journal_n" value={selectValues['code_journal_n'] || ''} onChange={handleSelectChange} required>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Date comptable</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="date_comptable_n" id="date_comptable_n" value={selectValues['date_comptable_n'] || ''} onChange={handleSelectChange} required>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div>
          <h4 style={{marginTop:"5%",marginBottom:"5%"}}>Sous quel format l’information relative au solde comptable est-elle renseignée ?</h4>
          <div className='flexdiv'>
          <div style={{width:"33%"}}>
              <input
                style={{transform: "scale(1.3)"}}
                type='radio'
                name="scenario_n"
                value="debitCredit"
                defaultChecked
              />
              <label style={{marginLeft:"10px", fontWeight:"500"}}> Débit et crédit</label><br/><br/>
              <input
                style={{transform: "scale(1.3)"}}
                type='radio'
                name="scenario_n"
                value="Solde"
              />
              <label style={{marginLeft:"10px", fontWeight:"500"}}> Solde en valeur relative</label><br/><br/>
              <input
                style={{transform: "scale(1.3)"}}
                type='radio'
                name="scenario_n"
                value="MontantSens"
              />
              <label style={{marginLeft:"10px", fontWeight:"500"}}> Solde en valeur absolue</label><br/>
            </div>
<div style={{width:"67%"}} className='flexdiv'>
<div style={{width:"50%"}}>
          <div style={{fontWeight:"500"}}>Débit</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="debit_n" id="debit_n" value={selectValues['debit_n'] || ''} onChange={handleSelectChange} >
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>  <div style={{width:"50%"}}>
          <div style={{fontWeight:"500"}}>Crédit</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="credit_n" id="credit_n" value={selectValues['credit_n'] || ''} onChange={handleSelectChange} >
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
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="etablissement_n" id="etablissement_n" value={selectValues['etablissement_n'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Libellé journal</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="libelle_journal_n" id="libelle_journal_n" value={selectValues['libelle_journal_n'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Date validation</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="date_validation_n" id="date_validation_n" value={selectValues['date_validation_n'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div>
          <div style={{marginTop:"3%"}} className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Numéro auxiliaire</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="numero_auxiliare_n" id="numero_auxiliare_n" value={selectValues['numero_auxiliare_n'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Libellé auxiliaire</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="libelle_auxiliare_n" id="libelle_auxiliare_n" value={selectValues['libelle_auxiliare_n'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Lettrage</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="lettrage_n" id="lettrage_n" value={selectValues['lettrage_n'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
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
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="date_lettrage_n" id="date_lettrage_n" value={selectValues['date_lettrage_n'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Référence pièce</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="reference_piece_n" id="reference_piece_n" value={selectValues['reference_piece_n'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Date pièce</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="date_piece_n" id="date_piece_n" value={selectValues['date_piece_n'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div> <div style={{marginTop:"3%"}} className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Montant en devise</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="montant_devise_n" id="montant_devise_n" value={selectValues['montant_devise_n'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Devise</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="devise_n" id="devise_n" value={selectValues['devise_n'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Utilisateur</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="utilisateur_n" id="utilisateur_n" value={selectValues['utilisateur_n'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
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
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="compte_n_minus_1" id="compte_n_minus_1" value={selectValues['compte_n_minus_1'] || ''} onChange={handleSelectChange} required>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Désignation de compte</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="compte_lib_n_minus_1" id="compte_lib_n_minus_1" value={selectValues['compte_lib_n_minus_1'] || ''} onChange={handleSelectChange} required>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Numéro d’écriture</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="ecriture_numero_n_minus_1" id="ecriture_numero_n_minus_1" value={selectValues['ecriture_numero_n_minus_1'] || ''} onChange={handleSelectChange} required>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div>
          <div style={{marginTop:"3%"}} className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Libellé d’écriture</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="ecriture_lib_n_minus_1" id="ecriture_lib_n_minus_1" value={selectValues['ecriture_lib_n_minus_1'] || ''} onChange={handleSelectChange} required>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Code journal</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="code_journal_n_minus_1" id="code_journal_n_minus_1" value={selectValues['code_journal_n_minus_1'] || ''} onChange={handleSelectChange} required>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Date comptable</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="date_comptable_n_minus_1" id="date_comptable_n_minus_1" value={selectValues['date_comptable_n_minus_1'] || ''} onChange={handleSelectChange} required>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div>
          <h4 style={{marginTop:"5%",marginBottom:"5%"}}>Sous quel format l’information relative au solde comptable est-elle renseignée ?</h4>
          <div className='flexdiv'>
            <div style={{width:"33%"}}>
              <input
                style={{transform: "scale(1.3)"}}
                type='radio'
                name="scenario_n_minus_1"
                value="DC"
                defaultChecked
              />
              <label style={{marginLeft:"10px", fontWeight:"500"}}> Débit et crédit</label><br/><br/>
              <input
                style={{transform: "scale(1.3)"}}
                type='radio'
                name="scenario_n_minus_1"
                value="Solde"
              />
              <label style={{marginLeft:"10px", fontWeight:"500"}}> Solde en valeur relative</label><br/><br/>
              <input
                style={{transform: "scale(1.3)"}}
                type='radio'
                name="scenario_n_minus_1"
                value="MontantSens"
              />
              <label style={{marginLeft:"10px", fontWeight:"500"}}> Solde en valeur absolue</label><br/>
            </div>
<div style={{width:"67%"}} className='flexdiv'>
<div style={{width:"50%"}}>
          <div style={{fontWeight:"500"}}>Débit</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="debit_n_minus_1" id="debit_n_minus_1" value={selectValues['debit_n_minus_1'] || ''} onChange={handleSelectChange} >
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>  <div style={{width:"50%"}}>
          <div style={{fontWeight:"500"}}>Crédit</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="credit_n_minus_1" id="credit_n_minus_1" value={selectValues['credit_n_minus_1'] || ''} onChange={handleSelectChange} >
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
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="etablissement_n_minus_1" id="etablissement_n_minus_1" value={selectValues['etablissement_n_minus_1'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Libellé journal</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="libelle_journal_n_minus_1" id="libelle_journal_n_minus_1" value={selectValues['libelle_journal_n_minus_1'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Date validation</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="date_validation_n_minus_1" id="date_validation_n_minus_1" value={selectValues['date_validation_n_minus_1'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div>
          <div style={{marginTop:"3%"}} className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Numéro auxiliaire</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="numero_auxiliare_n_minus_1" id="numero_auxiliare_n_minus_1" value={selectValues['numero_auxiliare_n_minus_1'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Libellé auxiliaire</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="libelle_auxiliare_n_minus_1" id="libelle_auxiliare_n_minus_1" value={selectValues['libelle_auxiliare_n_minus_1'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Lettrage</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="lettrage_n_minus_1" id="lettrage_n_minus_1" value={selectValues['lettrage_n_minus_1'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
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
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="date_lettrage_n_minus_1" id="date_lettrage_n_minus_1" value={selectValues['date_lettrage_n_minus_1'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Référence de pièce</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="reference_piece_n_minus_1" id="reference_piece_n_minus_1" value={selectValues['reference_piece_n_minus_1'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Date pièce</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="date_piece_n_minus_1" id="date_piece_n_minus_1" value={selectValues['date_piece_n_minus_1'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div>
          <div style={{marginTop:"3%"}} className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Montant en devise</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="montant_devise_n_minus_1" id="montant_devise_n_minus_1" value={selectValues['montant_devise_n_minus_1'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Devise</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="devise_n_minus_1" id="devise_n_minus_1" value={selectValues['devise_n_minus_1'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Utilisateur</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="utilisateur_n_minus_1" id="utilisateur_n_minus_1" value={selectValues['utilisateur_n_minus_1'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div>
          </div>
        </div>
        </div>
        <button style={{marginLeft:"43%",marginTop:"2%"}} className='button2' onClick={handleSaveAndContinue}>Enregistrer et passer à l’étape suivante</button>
      </div>
</>
  );
}

export default Steptwo;
