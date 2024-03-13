import "./TableOne.css";
import Header from "../shared/header/Header";
import search from "../../assets/search.png"
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
// function getCookie(name) {
//   let cookieValue = null;
//   if (document.cookie && document.cookie !== '') {
//     const cookies = document.cookie.split(';');
//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i].trim();
//       if (cookie.substring(0, name.length + 1) === (name + '=')) {
//         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//         break;
//       }
//     }
//   }
//   return cookieValue;
// }

const cookies = new Cookies();
function TableOne() {
  const [data, setData] = useState([]); // Initialize state to store fetched data
  const [creater, setcreater] = useState([]); 
  const [user, setuser] = useState([]); 
  const userId = cookies.get('id');
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [checking, setchecking] = useState(true);
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
const handleButton1Click = () => {
  setShowSecondPopup(true);
};
const addItem = (newItem) => {
  setcreater([...creater, newItem]);
};
useEffect(() => {
  fetch(`http://localhost:8000/reports/reports/?user_id=${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(jsonData => {setData(jsonData);console.log(jsonData)})
    .catch(error => console.error("Failed to fetch reports:", error));
}, []);

useEffect(() => {
  if (data.length === 0) return;

  const fetchUsers = async () => {
    try {
      const sharedUsersIds = data.reduce((acc, curr) => acc.concat(curr.shared_with_users), []);
      const uniqueUserIds = [...new Set(sharedUsersIds)]; // Remove duplicates

      const responses = await Promise.all(
        uniqueUserIds.map(userId =>
          fetch(`http://localhost:8000/accounts/users/?user_id=${userId}`)
        )
      );
      
      const userData = await Promise.all(
        responses.map(async response => {
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          const userData = await response.json();
          return userData[0]; // Only save the zero index
        })
      );
       userData.forEach((user, index) => {
        const fullName = `${user.first_name} ${user.last_name}`;
        if (index === 0) {
          setuser(fullName);
        } else {
          setuser(  [...user, `, ${fullName}`]);
        }
      });
    
      // addItem(userData[0].first_name+" "+userData[0].last_name);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  fetchUsers();
}, [data]);

useEffect(() => {
  if (data.length === 0) return;

  const fetchUsers = async () => {
    try {
      const creatorid = data.map(data => data.creator);
      const responses = await Promise.all(
        creatorid.map(creatorid =>
          fetch(`http://localhost:8000/accounts/users/?user_id=${creatorid}`)
        )
      );

      const userData = await Promise.all(
        responses.map(async response => {
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          const userData = await response.json();
          return userData[0]; // Only save the zero index
        })
      );
      addItem(userData[0].first_name+" "+userData[0].last_name);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  fetchUsers();
}, [data]);

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
                type="text"
                placeholder="Nom du client *"
                className="logininputstyle givinginputmargin1"
              />
            </div>
            <div className="settingexcesise">Exercice <b>N</b></div>
            <div className="settingdate1"><b>Date d’ouverture</b></div>
            <input className="settingdate1 styledate" type="date" />
            <div className="settingdate1"><b>Date de clôture+</b></div>
            <input  className="settingdate1 styledate" type="date" />
   </div>
<div className="redbox">
<select id="cars" className="selectstyle">
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
            <div className="container1">
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
  {data.map((item, index) => (
            // <div key={item.id} className="tablecontent">
            //   <div>{item.account_legal_name}</div>
            //   <div>{item.creator}</div>
            //   <div>{item.team}</div>
            //   {/* Add deletion or any other controls here */}
            // </div>
            <div className="tablecontent">
            <div>{item.account_legal_name}</div>
            <div>{creater[index]}</div>
            <div>
            <div>{user}</div>
            <Popup
                trigger={<div onClick={falsechangechecking} className="flexdiv" style={{color:"blue",fontSize:"13px",cursor:"pointer"}}><img style={{width:"20px",marginRight:"10px"}} src={edit} alt="trash" /><div>Ajouter ou supprimer un collaborateur</div></div>}
                modal
                nested
            >
                {close => (
                    <div className="modal-overlay" onClick={close}>
                        
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
          <div className="flexdiv" style={{border:"1px solid lightgrey",height:"30px",marginLeft:"2%",borderRadius:"10px",width:"30%",fontSize:"14px",paddingTop:"10px",paddingBottom:"-10px",paddingLeft:"10px",paddingRight:"-10px"}}>
         <div>john.hill@datayoyo.fr</div>
          <img style={{width:"25px",height:"25px"}} src={trash} alt="trash" /></div>
                   </div>
                   </span> 
                   <div style={{marginTop:"3%", marginBottom:"-3%", marginLeft:"27%"}}>
                   <button className="button1" style={{marginRight:"4%"}} onClick={() => {close(); falsechangechecking();}}>Annuler</button>
                                    <button className="button2" onClick={changechecking}>Enregistrer et passer à l’étape suivante</button>
                                  </div></div></> </div>
                      ):(<>
                       <div className="modal1"style={{padding:"40px"}} onClick={e => {e.stopPropagation(); }}>
                      <img style={{width:"50px",marginLeft:"45%"}} src={hand} alt="trash" />
                      <h3 style={{marginLeft:"20%"}}>Êtes-vous sûr de vouloir quitter sans sauvergarder ?</h3>
                      <div className="modal-buttons">
                                    <button className="button1" >Oui</button>
                                    <button className="button2" onClick={close}>Non</button>
                                  </div>
                                  </div>
                                  </>)}
                       
                    </div>
                )}
                   </Popup></div>
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
