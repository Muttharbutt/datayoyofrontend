import "./TableOne.css";
import Header from "../shared/header/Header";
import searching from "../../assets/search.png"
import Popup from 'reactjs-popup';
import rocket from "../../assets/Rocket.png"
import Cookies from 'universal-cookie';
import React, { useState,useEffect } from 'react';
import edit from "../../assets/edit.png"
import handshake from "../../assets/handshake.png"
import add from '../../assets/add.png'
import cross from "../../assets/cross.png"
import trash from '../../assets/trash.png'
import hand from "../../assets/hand.png"
import alert from "../../assets/alert.png"

const cookies = new Cookies();

function TableOne() {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]); // Your data array
  const [originalItems, setOriginalItems] = useState([]); // Backup of the original data

  const [creater, setcreater] = useState([]);
  const [user, setuser] = useState([]);
  const userId = cookies.get('id');
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [checking, setchecking] = useState(true);

  // Handler to save input values to cookies and proceed to the next step
  const handleSaveAndNext = () => {
    // Access the input values
    const clientName = document.getElementById('clientName').value;
    const firstMonthFiscal = document.getElementById('firstMonthFiscal').value;
    const dateOpenN = document.getElementById('dateOpenN').value;
    const dateCloseN = document.getElementById('dateCloseN').value;
    const dateOpenNMinus1 = document.getElementById('dateOpenNMinus1').value;
    const dateCloseNMinus1 = document.getElementById('dateCloseNMinus1').value;

    // Create a cookies instance
    const cookies = new Cookies();

    // Save the values in cookies
    cookies.set('clientName', clientName, { path: '/' });
    cookies.set('firstMonthFiscal', firstMonthFiscal, { path: '/' });
    cookies.set('dateOpenN', dateOpenN, { path: '/' });
    cookies.set('dateCloseN', dateCloseN, { path: '/' });
    cookies.set('dateOpenNMinus1', dateOpenNMinus1, { path: '/' });
    cookies.set('dateCloseNMinus1', dateCloseNMinus1, { path: '/' });

    window.location.href = "http://localhost:3000/stepone";
  };

  const changechecking = () => {
    setchecking(false);
  };

  // const csrftoken = getCookie('csrftoken');
  const falsechangechecking = () => {
    setchecking(true);
  };

  const closeSecondPopup = () => {
    setShowSecondPopup(false);
  };

  const handleDeleteReport = async (reportId) => {
    try {
      const response = await fetch(`http://localhost:8000/reports/reports/${reportId}/?user_id=${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Report deleted successfully');
       window.location.reload()
      } else {
        console.error('Failed to delete the report:', response.statusText);
        // Handle failure, perhaps show a user-friendly error message
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error, perhaps show a user-friendly error message
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      setItems(originalItems); // If searchQuery is empty, reset to original list
    } else {
      const filteredItems = originalItems.filter((item) =>
        item.account_legal_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setItems(filteredItems); // Update items with filtered list
    }
  }, [searchQuery, originalItems]);

  useEffect(() => {
    fetch(`http://localhost:8000/reports/reports/?user_id=${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(jsonData => {setOriginalItems(jsonData);console.log(jsonData)})
    .catch(error => console.error("Failed to fetch reports:", error));
  }, [userId]);

  useEffect(() => {
    if (originalItems.length === 0) return;
    const arrayu = []; // Move arrayo inside useEffect
    const fetchUsers = async () => {
      try {
        const creatorids = [];
        for (let i = 0; i < originalItems.length; i++) {
          creatorids.push(originalItems[i].creator);
        }
        for (let i = 0; i < creatorids.length; i++) {
          const response = await fetch(`http://localhost:8000/accounts/users/?user_id=${creatorids[i]}`);
         let userDataResponse=await response.json()
         arrayu.push( userDataResponse[0].first_name + " " + userDataResponse[0].last_name)
        }
        setcreater(arrayu)
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUsers();
  }, [originalItems]);

  useEffect(() => {
    if (originalItems.length === 0) return;
    const arrayo = []; // Move arrayo inside useEffect
    const fetchUser = async () => {
      try {
        const creatorid = [];
        for (let i = 0; i < originalItems.length; i++) {
          creatorid.push(originalItems[i].shared_with_users);
        }
        for (let i = 0; i < creatorid.length; i++) {
          let arrays = creatorid[i];
          for (let j = 0; j < arrays.length; j++) { // Fixed loop index
            const response = await fetch(`http://localhost:8000/accounts/users/?user_id=${arrays[j]}`);
            const userDataResponse = await response.json();
            if(j==0){arrayo.push( userDataResponse[0].first_name + " " + userDataResponse[0].last_name)}
            else{arrayo[i]=arrayo[i]+","+ userDataResponse[0].first_name + " " + userDataResponse[0].last_name}
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    setuser(arrayo)
    fetchUser();
  }, [originalItems]);

  return (
    <>
      <Header />
      <div className="settingbackground">
        <div className="tableheader">Mes rapports CAC BI</div>
        <div className="tableheader1">Tableau de bord</div>
        <div className="flexdiv">
        <div className="">

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
<div className="container">
              <input
                id="clientName"
                type="text"
                placeholder="Nom du client *"
                className="logininputstyle givinginputmargin1"
              />
            </div>
            <div className="settingexcesise">Exercice <b>N</b></div>
            <div className="settingdate1"><b>Date d’ouverture</b></div>
            <input id="dateOpenN" className="settingdate1 styledate" type="date" />
            <div className="settingdate1"><b>Date de clôture+</b></div>
            <input id="dateCloseN" className="settingdate1 styledate" type="date" />
   </div>
<div className="redbox">
<select id="firstMonthFiscal" className="selectstyle">
  <option value="1">Janvier</option>
  <option value="2">Février</option>
  <option value="3">Mars</option>
  <option value="4">Avril</option>
  <option value="5">Mai</option>
  <option value="6">Juin</option>
  <option value="7">Juillet</option>
  <option value="8">Aout</option>
  <option value="9">Septembre</option>
  <option value="10">Octobre</option>
  <option value="11">Novembre</option>
  <option value="12">Décembre</option>
</select>
<div className="settingexcesise">Exercice <b>N-1</b></div>
            <div className="settingdate1"><b>Date d’ouverture</b></div>
            <input id="dateOpenNMinus1" className="settingdate1 styledate" type="date" />
            <div className="settingdate1"><b>Date de clôture+</b></div>
            <input id="dateCloseNMinus1" className="settingdate1 styledate" type="date" />
</div>
             </div>



              </div>
              <div className="modal-buttons1">
                            <button className="button11" onClick={close}>Annuler</button>
                            <button className="button12" onClick={handleSaveAndNext}>Enregistrer et passer à l’étape suivante</button>
                          </div></div>

                </div>
            </div>
        )}
    </Popup>

            </div>
            <div className="container1">
             <input
      type="text"
      placeholder="Rechercher un dossier"
      className="tableinputstyle2 givinginputmargin4"
      value={searchQuery} // This ensures the input value is controlled by the state
      onChange={(e) => setSearchQuery(e.target.value)} // Call handleInputChange function when input changes
    />
              <img src={searching} alt="profile" className="imagestyleforlogin2" />
            </div>
        </div>

        <div className="tablewidth">

  <div className="tableheaderstyle"  >
    <div>Accès au rapport</div>
    <div>Généré par</div>
    <div>Équipe</div>
    <div>Suppression du dossier</div>
  </div>
  {items.map((item, index) => (
            <div className="tablecontent">
            <div>{item.account_legal_name}</div>
            <div>{creater[index]}</div>
            <div>
            <div>{user[index]} </div>
            <Popup
                trigger={< div className="flexdiv" style={{color:"blue",fontSize:"13px",cursor:"pointer"}}><img style={{width:"20px",marginRight:"10px"}} src={edit} alt="trash" /><div>Ajouter ou supprimer un collaborateur</div></div>}
                modal
                nested

            >
                {onopen => (
                    <div className="modal-overlay" onClick={onopen}>

                          {checking ? (
                      <div className="modal" onClick={e => {e.stopPropagation(); }}>
                     <><div className="modal-content"><span className="givingsize">
                      <h3 style={{fontWeight:"500"}}>Modification de l’équpe <img style={{width:"30px"}} src={handshake} alt="trash" /></h3>
                     <p> <img style={{width:"20px",marginRight:"12px"}} src={add} alt="trash" />Ajouter un utilisateur <img style={{width:"20px",marginRight:"12px"}} src={alert} alt="trash" /><span style={{color:"red",fontSize:""}}>Ce compte Datayoyo n’existe pas</span></p>
                   <div><input style={{border:"1px solid lightgrey",height:"40px",borderRadius:"10px",width:"40%",paddingLeft:"20px",color:"black"}} placeholder="Email du compte Datayoyo"/>
                   <button style={{marginLeft:"2%",paddingLeft:"30px",paddingRight:"30px"}} className="button2">Valider</button>
                   </div>
                   <p> <img style={{width:"20px",marginRight:"12px"}} src={cross} alt="trash" />Supprimer un utilisateur</p>
                   <div className="flexdiv" style={{border:"1px solid lightgrey",height:"140px",borderRadius:"10px",width:"80%",padding:"10px"}}>
                   <div className="flexdiv" style={{border:"1px solid lightgrey",height:"30px",borderRadius:"10px",width:"30%",fontSize:"14px",paddingTop:"10px",paddingBottom:"-10px",paddingLeft:"10px",paddingRight:"-10px"}}>
         <div> victor.laschon@datayoyo.fr</div>
          <img style={{width:"25px",height:"25px"}} src={trash} alt="trash" /></div>
                   </div>
                   </span>
                   <div style={{marginTop:"3%", marginBottom:"-3%", marginLeft:"27%"}}>
                   <button className="button1" style={{marginRight:"4%"}} onClick={() => {onopen(); falsechangechecking();}}>Annuler</button>
                                    <button className="button2" onClick={changechecking}>Enregistrer et passer à l’étape suivante</button>
                                  </div></div></> </div>
                      ):(<>
                       <div className="modal1"style={{padding:"40px"}} onClick={e => {e.stopPropagation(); }}>
                      <img style={{width:"50px",marginLeft:"45%"}} src={hand} alt="trash" />
                      <h3 style={{marginLeft:"20%"}}>Êtes-vous sûr de vouloir quitter sans sauvergarder ?</h3>
                      <div className="modal-buttons">
                                    <button className="button1" >Oui</button>
                                    <button className="button2" onClick={onopen}>Non</button>
                                  </div>
                                  </div>
                                  </>)}

                    </div>
                )}
                   </Popup>
            </div>
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
                                    <button className="button1" onClick={() => {handleDeleteReport(item.id); close();}}>Oui</button>
                                    <button className="button2" onClick={close}>Non</button>
                                  </div></>
                    )}
                        </div>
                    </div>
                )}
            </Popup>

          </div>
          ))
  }
  <div className="flexdiv settingsetter">
  <div style={{fontSize:"14px"}}>&lt;&lt; </div>
    <div  style={{fontSize:"14px"}}>&lt;</div>
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
