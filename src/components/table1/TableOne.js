import "./TableOne.css";
import Header from "../shared/header/Header";
import search from "../../assets/search.png"
import Popup from 'reactjs-popup';
import rocket from "../../assets/Rocket.png"
import Cookies from 'universal-cookie';
import React, { useState, useEffect } from 'react';

const cookies = new Cookies();

function TableOne() {
  const [data, setData] = useState([]); // Initialize state to store fetched data
  const userId = cookies.get('id');

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

    // Here, you would also include any logic to proceed to the next step
    console.log("Data saved to cookies and moving to the next step");

    window.location.href = "http://localhost:3000/stepone";
  };

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
      <div>
        <Popup
          trigger={<button className="button4">+Générer un livrable</button>}
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
                          <input id="clientName" type="text" placeholder="Nom du client *" className="logininputstyle givinginputmargin1" />
                        </div>
                        <div className="settingexcesise">Exercice <b>N</b></div>
                        <div className="settingdate1"><b>Date d’ouverture</b></div>
                        <input id="dateOpenN" className="settingdate1 styledate" type="date"/>
                        <div className="settingdate1"><b>Date de clôture+</b></div>
                        <input id="dateCloseN" className="settingdate1 styledate" type="date"/>
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
                        <input id="dateOpenNMinus1" className="settingdate1 styledate" type="date"/>
                        <div className="settingdate1"><b>Date de clôture+</b></div>
                        <input id="dateCloseNMinus1" className="settingdate1 styledate" type="date"/>
                      </div>
                    </div>
                  </div>
                  <div className="modal-buttons1">
                    <button className="button11" onClick={close}>Annuler</button>
                    <button className="button12" onClick={handleSaveAndNext}>Enregistrer et passer à l’étape suivante</button>
                  </div>
                </div>
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
      <div className="tableheaderstyle">
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
      ))}
      <div className="flexdiv settingsetter">
        <div style={{fontSize:"14px"}}>&lt;&lt;</div>
        <div style={{fontSize:"14px"}}>&lt;</div>
        <div className="bluebutton">1</div>
        <div>&gt;</div>
        <div>&gt;&gt;</div>
      </div>
    </div>
  </div>
</>
  );
}

export default TableOne;
