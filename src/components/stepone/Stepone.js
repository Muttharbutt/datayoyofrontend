import React, { useState } from 'react';
import './Stepone.css';
import question from "../../assets/question.png"
import Header from "../shared/header/Header";
import Popup from 'reactjs-popup';
function Stepone() {
  const [isOpen, setIsOpen] = useState(false);
  
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
      <input type="file" id="fileInput" className="hidden" /></div>
      <h3 className='topmargin'>Exercice N-1</h3>
           <div className='greybox'> Glisser ici le FEC ou le grand-livre de l’<b>année N-1</b> ou <label htmlFor="fileInput" className="custom-file-input">
            Importer un fichier
      </label>
      <input type="file" id="fileInput" className="hidden" /></div>
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
            
           <div className='greybox'> Glisser ici le FEC ou le grand-livre de l’<b>année N</b> ou <label htmlFor="fileInput" className="custom-file-input">
            Importer un fichier
      </label>
      <input type="file" id="fileInput" className="hidden" /></div>
      <h3 className='topmargin1'>La base N-1 contient-elle les reports à nouveaux (le bilan d’ouverture) ?</h3>
      <input style={{transform: "scale(1.3)"}} type='checkbox'/>
            <label > Oui</label><br/>
            <input style={{transform: "scale(1.3)"}} type='checkbox'/>
            <label style={{marginTop:'100px'}} > Non</label><br/>
            <br/>
           <div className='greybox margintop'> Glisser ici le FEC ou le grand-livre de l’<b>année N-1</b> ou <label htmlFor="fileInput" className="custom-file-input">
            Importer un fichier
      </label>
      <input type="file" id="fileInput" className="hidden" /></div>
          </div>
          </div>  
        </div>
      </div>  
</>
  );
}

export default Stepone;
