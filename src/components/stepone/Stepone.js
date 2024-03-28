import React, { useState,useRef } from 'react';
import './Stepone.css';
import question from "../../assets/question.png"
import Header from "../shared/header/Header";
import Cookies from 'universal-cookie';
import ok from "../../assets/ok.png"
import outline from "../../assets/Outline.png"
import trash from "../../assets/delete.png"
import Checktype from '../checktype/checktype';
import { useNavigate } from 'react-router-dom';

function Stepone() {

  const [fileN, setFileN] = useState(null); // Use this state to store the file object for N
  const [show1, setshow1] = useState(false);
  const [fileSelectedN, setFileSelectedN] = useState(false);
  const [check, setcheck] = useState(false);
  const [selectedFileNameN, setSelectedFileNameN] = useState('');
  const [change, setchange] = useState(false);
  const [fileNMinus1, setFileNMinus1] = useState(null); // Use this state to store the file object for N-1
  const [fileSelectedNMinus1, setFileSelectedNMinus1] = useState(false);
  const [check1, setcheck1] = useState(false);
  const [selectedFileNameNMinus1, setSelectedFileNameNMinus1] = useState('');
  const [progress1, setProgress1] = useState(0);
  const [uploadSpeed1, setUploadSpeed1] = useState(0);
  const startTimeRef1 = useRef(null);
  const fileSizeRef1 = useRef(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isComplete1, setIsComplete1] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const startTimeRef = useRef(null);
  const fileSizeRef = useRef(0);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/tableone'); // Navigates back to /tableone
  };

  const delete1 = (event) => {
    setFileN(null);
    setFileSelectedN('')
    setIsLoading1(false)
    setIsComplete1(false)

  }
  const delete2 = (event) => {
    setFileNMinus1(null);
    setFileSelectedNMinus1('')
    setIsLoading(false)
    setIsComplete(false)

  }
  const handleFileChangeN = (event) => {
    let selectedFile = event.target.files[0];
    if (selectedFile) {
      let fileNameParts = selectedFile.name.split('.');
      let fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
      if (fileExtension === 'csv' || fileExtension === 'txt') {
        setcheck(true);
      }
      setFileN(selectedFile);
      setFileSelectedN(true);
      setSelectedFileNameN(selectedFile.name);
      const file1 = event.target.files[0];
      fileSizeRef1.current = file1.size;
      startTimeRef1.current = Date.now();
      const xhr1 = new XMLHttpRequest();
      xhr1.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const elapsedTime1 = (Date.now() - startTimeRef1.current) / 1000;
          const uploadedBytes1 = event.loaded;
          const uploadSpeed1 = Math.round((uploadedBytes1 / elapsedTime1) / 1024);
          setUploadSpeed1(uploadSpeed1);
          const percentage1 = Math.round((event.loaded / event.total) * 100);
          setProgress1(percentage1);
        }
      });
      xhr1.addEventListener("load", () => {
        setIsLoading1(false);
        setIsComplete1(true);
        document.querySelector('.progress1-bar').classList.remove('loading');
        document.querySelector('.progress1-bar').classList.add('complete');
      });
      setIsLoading1(true);
      xhr1.open("POST", "your_upload_endpoint");
      xhr1.send(file1);
      document.querySelector('.progress1-bar').classList.add('loading');
    } else {
      setFileSelectedN(false);
      setSelectedFileNameN('');
    }
  };

  const handleFileChangeNMinus1 = (event) => {
    let selectedFile = event.target.files[0];
    if (selectedFile) {
      let fileNameParts = selectedFile.name.split('.');
      let fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
      if (fileExtension === 'csv' || fileExtension === 'txt') {
        setcheck1(true);
      }
      setFileNMinus1(selectedFile);
      setFileSelectedNMinus1(true);
      setSelectedFileNameNMinus1(selectedFile.name);
      const file = event.target.files[0];
      fileSizeRef.current = file.size;
      startTimeRef.current = Date.now();
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
          const uploadedBytes = event.loaded;
          const uploadSpeed = Math.round((uploadedBytes / elapsedTime) / 1024);
          setUploadSpeed(uploadSpeed);
          const percentage = Math.round((event.loaded / event.total) * 100);
          setProgress(percentage);
        }
      });
      xhr.addEventListener("load", () => {
        setIsLoading(false);
        setIsComplete(true);
        document.querySelector('.progress-bar').classList.remove('loading');
        document.querySelector('.progress-bar').classList.add('complete');
      });
      setIsLoading(true);
      xhr.open("POST", "your_upload_endpoint");
      xhr.send(file);
      document.querySelector('.progress-bar').classList.add('loading');
    } else {
      setFileSelectedNMinus1(false);
      setSelectedFileNameNMinus1('');
    }
  };

  const handleSaveAndNextClick = async () => {
    if (!fileSelectedN || !fileSelectedNMinus1) {
      alert("Please select both files before proceeding.");
      return;
    }
    const cookies = new Cookies();
    cookies.set('check', check, { path: '/' });
    cookies.set('check1', check1, { path: '/' });
    setchange(true);
  };


  return (

<>
<Header />
      {change ? (
  <Checktype fileN={fileN} fileNMinus1={fileNMinus1} />
) : (
 <>

      <div className="settingbackground">
        <div className="loginheader">Nouveau rapport CAC BI</div>
        <div className="settingside">Étape 1 : Importation des bases</div>
        <div className="flexdiv">
          <div className="box1">
          <div  className="settingsetponeheader parent"><span className='textspan'>1.Importation des données comptables
          <img style={{width:"50px",paddingTop:"10px"}} onClick={() => {setshow1(!show1);console.log(show1)}}  src={question} alt=""/>  </span>

  

             </div>
     {show1 && (
        <>
        <div style={{backgroundColor:"white",border:"1px solid lightgrey", borderRadius:"10px",padding:'2%',position:"absolute"}}>
          <div className='textsetting'>
            <img style={{width:"40px"}} src={question} alt=""/>
            Informations importante : importation des données comptables.
          </div>
          <ul className='textsetting1'>
            <li className='paddingboot'>Les formats de fichiers acceptés sont les suivants : .csv, .txt, .xlsx.</li>
            <li>Par convention de nommage, “N” concerne l’exercice audité en cours et “N-1” l’exercice précédent</li>
          </ul>
        </div>
        </>
      )}
          <div className='divinsidestepone'>
            <h3>Exercice N</h3>
            {!isLoading1 && !isComplete1 && (
            <div className='greybox'>
           Glisser ici le FEC ou le grand-livre de l’<b>année N</b> ou{' '}

            <label htmlFor="fileInputN" className="custom-file-input">
                Importer un fichier
            </label>
            <input
                type="file"
                id='fileInputN'
                onChange={handleFileChangeN}
                className="hidden"
            />


        </div>)}
        {isLoading1 &&(<div style={{border:"1px solid  #FFB800",color:" #FFB800"}} className='greybox flexdiv'>
          <div>Importation en cours</div>
          <img style={{width:"20px",marginLeft:"420px"}} src={outline} alt='pic'/>
        </div>)}
        {isComplete1 && ( <div style={{border:"1px solid  #5DA83C",color:" #5DA83C"}} className='greybox flexdiv'>
          <div>Fichier importé avec succès</div>
          <img style={{width:"20px",marginLeft:"350px"}} src={ok} alt='pic'/>
          <img onClick={delete1} style={{width:"20px",marginLeft:"20px"}} src={trash} alt='pic'/>
        </div>)}
        <div className={isLoading1 || isComplete1 ? '' : 'hidden'}>
        <div className='flexdiv' style={{fontSize:"14px",marginTop:"20px"}}><div style={{marginRight:"15px"}}>{selectedFileNameN}</div> <div>{Math.round(fileSizeRef1.current/1048576)} MB</div></div>
            <div className={ !isComplete1 ? 'flexdiv' : 'hidden flexdiv'}> <div style={{marginRight:"100px",marginLeft:"50px"}}>{progress1}%</div> <div>{uploadSpeed1.toFixed(2)} KB-Sec</div></div>
      <div style={{marginTop:"10px"}} className="progress1-bar-container">
                <div className="progress1-bar" style={{ width: `${progress1}%` }}></div>
            </div></div>
            {!isLoading1 && !isComplete1 && (
           <div style={{color:"white",marginTop:"150px"}}>
            dont remove this
      </div>)}
      <h3 >Exercice N-1</h3>
      {!isLoading && !isComplete && (
           <div className='greybox'> Glisser ici le FEC ou le grand-livre de l’<b>année N</b> ou{' '}
            <label htmlFor="fileInputNMinus1" className="custom-file-input">
            Importer un fichier
      </label>
      <input type="file" id='fileInputNMinus1' onChange={handleFileChangeNMinus1} className="hidden" />


      </div>)}
      {isLoading &&(<div style={{border:"1px solid  #FFB800",color:" #FFB800"}} className='greybox flexdiv'>
          <div>Importation en cours</div>
          <img style={{width:"20px",marginLeft:"420px"}} src={outline} alt='pic'/>
        </div>)}
        {isComplete && ( <div style={{border:"1px solid  #5DA83C",color:" #5DA83C"}} className='greybox flexdiv'>
          <div>Fichier importé avec succès</div>
          <img style={{width:"20px",marginLeft:"350px"}} src={ok} alt='pic'/>
          <img onClick={delete2} style={{width:"20px",marginLeft:"20px"}} src={trash} alt='pic'/>
        </div>)}
        <div className={isLoading || isComplete ? '' : 'hidden'}>
        <div className='flexdiv' style={{fontSize:"14px",marginTop:"20px"}}><div style={{marginRight:"15px"}}>{selectedFileNameNMinus1}</div> <div>{Math.round(fileSizeRef.current/1048576)} MB</div></div>
            <div> {progress}% {uploadSpeed.toFixed(2)} KB-Sec</div>
      <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
        </div>


          </div>
          </div>
          <div className="box1">
          <div className="settingsetponeheader parent"><span className='textspan'>2.Importation des reports à nouveaux <img style={{width:"40px"}} src={question} alt=""/> </span>
          <div className="logoutdiv1">
      <div className='textsetting'>   <img style={{width:"40px"}} src={question} alt=""/>  Informations importante : importation des données comptables.</div>
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
        <button style={{marginTop:"10%",marginLeft:"43%",background:"white",border:"1px solid #1054FB",borderRadius:"10px",padding:"10px",paddingLeft:"20px",paddingRight:"20px",color:"#1054FB"}} onClick={handleCancel}>Annuler </button>
        <button style={{marginTop:"10%",marginLeft:"2%",background:"#1054FB",border:"1px solid #1054FB",borderRadius:"10px",padding:"10px",paddingLeft:"20px",paddingRight:"20px",color:"white"}} onClick={handleSaveAndNextClick}>Enregistrer et passer à l’étape suivante</button>
      </div>
 </>
)}

</>

  );
}

export default Stepone;
