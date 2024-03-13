import "./EmailConfirm.css";
import Header from "../shared/header/Header";
import email from "../../assets/email.png";
function EmailConfirm() {
  return (
    <>
      <Header />
      <div className="settingbackground">
        <div className="signupheader">Mot de passe oublié ?</div>
        <div className="settingboxforemail">
            <div className="formsignupheader">Email de confirmation ?</div>
            <div className="container">
              <input
                type="text"
                placeholder="email"
                className="logininputstyle givinginputmargin1"
              />
              <img src={email} alt="profile" class="imagestyleforlogin" />
            </div>

            <button className="signupbuttonstyle">Me connecter</button>
          </div>
      </div>
    </>
  );
}

export default EmailConfirm;
