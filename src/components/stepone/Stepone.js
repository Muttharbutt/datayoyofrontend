import React, { useState } from 'react';
import './Stepone.css';
import question from "../../assets/question.png"
import Header from "../shared/header/Header";
import tick from "../../assets/tick.png"
import Popup from 'reactjs-popup';
function Stepone() {
  const [fileSelectedN, setFileSelectedN] = useState(false);
  const [selectedFileNameN, setSelectedFileNameN] = useState('');
  const [uploadProgressN, setUploadProgressN] = useState(0);
  const handleFileChangeN = (event) => {

    const file = event.target.files[0];
    if (file) {
        setFileSelectedN(true);
        setSelectedFileNameN(file.name);
        uploadFile(file, setUploadProgressN);
    } else {
        setFileSelectedN(false);
        setSelectedFileNameN('');
        setUploadProgressN(0);
    }
};

const uploadFile = (file, setUploadProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'your-upload-url-here');
  xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
      }
  };

  xhr.onload = () => {
      // Handle successful upload
      if (xhr.status === 200) {
          console.log('File uploaded successfully');
      } else {
          console.error('File upload failed');
      }
  };

  xhr.onerror = () => {
      console.error('File upload failed');
  };

  xhr.send(formData);
};
const [handleing, sethandleing] = useState(true);

