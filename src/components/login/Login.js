import "./Login.css";
import profileicon from "../../assets/profileicon.png";
import email from "../../assets/email.png";
import entreprise from "../../assets/entreprise.png";
import lock from "../../assets/lock.png";
import number from "../../assets/number.png";
import Header from "../shared/header/Header";
function Login() {
  return (
    <>
      <Header />
      <div className="settingbackground">
        <div className="loginheader">Bienvenue chez Datayoyo</div>
        <div className="flexdiv">
          <div className="signupdiv">
            <div className="formheader">Je m’inscris</div>
            <input
              type="text"
              placeholder="John"
              className="logininputstyle givinginputmargin"
            />
            <div class="container">
              <input
                type="text"
                placeholder="Nam *"
                className="logininputstyle givinginputmargin1"
              />
              <img src={profileicon} alt="profile" class="imagestyleforlogin" />
            </div>
            <div class="container">
              <input
                type="text"
                placeholder="Email professionnel *"
                className="logininputstyle givinginputmargin1"
              />
              <img src={email} alt="profile" class="imagestyleforlogin" />
            </div>
            <div class="container">
              <input
                type="text"
                placeholder="Numéro de téléphone *"
                className="logininputstyle givinginputmargin1"
              />
              <img src={number} alt="profile" class="imagestyleforlogin" />
            </div>
            <div class="container">
              <input
                type="text"
                placeholder="Entreprise"
                className="logininputstyle givinginputmargin1"
              />
              <img src={entreprise} alt="profile" class="imagestyleforlogin" />
            </div>
            <div class="container">
              <input
                type="text"
                placeholder="Mot de passe *"
                className="logininputstyle givinginputmargin1"
              />
              <img src={lock} alt="profile" class="imagestyleforlogin" />
            </div>
            <div class="container">
              <input
                type="text"
                placeholder="Confirmer mot de passe *"
                className="logininputstyle givinginputmargin1"
              />
              <img src={lock} alt="profile" class="imagestyleforlogin" />
            </div>
            <div className="flexdiv infostyle">
              <input type="checkbox" className="checkboxstyle" />
              <div className="flexdiv fontsizesmall">
                J’accepte les
                <span className="bluecolor">
                  conditions générales d’utilisation
                </span>
                et la{" "}
                <span className="bluecolor">charte de confidentialité</span>
              </div>
            </div>
            <button className="signupbuttonstyle">Créer un compte</button>
          </div>
          <div className="signupdiv">
            <div className="formheader">Je m’inscris</div>
            <input
              type="text"
              placeholder="john.hill@datayoyo.fr"
              className="logininputstyle givinginputmargin"
            />
            <div class="container">
              <input
                type="text"
                placeholder="Mot de passe"
                className="logininputstyle givinginputmargin1"
              />
              <img src={lock} alt="profile" class="imagestyleforlogin" />
            </div>
            <div className="settinglink bluecolor fontsizesmall">
              J’ai oublié mon mot de passe
            </div>
            <button className="signupbuttonstyle">Me connecter</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
