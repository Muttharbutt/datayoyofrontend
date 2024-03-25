import "./Header.css";
import mainlogo from "../../../assets/logo.png";
import Popup from "reactjs-popup";
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';


function Header() {
  const cookies = new Cookies();
  let  email=cookies.get("email")
  let  name=cookies.get("first_name") + " " + cookies.get("last_name")
  let  id=cookies.get("id")
  const navigate = useNavigate();

  const navigateToRoot = () => {
    navigate('/');
  };
// Remove all cookies

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
                {<div className="acoountlogo">{id}</div>}
                position="bottom center">
                  <div className="logoutdiv">
                  <div className="acoountlogo logostyling">{id}</div>
                  <p className="titleoflogout1">{name}</p>
                  <p className="titleoflogout2">{email}</p>
                  <button onClick={() => {cookies.remove("id"); navigateToRoot();}} style={{ margin: "0%", marginBottom: "5%", marginTop: "5%" }} className="button3">Se déconnecter</button>

                  </div>

            </Popup>

      </div>
    </>
  );
}

export default Header;
