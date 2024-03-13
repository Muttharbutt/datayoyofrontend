import "./PasswordConfirm.css";
import Header from "../shared/header/Header";
import lock from "../../assets/lock.png";
function PasswordConfirm() {
  return (
    <>
      <Header />
      <div className="settingbackground">
        <div className="passwordheader">Réinitialisation du mot de passe</div>
        <div className="settingboxforpassowrd">
            <div className="formpassowrdheader">Nouveau mot de passe</div>
            <div className="container">
              <input
                type="text"
                placeholder="Nouveau mot de passe *"
                className="logininputstyle givinginputmargin1"
              />
              <img src={lock} alt="profile" class="imagestyleforlogin" />
            </div>
            <div className="container">
              <input
                type="text"
                placeholder="Confirmer le mot de passe *"
                className="logininputstyle givinginputmargin1"
              />
              <img src={lock} alt="profile" class="imagestyleforlogin" />
            </div>
            <button className="signupbuttonstyle">Valider</button>
          </div>
      </div>
    </>
  );
}

export default PasswordConfirm;
