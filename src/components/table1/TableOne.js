import "./TableOne.css";
import Header from "../shared/header/Header";
import search from "../../assets/search.png"
import trash from '../../assets/trash.png'
import Popup from 'reactjs-popup';
import rocket from "../../assets/Rocket.png"
import email from "../../assets/email.png";
import React, { useState } from 'react';
function TableOne() {
  const [showSecondPopup, setShowSecondPopup] = useState(false);

  const handleButton1Click = () => {
      setShowSecondPopup(true);
  };
  const closeSecondPopup = () => {
      setShowSecondPopup(false);
  };
  return (
    <>
      <Header />
      <div className="settingbackground">
        <div className="tableheader">Mes rapports CAC BI</div>
        <div className="tableheader1">Tableau de bord</div>
        <div className="flexdiv">
        <div class="">
             
              <Popup
        trigger={ <button className="button4">+Générer un livrable</button>}
        modal
        nested
    >
        {close => (
            <div className="modal-overlay" onClick={close}>
                <div className="modal" onClick={e => e.stopPropagation()}>  
            <div className="modal-content">
              <div>
              <h3 className="">Génération d’un nouveau livrable <img src={rocket} style={{width:'30px'}} alt="sad"/></h3>
             <div className="flexdiv">
<div className="bluebox">
<div class="container">
              <input
                type="text"
                placeholder="Email professionnel *"
                className="logininputstyle givinginputmargin1"
              />
              <img src={email} alt="profile" class="imagestyleforlogin" />
            </div>
            <div className="settingexcesise">Exercice <b>N</b></div>
            <div className="settingdate1"><b>Date d’ouverture</b></div>
            <input className="settingdate1 styledate" type="date" />
            <div className="settingdate1"><b>Date de clôture+</b></div>
            <input  className="settingdate1 styledate" type="date" />
   </div>
<div className="redbox">
<select id="cars" className="selectstyle">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="fiat">Fiat</option>
  <option value="audi">Audi</option>
</select>
<div className="settingexcesise">Exercice <b>N-1</b></div>
            <div className="settingdate1"><b>Date d’ouverture</b></div>
            <input className="settingdate1 styledate" type="date" />
            <div className="settingdate1"><b>Date de clôture+</b></div>
            <input  className="settingdate1 styledate" type="date" />
</div>
             </div>
           
           

              </div>
              <div className="modal-buttons1">
                            <button className="button11" onClick={close}>Annuler</button>
                            <button className="button12" >Enregistrer et passer à l’étape suivante</button>
                          </div></div>
           
                </div>
            </div>
        )}
    </Popup>
  
            </div>
            <div class="container1">
              <input
                type="text"
                placeholder="Rechercher un dossier"
                className="tableinputstyle2 givinginputmargin4"
              />
              <img src={search} alt="profile" className="imagestyleforlogin2" />
            </div>
        </div>
       
        <div className="tablewidth">
            
  <div className="tableheaderstyle"  >
    <div>Accès au rapport</div>
    <div>Généré par</div>
    <div>Équipe</div>
    <div>Suppression du dossier</div>
  </div>

  <div className="tablecontent">
    <div>datayoyo</div>
    <div>John DOE</div>
    <div>Victor LASCHON, John HILL, Hajar RAISS</div>
    <Popup
        trigger={<div><img className="trashimage" src={trash} alt="trash" /></div>}
        modal
        nested
    >
        {close => (
            <div className="modal-overlay" onClick={close}>
                <div className="modal" onClick={e => e.stopPropagation()}>
                {showSecondPopup ? (
              
             <><div className="modal-content"><span className="givingsize">
              <h3 className="textaligning">Suppression d’un dossier</h3>
             <p>Votre demande de suppression est en cours de traitement.</p>
             <p>Veuillez noter qu’un délai est nécessaire pour une mise à jour de votre tableau de bord.</p>
           </span> 
           <div className="modal-buttons">
                            <button className="button2"onClick={() => {close(); closeSecondPopup();}}>Fermer</button>
                          </div></div></>
            ) : (
              <><div className="modal-content">

                          <h3 className="textaligning">Suppression d’un dossier</h3>
                          <span className="givingsize">
                            <p>Cette action est :</p>
                            <ul>
                              <li>est <b>irréversible</b></li>
                              <li>entrainera la suppression du livrable pour<b> tous les membres de votre équipe</b></li>
                            </ul>
                            <p><b>Êtes-vous sûr de vouloir supprimer ce dossier ?</b></p>
                          </span>
                        </div><div className="modal-buttons">
                            <button className="button1" onClick={handleButton1Click}>Oui</button>
                            <button className="button2" onClick={close}>Non</button>
                          </div></>
            )}
                </div>
            </div>
        )}
    </Popup>
  
  </div>
  <div className="flexdiv settingsetter">
  <div>&lt;&lt; </div>
    <div>&lt;</div>
    <div className="bluebutton">1</div>
    <div> &gt;</div>
    <div>&gt;&gt;</div>
  </div>
  </div>

      </div>
    </>
  );
}

export default TableOne;
