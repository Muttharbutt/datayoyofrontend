import mainlogo from "../../../assets/logo.png";
import { useNavigate } from 'react-router-dom';
function Logoheader() {
    const history = useNavigate();

    const handleClick = () => {
        history('/login')// Navigate to '/login' when the button is clicked
    }
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
        <button onClick={handleClick} className="button23 button2">Login</button>
              
        
      </div>
    </>
  );
}

export default Logoheader;
