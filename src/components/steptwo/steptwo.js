import React, { useEffect, useState } from 'react';
import './steptwo.css';
import Header from "../shared/header/Header";
import chain from "../../assets/chain.png"
import Cookies from 'universal-cookie';

function Steptwo() {
  const [selectOptionsN, setSelectOptionsN] = useState([]);
  const [selectOptionsNMinus1, setSelectOptionsNMinus1] = useState([]);

  const [mapping, setMapping] = useState({});

  const [scenarioN, setScenarioN] = useState("DC");
  const [scenarioNMinus1, setScenarioNMinus1] = useState("DC");

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setMapping(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSaveAndContinue = async () => {
    try {
      const cookies = new Cookies();

      const body = mapping;
      body['report'] = cookies.get('reportId')
      body['scenario_n'] = scenarioN
      body['scenario_n_minus_1'] = scenarioNMinus1
      console.log(body)

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
      console.log("Success:", data);
      cookies.set('mappingId', data.id, { path: '/' });

      // cookies.set('codeJournalN', data.headers_n_minus_1, { path: '/' });
      // cookies.set('codeJournalNMinus1', data.headers_n, { path: '/' });

      window.location.href = "http://localhost:3000/stepthree";
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
      console.log(listStrN[0])
      setMapping(prevValues => ({
        ...prevValues,
        compte_n: listStrN[0],
        compte_lib_n: listStrN[0],
        ecriture_numero_n: listStrN[0],
        ecriture_lib_n: listStrN[0],
        code_journal_n: listStrN[0],
        date_comptable_n: listStrN[0],
      }));
    }
    const listStrNMinus1 = cookies.get('headersNMinus1')
    if (listStrNMinus1) {
      setSelectOptionsNMinus1(listStrNMinus1);
      console.log(listStrNMinus1[0])
      setMapping(prevValues => ({
        ...prevValues,
        compte_n_minus_1: listStrNMinus1[0],
        compte_lib_n_minus_1: listStrNMinus1[0],
        ecriture_numero_n_minus_1: listStrNMinus1[0],
        ecriture_lib_n_minus_1: listStrNMinus1[0],
        code_journal_n_minus_1: listStrNMinus1[0],
        date_comptable_n_minus_1: listStrNMinus1[0],
      }));
    }
    console.log('mapping')
    console.log(mapping)
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
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="compte_n" id="compte_n" value={mapping['compte_n'] || ''} onChange={handleSelectChange} required>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Désignation de compte</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="compte_lib_n" id="compte_lib_n" value={mapping['compte_lib_n'] || ''} onChange={handleSelectChange} required>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Numéro d’écriture</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="ecriture_numero_n" id="ecriture_numero_n" value={mapping['ecriture_numero_n'] || ''} onChange={handleSelectChange} required>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div>
          <div style={{marginTop:"3%"}} className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Libellé d’écriture</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="ecriture_lib_n" id="ecriture_lib_n" value={mapping['ecriture_lib_n'] || ''} onChange={handleSelectChange} required>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Code journal</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="code_journal_n" id="code_journal_n" value={mapping['code_journal_n'] || ''} onChange={handleSelectChange} required>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Date comptable</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="date_comptable_n" id="date_comptable_n" value={mapping['date_comptable_n'] || ''} onChange={handleSelectChange} required>
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
                value="DC"
                checked={scenarioN === "DC"}
                onChange={() => setScenarioN("DC")}
              />
              <label style={{marginLeft:"10px", fontWeight:"500"}}> Débit et crédit</label><br/><br/>
              <input
                style={{transform: "scale(1.3)"}}
                type='radio'
                name="scenario_n"
                value="Solde"
                checked={scenarioN === "Solde"}
                onChange={() => setScenarioN("Solde")}
              />
              <label style={{marginLeft:"10px", fontWeight:"500"}}> Solde en valeur relative</label><br/><br/>
              <input
                style={{transform: "scale(1.3)"}}
                type='radio'
                name="scenario_n"
                value="MontantSens"
                checked={scenarioN === "MontantSens"}
                onChange={() => setScenarioN("MontantSens")}
              />
              <label style={{marginLeft:"10px", fontWeight:"500"}}> Solde en valeur absolue</label><br/>
            </div>
{
  scenarioN === "DC" && (
    <div style={{width: "67%"}} className='flexdiv'>
      {/* Debit Select */}
      <div style={{width: "50%"}}>
        <div style={{fontWeight: "500"}}>Débit</div>
        <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="debit_n" id="debit_n" value={mapping['debit_n'] || ''} onChange={handleSelectChange}>
            <option value=""></option>
          {selectOptionsN.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
      {/* Credit Select */}
      <div style={{width: "50%"}}>
        <div style={{fontWeight: "500"}}>Crédit</div>
        <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="credit_n" id="credit_n" value={mapping['credit_n'] || ''} onChange={handleSelectChange}>
            <option value=""></option>
          {selectOptionsN.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
{
  scenarioN === "Solde" && (
    <div style={{width: "67%"}} className='flexdiv'>
      {/* Debit Select */}
      <div style={{width: "50%"}}>
        <div style={{fontWeight: "500"}}>Solde</div>
        <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="solde_n" id="solde_n" value={mapping['solde_n'] || ''} onChange={handleSelectChange}>
            <option value=""></option>
          {selectOptionsN.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
{
  scenarioN === "MontantSens" && (
    <div style={{width: "67%"}} className='flexdiv'>
      {/* Debit Select */}
      <div style={{width: "50%"}}>
        <div style={{fontWeight: "500"}}>Montant</div>
        <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="montant_n" id="montant_n" value={mapping['montant_n'] || ''} onChange={handleSelectChange}>
            <option value=""></option>
          {selectOptionsN.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
      {/* Credit Select */}
      <div style={{width: "50%"}}>
        <div style={{fontWeight: "500"}}>Sens</div>
        <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="sens_n" id="sens_n" value={mapping['sens_n'] || ''} onChange={handleSelectChange}>
            <option value=""></option>
          {selectOptionsN.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
          </div>
          </div>
            <div className='whiteboxone' style={{marginTop:"3%"}}><h4 style={{marginBottom:"3%",marginTop:"-1%"}}>Champs facultatifs</h4>
          <div className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Etablissement</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="etablissement_n" id="etablissement_n" value={mapping['etablissement_n'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Libellé journal</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="libelle_journal_n" id="libelle_journal_n" value={mapping['libelle_journal_n'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Date validation</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="date_validation_n" id="date_validation_n" value={mapping['date_validation_n'] || ''} onChange={handleSelectChange} >
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
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="numero_auxiliare_n" id="numero_auxiliare_n" value={mapping['numero_auxiliare_n'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Libellé auxiliaire</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="libelle_auxiliare_n" id="libelle_auxiliare_n" value={mapping['libelle_auxiliare_n'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Lettrage</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="lettrage_n" id="lettrage_n" value={mapping['lettrage_n'] || ''} onChange={handleSelectChange} >
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
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="date_lettrage_n" id="date_lettrage_n" value={mapping['date_lettrage_n'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Référence pièce</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="reference_piece_n" id="reference_piece_n" value={mapping['reference_piece_n'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Date pièce</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="date_piece_n" id="date_piece_n" value={mapping['date_piece_n'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div> <div style={{marginTop:"3%"}} className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Montant en devise</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="montant_devise_n" id="montant_devise_n" value={mapping['montant_devise_n'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Devise</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="devise_n" id="devise_n" value={mapping['devise_n'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsN.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Utilisateur</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="utilisateur_n" id="utilisateur_n" value={mapping['utilisateur_n'] || ''} onChange={handleSelectChange} >
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
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="compte_n_minus_1" id="compte_n_minus_1" value={mapping['compte_n_minus_1'] || ''} onChange={handleSelectChange} required>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Désignation de compte</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="compte_lib_n_minus_1" id="compte_lib_n_minus_1" value={mapping['compte_lib_n_minus_1'] || ''} onChange={handleSelectChange} required>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Numéro d’écriture</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="ecriture_numero_n_minus_1" id="ecriture_numero_n_minus_1" value={mapping['ecriture_numero_n_minus_1'] || ''} onChange={handleSelectChange} required>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          </div>
          <div style={{marginTop:"3%"}} className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Libellé d’écriture</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="ecriture_lib_n_minus_1" id="ecriture_lib_n_minus_1" value={mapping['ecriture_lib_n_minus_1'] || ''} onChange={handleSelectChange} required>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Code journal</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="code_journal_n_minus_1" id="code_journal_n_minus_1" value={mapping['code_journal_n_minus_1'] || ''} onChange={handleSelectChange} required>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Date comptable</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="date_comptable_n_minus_1" id="date_comptable_n_minus_1" value={mapping['date_comptable_n_minus_1'] || ''} onChange={handleSelectChange} required>
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
                checked={scenarioNMinus1 === "DC"}
                onChange={() => setScenarioNMinus1("DC")}
              />
              <label style={{marginLeft:"10px", fontWeight:"500"}}> Débit et crédit</label><br/><br/>
              <input
                style={{transform: "scale(1.3)"}}
                type='radio'
                name="scenario_n_minus_1"
                value="Solde"
                checked={scenarioNMinus1 === "Solde"}
                onChange={() => setScenarioNMinus1("Solde")}
              />
              <label style={{marginLeft:"10px", fontWeight:"500"}}> Solde en valeur relative</label><br/><br/>
              <input
                style={{transform: "scale(1.3)"}}
                type='radio'
                name="scenario_n_minus_1"
                value="MontantSens"
                checked={scenarioNMinus1 === "MontantSens"}
                onChange={() => setScenarioNMinus1("MontantSens")}
              />
              <label style={{marginLeft:"10px", fontWeight:"500"}}> Solde en valeur absolue</label><br/>
            </div>
{
  scenarioNMinus1 === "DC" && (
    <div style={{width: "67%"}} className='flexdiv'>
      {/* Debit Select */}
      <div style={{width: "50%"}}>
        <div style={{fontWeight: "500"}}>Débit</div>
        <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="debit_n_minus_1" id="debit_n_minus_1" value={mapping['debit_n_minus_1'] || ''} onChange={handleSelectChange}>
            <option value=""></option>
          {selectOptionsN.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
      {/* Credit Select */}
      <div style={{width: "50%"}}>
        <div style={{fontWeight: "500"}}>Crédit</div>
        <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="credit_n_minus_1" id="credit_n_minus_1" value={mapping['credit_n_minus_1'] || ''} onChange={handleSelectChange}>
            <option value=""></option>
          {selectOptionsN.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
{
  scenarioNMinus1 === "Solde" && (
    <div style={{width: "67%"}} className='flexdiv'>
      {/* Debit Select */}
      <div style={{width: "50%"}}>
        <div style={{fontWeight: "500"}}>Solde</div>
        <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="solde_n_minus_1" id="solde_n_minus_1" value={mapping['solde_n_minus_1'] || ''} onChange={handleSelectChange}>
            <option value=""></option>
          {selectOptionsN.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
{
  scenarioNMinus1 === "MontantSens" && (
    <div style={{width: "67%"}} className='flexdiv'>
      {/* Debit Select */}
      <div style={{width: "50%"}}>
        <div style={{fontWeight: "500"}}>Montant</div>
        <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="montant_n_minus_1" id="montant_n_minus_1" value={mapping['montant_n_minus_1'] || ''} onChange={handleSelectChange}>
            <option value=""></option>
          {selectOptionsN.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
      {/* Credit Select */}
      <div style={{width: "50%"}}>
        <div style={{fontWeight: "500"}}>Sens</div>
        <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="sens_n_minus_1" id="sens_n_minus_1" value={mapping['sens_n_minus_1'] || ''} onChange={handleSelectChange}>
            <option value=""></option>
          {selectOptionsN.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
</div>
</div>
<div className='whiteboxone' style={{marginTop:"3%"}}><h4 style={{marginBottom:"3%",marginTop:"-1%"}}>Champs facultatifs</h4>
          <div className='flexdiv'>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Etablissement</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="etablissement_n_minus_1" id="etablissement_n_minus_1" value={mapping['etablissement_n_minus_1'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Libellé journal</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="libelle_journal_n_minus_1" id="libelle_journal_n_minus_1" value={mapping['libelle_journal_n_minus_1'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Date validation</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="date_validation_n_minus_1" id="date_validation_n_minus_1" value={mapping['date_validation_n_minus_1'] || ''} onChange={handleSelectChange} >
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
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="numero_auxiliare_n_minus_1" id="numero_auxiliare_n_minus_1" value={mapping['numero_auxiliare_n_minus_1'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Libellé auxiliaire</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="libelle_auxiliare_n_minus_1" id="libelle_auxiliare_n_minus_1" value={mapping['libelle_auxiliare_n_minus_1'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Lettrage</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="lettrage_n_minus_1" id="lettrage_n_minus_1" value={mapping['lettrage_n_minus_1'] || ''} onChange={handleSelectChange} >
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
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="date_lettrage_n_minus_1" id="date_lettrage_n_minus_1" value={mapping['date_lettrage_n_minus_1'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Référence de pièce</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="reference_piece_n_minus_1" id="reference_piece_n_minus_1" value={mapping['reference_piece_n_minus_1'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Date pièce</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="date_piece_n_minus_1" id="date_piece_n_minus_1" value={mapping['date_piece_n_minus_1'] || ''} onChange={handleSelectChange} >
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
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="montant_devise_n_minus_1" id="montant_devise_n_minus_1" value={mapping['montant_devise_n_minus_1'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Devise</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="devise_n_minus_1" id="devise_n_minus_1" value={mapping['devise_n_minus_1'] || ''} onChange={handleSelectChange} >
          <option value=""></option>
    {selectOptionsNMinus1.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
</select>
          </div>
          <div style={{width:"33%"}}>
          <div style={{fontWeight:"500"}}>Utilisateur</div>
          <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} name="utilisateur_n_minus_1" id="utilisateur_n_minus_1" value={mapping['utilisateur_n_minus_1'] || ''} onChange={handleSelectChange} >
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
