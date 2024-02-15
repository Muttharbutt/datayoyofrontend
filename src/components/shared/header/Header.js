import "./Header.css";
import mainlogo from "../../../assets/logo.png";
import Popup from "reactjs-popup";
function Header() {
  return (
    <>
      <div className="headerbarbox ">
        <img className="logostyle" src={mainlogo} alt="logo" />
        <div className="headertext">
          <div className="headerheading">Pourquoi Datayoyo ?</div>
          <div className="headerheading">Accompagnement personnalisé</div>
          <div className="headerheading">CAC BI</div>
          <div className="headerheading">Nous contacter</div>
        </div>
        <Popup trigger=
                {<div className="acoountlogo">.</div>}
                position="bottom center">
                  <div className="logoutdiv">
                  <div className="acoountlogo logostyling">.</div>
                  <p className="titleoflogout1">John Hill</p>
                  <p className="titleoflogout2">john.hill@datayoyo.fr</p>
                <button style={{margin:"0%",marginBottom:"5%",marginTop:"5%"}} className="button3">Se déconnecter</button>
                  </div>
             
            </Popup>
        
      </div>
    </>
  );
}

export default Header;
