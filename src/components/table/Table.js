import "./Table.css";
import Header from "../shared/header/Header";
import search from "../../assets/search.png"
import trash from '../../assets/trash.png'
import Popup from 'reactjs-popup';
import React, { useState } from 'react';
function Table() {
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
        <div className="container">
              <input
                type="text"
                placeholder="Rechercher un dossier"
                className="tableinputstyle1 givinginputmargin2"
              />
              <img src={search} alt="profile" className="imagestyleforlogin1" />
            </div>
        <div className="tablewidth">

  <div className="tableheaderstyle"  >
    <div>Accès au rapport</div>
    <div>Généré par</div>
    <div>Équipe</div>
    <div>Suppression du dossier</div>
  </div>

  <div className="tablecontent">
    <div style={{width:"20%"}}>datayoyo</div>
    <div  style={{width:"20%"}}>John DOE</div>
    <div  style={{width:"30%"}}>Victor LASCHON, John HILL, Hajar RAISS</div>
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

export default Table;
