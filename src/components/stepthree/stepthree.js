import React, { useEffect, useState } from 'react';
import './stepthree.css';
import Header from "../shared/header/Header";
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

function Stepthree() {
  const [selectOptionsN, setSelectOptionsN] = useState([]);
  const [selectOptionsNMinus1, setSelectOptionsNMinus1] = useState([]);

  const [ANouveauN, setANouveauN] = useState('');
  const [ANouveauNMinus1, setANouveauNMinus1] = useState('');

  const handleSelectChangeN = (e) => {
    setANouveauN(e.target.value);
  };
  const handleSelectChangeNMinus1 = (e) => {
    setANouveauNMinus1(e.target.value);
  };

  const navigate = useNavigate();

  const navigateToTableOne = () => {
    navigate('/tableone');
  };

  useEffect(() => {
    const cookies = new Cookies();
    const listStrN = cookies.get('aNouveauN')
    if (listStrN) {
      setSelectOptionsN(listStrN);
      setANouveauN(listStrN[0]);
    }
    const listStrNMinus1 = cookies.get('aNouveauNMinus1')
    if (listStrNMinus1) {
      setSelectOptionsNMinus1(listStrNMinus1);
    setANouveauNMinus1(listStrNMinus1[0]);
    }
  }, []);


  const handleSaveAndContinue = async () => {


    try {
      const cookies = new Cookies();
      const csrftoken = cookies.get('csrftoken');
      const mappingId = cookies.get('mappingId'); // Fetching the ID from cookies

      if (!mappingId) {
        console.error('Mapping ID is missing.');
        return; // Exiting if the ID is not found
      }

      const body = {}
      body['a_nouveau_n'] = true
      body['code_journal_a_nouveau_n'] = ANouveauN
      body['a_nouveau_n_minus_1'] = true
      body['code_journal_a_nouveau_n_minus_1'] = ANouveauNMinus1

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/reports/mapping/${mappingId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(body),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);

      navigateToTableOne();
    } catch (error) {
      console.error('Error:', error);
      // Handle error (show error message)
    }
  };

  return (

    <>
      <Header />
      <div className="settingbackground" style={{height: "1280px"}}>
        <div className="loginheader">Nouveau rapport CAC BI</div>
        <div className="settingside">Étape 2 : Rapprochement des champs</div>
        <div className="teststeting">Importation des à nouveaux</div>
        <div className='centerbox'>
          <p style={{marginBottom:"5%"}}>Ci-dessous il convient de sélectionner parmi les codes journaux importés, celui qui correspond aux reports à nouveaux dans la base N et dans la base N-1.</p>
          <div className='styletext'>Code journal des AN - N</div>
          <select
            style={{width:"40%", height:"40px", borderRadius:"20px", backgroundColor:"#EDEEFB", color:"#1054FB", border:"none", paddingLeft:"20px", marginTop:"2%"}}
            value={ANouveauN}
            onChange={handleSelectChangeN}
          >
            {selectOptionsN.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          <div className='styletext'>Code journal des AN - N-1</div>
          <select
            style={{width:"40%", height:"40px", borderRadius:"20px", backgroundColor:"#EDEEFB", color:"#1054FB", border:"none", paddingLeft:"20px", marginTop:"2%"}}
            value={ANouveauNMinus1}
            onChange={handleSelectChangeNMinus1}
          >
            {selectOptionsNMinus1.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <button style={{marginLeft:"43%", marginTop:"2%"}} className='button2' onClick={handleSaveAndContinue}>Enregistrer et passer à l’étape suivante</button>
      </div>
    </>
  );
}

export default Stepthree;
