import React, { useState } from 'react';
import './Stepone.css';
import question from "../../assets/question.png"
import Header from "../shared/header/Header";
import Cookies from 'universal-cookie';

function Stepone() {

  const [fileN, setFileN] = useState(null); // Use this state to store the file object for N
  const [fileSelectedN, setFileSelectedN] = useState(false);
  const [selectedFileNameN, setSelectedFileNameN] = useState('');

  const [fileNMinus1, setFileNMinus1] = useState(null); // Use this state to store the file object for N-1
  const [fileSelectedNMinus1, setFileSelectedNMinus1] = useState(false);
  const [selectedFileNameNMinus1, setSelectedFileNameNMinus1] = useState('');

  const handleFileChangeN = (event) => {
    if (event.target.files[0]) {
      setFileN(event.target.files[0]); // Store the file object directly
      setFileSelectedN(true);
      setSelectedFileNameN(event.target.files[0].name); // If you still need to store the file name
    } else {
      setFileSelectedN(false);
      setSelectedFileNameN('');
    }
  };

  const handleFileChangeNMinus1 = (event) => {
    if (event.target.files[0]) {
      setFileNMinus1(event.target.files[0]); // Store the file object directly
      setFileSelectedNMinus1(true);
      setSelectedFileNameNMinus1(event.target.files[0].name); // If you still need to store the file name
    } else {
      setFileSelectedNMinus1(false);
      setSelectedFileNameNMinus1('');
    }
  };

  const handleSaveAndNextClick = async () => {
    console.log("save and next")
    if (!fileSelectedN || !fileSelectedNMinus1) {
      alert("Please select both files before proceeding.");
      return;
    }

    const formData = new FormData();
    formData.append("file_1", fileN);
    formData.append("file_2", fileNMinus1);

    const cookies = new Cookies();
    formData.append("creator", cookies.get('id'));
    formData.append("account_legal_name", cookies.get("clientName"));
    formData.append("start_date_1", cookies.get("dateOpenNMinus1"));
    formData.append("end_date_1", cookies.get("dateCloseNMinus1"));
    formData.append("start_date_2", cookies.get("dateOpenN"));
    formData.append("end_date_2", cookies.get("dateCloseN"));

    try {
      const response = await fetch("http://localhost:8000/reports/reports/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        cookies.set('reportId', data.id, { path: '/' });

        window.location.href = "http://localhost:3000/steptwo";
      } else {
        console.error("Upload failed:", response.statusText);
        // Handle failure
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (

<>
<Header />
      <div className="settingbackground">
        <div className="loginheader">Bienvenue chez Datayoyo</div>
        <div className="settingside">Étape 1 : Importation des bases</div>
        <div className="flexdiv">
          <div className="box1">
          <div className="settingsetponeheader parent"><span className='textspan'>1.Importation des données comptables
          <img style={{width:"40px"}} src={question}/>  </span>

    <div className="logoutdiv1">
      <div className='textsetting'>   <img style={{width:"40px"}} src={question}/>  Informations importante : importation des données comptables.</div>
 <ul className='textsetting1'>
  <li className='paddingboot'>Les formats de fichiers acceptés sont les suivants : .csv, .txt, .xlsx.</li>
  <li>Par convention de nommage, “N” concerne l’exercice audité en cours et “N-1” l’exercice précédent</li>
 </ul>
</div>

             </div>

          <div className='divinsidestepone'>
            <h3>Exercice N</h3>
           <div className='greybox'> Glisser ici le FEC ou le grand-livre de l’<b>année N</b> ou <label htmlFor="fileInputN" className="custom-file-input">
            Importer un fichier
      </label>
      <input type="file" id='fileInputN' onChange={handleFileChangeN}  className="hidden" /></div>
      <h3 className='topmargin'>Exercice N-1</h3>
           <div className='greybox'> Glisser ici le FEC ou le grand-livre de l’<b>année N-1</b> ou <label htmlFor="fileInputNMinus1" className="custom-file-input">
            Importer un fichier
      </label>
      <input type="file" id='fileInputNMinus1' onChange={handleFileChangeNMinus1} className="hidden" /></div>
          </div>
          </div>
          <div className="box1">
          <div className="settingsetponeheader parent"><span className='textspan'>2.Importation des reports à nouveaux <img style={{width:"40px"}} src={question}/> </span>
          <div className="logoutdiv1">
      <div className='textsetting'>   <img style={{width:"40px"}} src={question}/>  Informations importante : importation des données comptables.</div>
 <ul className='textsetting1'>
  <li className='paddingboot'>Les reports à nouveaux sont obligatoires dans les extractions des FEC au sens de l’administration fiscale. Cependant, il est encore parfois difficile de les obtenir auprès des clients. C’est la raison pour laquelle il est possible d’intégrer les balances générales des exercices précédents : CAC BI réintégrera alors automatiquement les reports à nouveaux dans le GL N à partir de la BG N-1 ainsi que les reports à nouveaux dans le GL N-1 à partir de la BG N-2.</li>
 </ul>
</div>
    </div>
    <div className='divinsidestepone'>
            <h3>La base N contient-elle les reports à nouveaux (le bilan d’ouverture) ?</h3>
            <input style={{transform: "scale(1.3)"}} type='checkbox'/>
            <label > Oui</label><br/>
            <input style={{transform: "scale(1.3)"}} type='checkbox'/>
            <label style={{marginTop:'100px'}} > Non</label><br/>
            <br/>

           <div className='greybox'> Glisser ici le FEC ou le grand-livre de l’<b>année N</b> ou <label htmlFor="fileInput3" className="custom-file-input">
            Importer un fichier
      </label>
      <input type="file" id='fileInput3' className="hidden" /></div>
      <h3 className='topmargin1'>La base N-1 contient-elle les reports à nouveaux (le bilan d’ouverture) ?</h3>
      <input style={{transform: "scale(1.3)"}} type='checkbox'/>
            <label > Oui</label><br/>
            <input style={{transform: "scale(1.3)"}} type='checkbox'/>
            <label style={{marginTop:'100px'}} > Non</label><br/>
            <br/>
           <div className='greybox margintop' style={{backgroundColor:'#F8F8F8',color:"grey"}}> Glisser ici le FEC ou le grand-livre de l’<b>année N-1</b> ou <label htmlFor="fileInput4" style={{backgroundColor:"lightgray"}} className="custom-file-input">
            Importer un fichier
      </label>
      <input type="file" id='fileInput4' className="hidden" /></div>
          </div>
          </div>

        </div>
        <button style={{marginTop:"10%",marginLeft:"43%",background:"white",border:"1px solid #1054FB",borderRadius:"10px",padding:"10px",paddingLeft:"20px",paddingRight:"20px",color:"#1054FB"}} >Annuler </button>
        <button style={{marginTop:"10%",marginLeft:"2%",background:"#1054FB",border:"1px solid #1054FB",borderRadius:"10px",padding:"10px",paddingLeft:"20px",paddingRight:"20px",color:"white"}} onClick={handleSaveAndNextClick}>Enregistrer et passer à l’étape suivante</button>
      </div>
</>
  );
}

export default Stepone;