const handle = () => {
  sethandleing(false);
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
    
    <div class="logoutdiv1">
      <div className='textsetting'>   <img style={{width:"40px"}} src={question}/>  Informations importante : importation des données comptables.</div>
 <ul className='textsetting1'>
  <li className='paddingboot'>Les formats de fichiers acceptés sont les suivants : .csv, .txt, .xlsx.</li>
  <li>Par convention de nommage, “N” concerne l’exercice audité en cours et “N-1” l’exercice précédent</li>
 </ul>
</div>

             </div>
        
          <div className='divinsidestepone'>
            <h3>Exercice N</h3>
           <div className='greybox'> Glisser ici le FEC ou le grand-livre de l’<b>année N</b> ou <label htmlFor="fileInput" className="custom-file-input">
            Importer un fichier
      </label>
      <input type="file" id='fileInput' onChange={handleFileChangeN}  className="hidden" /></div>
      <h3 className='topmargin'>Exercice N-1</h3>
           <div className='greybox'> Glisser ici le FEC ou le grand-livre de l’<b>année N-1</b> ou <label htmlFor="fileInput1" className="custom-file-input">
            Importer un fichier
      </label>
      <input type="file" id='fileInput1'  className="hidden" /></div>
          </div>
          </div>
          <div className="box1">
          <div className="settingsetponeheader parent"><span className='textspan'>2.Importation des reports à nouveaux <img style={{width:"40px"}} src={question}/> </span>
          <div class="logoutdiv1">
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
        <Popup
        trigger={ <button style={{marginTop:"10%",marginLeft:"2%",background:"#1054FB",border:"1px solid #1054FB",borderRadius:"10px",padding:"10px",paddingLeft:"20px",paddingRight:"20px",color:"white"}}>Enregistrer et passer à l’étape suivante</button> }
        modal
        nested
    >
        {close => (
            <div className="modal-overlay" onClick={close}>
                <div className="modal1" onClick={e => e.stopPropagation()}>  
            <div className="modal-content">
              <div>
              {handleing ? (   <>
          <h4 style={{fontWeight:"700"}}>Balance générale - Exercice N</h4>
          <h4 style={{color:"#5DA83C",fontWeight:"500"}}>Chargement de la balance générale N effectué avec succès !</h4>
           <h4 style={{fontWeight:"600"}}>Il est nécessaire de rapprocher les champs “Numéro de compte”, “Libellé de compte” et “Solde”.</h4>
           <div style={{display:"flex",paddingLeft:"1%",marginBottom:"-7%",marginTop:"4%"}}>
           <div  style={{width:"42%"}} >       <label style={{display:"block"}}>Numéro de compte</label>
           <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
  <option label="Volvo">Volvo (Latin for "I roll")</option>
  <option label="Saab">Saab (Swedish Aeroplane AB)</option>
  <option label="Mercedes">Mercedes (Mercedes-Benz)</option>
  <option label="Audi">Audi (Auto Union Deutschland Ingolstadt)</option>
</select></div>
<div  style={{width:"42%"}}>       <label style={{display:"block"}}>Numéro de compte</label>
           <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
  <option label="Volvo">Volvo (Latin for "I roll")</option>
  <option label="Saab">Saab (Swedish Aeroplane AB)</option>
  <option label="Mercedes">Mercedes (Mercedes-Benz)</option>
  <option label="Audi">Audi (Auto Union Deutschland Ingolstadt)</option>
</select></div>
  <div  style={{width:"42%"}}>       <label style={{display:"block"}}>Numéro de compte</label>
           <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
  <option label="Volvo">Volvo (Latin for "I roll")</option>
  <option label="Saab">Saab (Swedish Aeroplane AB)</option>
  <option label="Mercedes">Mercedes (Mercedes-Benz)</option>
  <option label="Audi">Audi (Auto Union Deutschland Ingolstadt)</option>
</select></div>
</div>  
           <div>
          
           <div className="modal-buttons1">
                            <button style={{marginTop:"10%",marginLeft:"32%",background:"white",border:"1px solid #1054FB",borderRadius:"20px",padding:"10px",paddingLeft:"20px",paddingRight:"20px",color:"#1054FB"}} onClick={close}>Annuler</button>
                            <button style={{marginTop:"10%",marginLeft:"2%",background:"#1054FB",border:"1px solid #1054FB",borderRadius:"20px",padding:"10px",paddingLeft:"20px",paddingRight:"20px",color:"white"}} onClick={handle} >Enregistrer et passer à l’étape suivante</button>
                          </div>
           </div>
           </>
              ):(<>
               <h4 style={{color:"#5DA83C",fontWeight:"500"}}>Fichiers importés avec succès !</h4>
               <h4 style={{fontWeight:"400",fontSize:"15px"}}>Votre demande de génération de livrable est en cours de traitement.</h4>
               <h4 style={{fontWeight:"400",marginTop:"-1 %",fontSize:"15px"}}>Veuillez noter qu’un délai est nécessaire pour une mise à jour de votre tableau de bord.</h4>
               <img style={{width:"100px",height:"100px",marginLeft:"44%"}} src={tick} alt='tick'/>
               <button style={{marginTop:"0",marginLeft:"77%",background:"#1054FB",border:"1px solid #1054FB",borderRadius:"20px",padding:"12px",paddingLeft:"30px",paddingRight:"30px",color:"white"}} onClick={handle} >Fermer</button>
              </>)}
 
              </div>
              </div>
           
                </div>
            </div>
        )}
    </Popup>
        <Popup
        trigger={ <button style={{marginTop:"10%",marginLeft:"2%",background:"#1054FB",border:"1px solid #1054FB",borderRadius:"10px",padding:"10px",paddingLeft:"20px",paddingRight:"20px",color:"white"}}>Enregistrer et passer à l’étape suivante</button> }
        modal
        nested
    >
        {close => (
            <div className="modal-overlay" onClick={close}>
                <div className="modal1" onClick={e => e.stopPropagation()}>  
            <div className="modal-content">
              <div>
              {handleing ? (   <>
          <h4 style={{fontWeight:"700"}}>Balance générale - Exercice N</h4>
          <h4 style={{color:"#5DA83C",fontWeight:"500"}}>Chargement de la balance générale N effectué avec succès !</h4>
           <h4 style={{fontWeight:"600"}}>Il est nécessaire de rapprocher les champs “Numéro de compte”, “Libellé de compte” et “Solde”.</h4>
           <div style={{display:"flex",paddingLeft:"1%",marginBottom:"-7%",marginTop:"4%"}}>
           <div  style={{width:"42%"}} >       <label style={{display:"block"}}>Numéro de compte</label>
           <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
  <option label="Volvo">Volvo (Latin for "I roll")</option>
  <option label="Saab">Saab (Swedish Aeroplane AB)</option>
  <option label="Mercedes">Mercedes (Mercedes-Benz)</option>
  <option label="Audi">Audi (Auto Union Deutschland Ingolstadt)</option>
</select></div>
<div  style={{width:"42%"}}>       <label style={{display:"block"}}>Numéro de compte</label>
           <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
  <option label="Volvo">Volvo (Latin for "I roll")</option>
  <option label="Saab">Saab (Swedish Aeroplane AB)</option>
  <option label="Mercedes">Mercedes (Mercedes-Benz)</option>
  <option label="Audi">Audi (Auto Union Deutschland Ingolstadt)</option>
</select></div>
  <div  style={{width:"42%"}}>       <label style={{display:"block"}}>Numéro de compte</label>
           <select style={{width:"90%",height:"40px",borderRadius:"20px",backgroundColor:"#EDEEFB",color:"#1054FB",border:"none",paddingLeft:"20px",marginTop:"2%",marginLeft:"-5%"}} >
  <option label="Volvo">Volvo (Latin for "I roll")</option>
  <option label="Saab">Saab (Swedish Aeroplane AB)</option>
  <option label="Mercedes">Mercedes (Mercedes-Benz)</option>
  <option label="Audi">Audi (Auto Union Deutschland Ingolstadt)</option>
</select></div>
</div>  
           <div>
          
           <div className="modal-buttons1">
                            <button style={{marginTop:"10%",marginLeft:"32%",background:"white",border:"1px solid #1054FB",borderRadius:"20px",padding:"10px",paddingLeft:"20px",paddingRight:"20px",color:"#1054FB"}} onClick={close}>Annuler</button>
                            <button style={{marginTop:"10%",marginLeft:"2%",background:"#1054FB",border:"1px solid #1054FB",borderRadius:"20px",padding:"10px",paddingLeft:"20px",paddingRight:"20px",color:"white"}} onClick={handle} >Enregistrer et passer à l’étape suivante</button>
                          </div>
           </div>
           </>
              ):(<>
               <h4 style={{color:"#5DA83C",fontWeight:"500"}}>Fichiers importés avec succès !</h4>
               <h4 style={{fontWeight:"400",fontSize:"15px"}}>Votre demande de génération de livrable est en cours de traitement.</h4>
               <h4 style={{fontWeight:"400",marginTop:"-1 %",fontSize:"15px"}}>Veuillez noter qu’un délai est nécessaire pour une mise à jour de votre tableau de bord.</h4>
               <img style={{width:"100px",height:"100px",marginLeft:"44%"}} src={tick} alt='tick'/>
               <button style={{marginTop:"0",marginLeft:"77%",background:"#1054FB",border:"1px solid #1054FB",borderRadius:"20px",padding:"12px",paddingLeft:"30px",paddingRight:"30px",color:"white"}} onClick={handle} >Fermer</button>
              </>)}
 
              </div>
              </div>
           
                </div>
            </div>
        )}
    </Popup>
      </div>  
</>
  );
}

export default Stepone;
