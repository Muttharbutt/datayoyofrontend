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
import g0 from "../../assets/g0.png"
import g1 from "../../assets/g1.png"
import g2 from "../../assets/g2.png"
import g3 from "../../assets/g3.png"
import unnion from "../../assets/Union.png"
const cookies = new Cookies();

function TableOne() {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]); // Your data array
  const [originalItems, setOriginalItems] = useState([]); // Backup of the original data
  const [activeReportId, setActiveReportId] = useState(null);
  const [userDetails, setUserDetails] = useState({}); // Cache for user details

  const userId = cookies.get('id');
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [checking, setchecking] = useState(true);
  const [number, setnumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [statuses, setStatuses] = useState({}); // State to store statuses fetched from API

  const [emailInput, setEmailInput] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [isCreatorWarning, setIsCreatorWarning] = useState(false);

  const [dateOpenN, setDateOpenN] = useState('');
  const [dateCloseN, setDateCloseN] = useState('');
  const [dateOpenNMinus1, setDateOpenNMinus1] = useState('');
  const [dateCloseNMinus1, setDateCloseNMinus1] = useState('');

  const handleDateOpenNChange = (event) => {
    const newDateOpenN = event.target.value;
    setDateOpenN(newDateOpenN);

    const datePlusOneYearMinusOneDay = new Date(newDateOpenN);
    datePlusOneYearMinusOneDay.setFullYear(datePlusOneYearMinusOneDay.getFullYear() + 1); // Add one year
    datePlusOneYearMinusOneDay.setDate(datePlusOneYearMinusOneDay.getDate() - 1); // Subtract one day
    setDateCloseN(datePlusOneYearMinusOneDay.toISOString().split('T')[0]);

    const dateMinusOneYear = new Date(newDateOpenN);
    dateMinusOneYear.setFullYear(dateMinusOneYear.getFullYear() - 1);
    setDateOpenNMinus1(dateMinusOneYear.toISOString().split('T')[0]);

    const dateMinusOneDay = new Date(newDateOpenN);
    dateMinusOneDay.setDate(dateMinusOneDay.getDate() - 1); // Subtract one day
    setDateCloseNMinus1(dateMinusOneDay.toISOString().split('T')[0]);
  };

  const nextPage = () => {
    let maxnum = Math.ceil(items.length / 9) - 1
    if (number < maxnum)
    {
      setCurrentPage(currentPage + 9);
      setnumber(number + 1);
    }
  };

  const prevPage = () => {
    if(number > 0)
    {
      setCurrentPage(currentPage - 9);
      setnumber(number - 1);
    }
  };

  const setfirstpage = () => {
    setnumber(0);
    setCurrentPage(0)
  };
  const setlastpage = () => {
    console.log(items.length / 9)
    let num= Math.ceil(items.length / 9) - 1
    console.log(num)
    setnumber(num);
    setCurrentPage(num *9)
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        // Perform a GET request to fetch all users
        const response = await fetch(`http://localhost:8000/accounts/users/?user_id=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        const users = await response.json();

        // Update userDetails state with fetched user data
        // Assuming users is an array of user objects and each user object has an id
        const newDetails = users.reduce((details, user) => {
          details[user.id] = user; // Use user ID as key
          return details;
        }, {});

        setUserDetails(newDetails);
      } catch (error) {
        console.error("Failed to fetch all users:", error);
      }
    };

    fetchAllUsers();
  }, [originalItems, userId]);

  // Handler to save input values to cookies and proceed to the next step
  const handleSaveAndNext = () => {
    // Access the input values
    const clientName = document.getElementById('clientName').value;
    const firstMonthFiscal = document.getElementById('firstMonthFiscal').value;

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

  const handleUserDeletion = async (email, reportId) => {
    console.log(`Delete user ${email} from ${reportId}`)

    const userIdToDelete = Object.keys(userDetails).find(userId => userDetails[userId].email === email);
    if (!userIdToDelete) {
      console.error("User ID not found for the email:", email);
      return;
    }

    const report = originalItems.find(item => item.id.toString() === reportId.toString());
    const updatedSharedWithUsers = report.shared_with_users.filter(userId => userId.toString() !== userIdToDelete.toString());

    try {
      const cookies = new Cookies();
      const csrftoken = cookies.get('csrftoken');
      const response = await fetch(`http://localhost:8000/reports/reports/${report.id}/share/?user_id=${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        credentials: 'include',
        body: JSON.stringify({ shared_with_users: updatedSharedWithUsers, shared_with_groups: report.shared_with_groups }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = response.json();
      console.log("Successfully updated report sharing:", data);

      // TODO : refresh the screen

    } catch (error) {
      console.error("Failed to update report sharing:", error);
    }
  };

  const handleUserAddition = async (reportId) => {
    const userToAdd = Object.entries(userDetails).find(([_, userDetails]) => userDetails.email === emailInput);
    if (userToAdd) {
      const [userIdToAdd] = userToAdd; // Destructure to get the user ID
      setEmailValid(true);
      const report = originalItems.find(item => item.id.toString() === reportId.toString());
      if (!report.shared_with_users.includes(userIdToAdd) && report.creator.toString() !== userIdToAdd.toString()) {
        const updatedSharedWithUsers = [...report.shared_with_users, userIdToAdd];

        try {
          const cookies = new Cookies();
          const csrftoken = cookies.get('csrftoken');
          const response = await fetch(`http://localhost:8000/reports/reports/${report.id}/share/?user_id=${userId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken,
            },
            credentials: 'include',
            body: JSON.stringify({ shared_with_users: updatedSharedWithUsers, shared_with_groups: report.shared_with_groups }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = response.json();
          console.log("Successfully updated report sharing:", data);

          // TODO : refresh the screen
        } catch (error) {
          console.error("Failed to update report sharing:", error);
        }
      } else if (report.creator.toString() === userIdToAdd.toString()) {
        setIsCreatorWarning(true); // Show warning if user is the creator
        setEmailValid(true); // Assuming the email is valid if it belongs to the creator
      } else {
        setIsCreatorWarning(false); // Ensure the warning is not shown if these conditions aren't met
      }
    } else {
      setEmailValid(false);
    }
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

  const startEdit = (reportId) => {
    console.log("Editing report ID:", reportId); // Debugging line
    setActiveReportId(reportId);
  };

  // Function to fetch statuses for all items
  const fetchStatuses = async () => {
    const statusPromises = items.map(async (item) => {
      if (item.task_id) {
        try {
          const response = await fetch(`http://localhost:8000/reports/task-status/${item.task_id}/`);
          if (response.ok) {
            const statusData = await response.json();
            setStatuses((prevStatuses) => ({
              ...prevStatuses,
              [item.id]: statusData.status // Assuming the API response contains a "status" field
            }));
          } else {
            throw new Error('Failed to fetch status');
          }
        } catch (error) {
          console.error('Error fetching status:', error);
          setStatuses((prevStatuses) => ({
            ...prevStatuses,
            [item.id]: 'Error' // Set status as error if there's an issue fetching
          }));
        }
      }
    });
    await Promise.all(statusPromises);
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
    .then(jsonData => {setOriginalItems(jsonData);})
    .catch(error => console.error("Failed to fetch reports:", error));
  }, [userId]);

  useEffect(() => {
    const fetchStatuses = async () => {
      const statusPromises = items.map(async (item) => {
        if (item.task_id) {
          try {
            const response = await fetch(`http://localhost:8000/reports/task-status/${item.task_id}/`);
            if (response.ok) {
              const statusData = await response.json();
              setStatuses((prevStatuses) => ({
                ...prevStatuses,
                [item.id]: statusData.status // Assuming the API response contains a "status" field
              }));
            } else {
              throw new Error('Failed to fetch status');
            }
          } catch (error) {
            console.error('Error fetching status:', error);
            setStatuses((prevStatuses) => ({
              ...prevStatuses,
              [item.id]: 'Error' // Set status as error if there's an issue fetching
            }));
          }
        }
      });
      await Promise.all(statusPromises);
    };

    if (originalItems.length > 0) {
      fetchStatuses();
    }
  }, [originalItems, items]);

  const getUserNames = (sharedWithUserIds) => {
    return sharedWithUserIds.map(userId => {
      const user = userDetails[userId];
      return user ? `${user.first_name} ${user.last_name}` : "Unknown";
    }).join(", "); // Join names with comma
  };

  const getUserEmails = (sharedWithUserIds) => {
    return sharedWithUserIds.reduce((acc, userId) => {
      const user = userDetails[userId];
      if (user && user.email) {
        acc.push(user.email); // Add email to accumulator
      }
      return acc;
    }, []);
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'PENDING':
      case 'STARTED':
        return { text: "En cours de génération", color: "orange" };
      case 'FAILURE':
        return { text: "Erreur", color: "red" };
      case 'SUCCESS':
        return { text: "Terminé", color: "green" };
      case 'Error': // This is for fetch errors
        return { text: "Erreur", color: "red" };
      default:
        return { text: "Erreur", color: "red" }; // Default case for empty task_id or unexpected status
    }
  };

  return (
    <>
      <Header />
      <div className="settingbackground">
        <div className="tableheader">Mes rapports CAC BI</div>
        <div className="tableheader1">Tableau de bord</div>
        <div className="flexdiv">
        <div className="">

              <Popup
        trigger={ <button className="button4"><img style={{width:"13px",paddingRight:"10px"}} src={unnion} alt="+"/>Générer un livrable</button>}
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
            <input id="dateOpenN" value={dateOpenN} className="settingdate1 styledate" type="date" onChange={handleDateOpenNChange} />
            <div className="settingdate1"><b>Date de clôture+</b></div>
            <input id="dateCloseN" value={dateCloseN} className="settingdate1 styledate" type="date" />
   </div>
<div className="redbox">
<select id="firstMonthFiscal" className="selectstyle">
  <option value="" disabled>Premier mois de l'exercise fiscal</option>
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
            <input id="dateOpenNMinus1" value={dateOpenNMinus1} className="settingdate1 styledate" type="date" />
            <div className="settingdate1"><b>Date de clôture+</b></div>
            <input id="dateCloseNMinus1" value={dateCloseNMinus1} className="settingdate1 styledate" type="date" />
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
    <div>Statut du livrable</div>
    <div>Suppression du dossier</div>
  </div>
  {items.slice(currentPage, currentPage + 9).map((item, index) => (

            <div className="tablecontent">
           <div>{items[index+currentPage].account_legal_name}</div>
           <div>{userDetails[items[index+currentPage].creator]?.first_name} {userDetails[items[index+currentPage].creator]?.last_name}</div>
           <div>
           <div>{getUserNames(items[index+currentPage].shared_with_users)}</div>
            <Popup
                trigger={<div className="flexdiv" style={{color:"blue", fontSize:"13px", cursor:"pointer"}} >
                <img style={{width:"20px", marginRight:"10px"}} src={edit} alt="edit" />
                <div onClick={() => startEdit(items[index].id)}>Ajouter ou supprimer un collaborateur</div>
              </div>}
                modal
                nested
            >
                {onopen => (
                    <div className="modal-overlay" onClick={onopen}>

                          {checking ? (
                      <div className="modal" onClick={e => {e.stopPropagation(); }}>
                      <>

                      <div className="modal-content">
                        <h3 style={{fontWeight:"500"}}>Modification de l’équpe <img style={{width:"30px"}} src={handshake} alt="handshake" /></h3>

                        <p> <img style={{width:"20px",marginRight:"12px"}} src={add} alt="add" />Ajouter un utilisateur
                        {!emailValid && ( // Only display the warning if the email is not valid
                          <>
                            <img style={{width:"20px", marginRight:"12px"}} src={alert} alt="alert" />
                            <span style={{color:"red"}}>Ce compte Datayoyo n'existe pas</span>
                          </>
                        )}
                        {isCreatorWarning && (
                          <>
                            {/* TODO orange alert */}
                            <img style={{width:"20px", marginRight:"12px"}} src={alert} alt="alert" />
                            <span style={{color:"orange"}}>L'utilisateur est le créateur du rapport</span>
                          </>
                        )}
                        </p>
                        <div>
                          <input
                            style={{border:"1px solid lightgrey",height:"40px",borderRadius:"10px",width:"40%",paddingLeft:"20px",color:"black"}}
                            placeholder="Email du compte Datayoyo"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                          />
                          <button style={{marginLeft:"2%",paddingLeft:"30px",paddingRight:"30px"}} className="button2" onClick={() => handleUserAddition(activeReportId)}>Valider</button>
                        </div>

                        <p> <img style={{width:"20px",marginRight:"12px"}} src={cross} alt="cross" />Supprimer un utilisateur</p>
                        <div className="flexdiv" style={{border:"1px solid lightgrey",height:"auto",borderRadius:"10px",width:"80%",padding:"10px", overflowY: "auto"}}>
                          {getUserEmails(item.shared_with_users).map((userEmail, emailIndex) => (
                            <div key={emailIndex} className="flexdiv" style={{border:"1px solid lightgrey",height:"30px",borderRadius:"10px",width:"100%",fontSize:"14px",marginTop:"10px", justifyContent: "space-between", padding: "5px"}}>
                              <div>{userEmail}</div>
                              <img style={{width:"25px",height:"25px", cursor: "pointer"}} src={trash} alt="trash" onClick={() => handleUserDeletion(userEmail, activeReportId)} />
                            </div>
                          ))}
                        </div>
                      </div>


                      </>
                      </div>
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

            {item.task_id ? ((() => {
                              const { text, color } = getStatusDisplay(statuses[item.id]);
                              return <div style={{ color }}>{text}</div>;
                            })()) : (<div style={{ color: "red" }}>Erreur</div>)
            }

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
    <div style={{marginTop:"10px",marginLeft:"90%"}} className="flexdiv ">
  <div onClick={setfirstpage} ><img style={{width:"13px",marginTop:"7px",marginRight:"10px"}} src={g0} alt="<<"/> </div>
    <div onClick={prevPage} ><img style={{width:"9px",marginTop:"7px",marginRight:"7px"}} src={g1} alt="<<"/></div>
    <div style={{width:"10px"}} className="bluebutton">{number+1}</div>
    <div onClick={nextPage}><img style={{width:"9px",marginTop:"7px",marginLeft:"10px"}} src={g2} alt="<<"/></div>
    <div onClick={setlastpage}><img style={{width:"13px",marginTop:"7px",marginLeft:"10px"}} src={g3} alt="<<"/></div>
  </div>
  </div>
  </div>

    </>
  );
}

export default TableOne;
