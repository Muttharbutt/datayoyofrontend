import "./TableOne.css";
import Header from "../shared/header/Header";
import search from "../../assets/search.png"
import Popup from 'reactjs-popup';
import rocket from "../../assets/Rocket.png"
import Cookies from 'universal-cookie';
import React, { useState,useEffect } from 'react';

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

// const csrftoken = getCookie('csrftoken');
const cookies = new Cookies();
function TableOne() {
  const [data, setData] = useState([]); // Initialize state to store fetched data
  const userId = cookies.get('id');

  // useEffect(() => {
  //   fetch(`http://localhost:8000/reports/reports/?user_id=${userId}`,{
  //     method: 'GET',
  //     headers: {
  //       'Content-Type':'application/json',
  //     },
  //   })
  //   .then(response => {
  //     if (response.ok) return response.json();
  //     throw new Error('Network response was not ok.');
  //   })
  //   .then(jsonData => {setData(jsonData);console.log("data:",jsonData)}) // Store the fetched data in state
  //   .catch(error => console.error("Failed to fetch data:", error));
  // }, []);
  useEffect(() => {
    fetch(`http://localhost:8000/accounts/users/?user_id=${userId}`,{
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
      },
    })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Network response was not ok.');
    })
    .then(jsonData => {setData(jsonData);console.log("data:",jsonData)}) // Store the fetched data in state
    .catch(error => console.error("Failed to fetch data:", error));
  }, []);
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
  {data.map((item) => (
            <div key={item.id} className="tablecontent">
              <div>{item.account_legal_name}</div>
              <div>{item.creator}</div>
              <div>{item.team}</div>
              {/* Add deletion or any other controls here */}
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
