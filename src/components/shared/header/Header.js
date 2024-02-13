import "./Header.css";
import mainlogo from "../../../assets/logo.png";
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
        <div className="acoountlogo">JH</div>
      </div>
    </>
  );
}

export default Header;
