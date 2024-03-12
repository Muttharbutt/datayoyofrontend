import "./Login.css";
import profileicon from "../../assets/profileicon.png";
import email from "../../assets/email.png";
import entreprise from "../../assets/entreprise.png";
import lock from "../../assets/lock.png";
import number from "../../assets/number.png";
import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Logoheader from "../shared/Loginheader/Loginheader";
function Login() {

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    company_name: '',
    password1: '',
    password2: '',
  });
  const cookies = new Cookies();
  const [formData1, setFormData1] = useState({
    username: '',
    password: '',
  });
  const history = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const handleChange1 = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData1(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
    
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/accounts/login/', {
      method: 'POST',
      contentType:'application/json',
      body: JSON.stringify(formData1),
    });
    const data = await response.json();

    if (response.ok) {
        cookies.set('id', data.user_id, { path: '/' });
        cookies.set('name', data.user_name, { path: '/' });
        cookies.set('email', data.email, { path: '/' });
        history('/tableone');
        // Do something with the user ID, like redirecting to a new page or storing it in state
    } else {
        // Authentication failed
        console.log('User ID:', data.error);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
const response = await fetch('http://127.0.0.1:8000/accounts/signup/', {
  method: 'POST',
  body: JSON.stringify(formData),
  contentType:'application/json'
});
      console.log(response); // Handle response from backend
      window.location.reload();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <>
      <Logoheader />
      <div className="settingbackground">
        <div className="loginheader">Bienvenue chez Datayoyo</div>
        <div className="flexdiv">
        <div className="signupdiv">
      <div className="formheader">Je m’inscris</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="John"
          className="logininputstyle givinginputmargin"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <div className="container">
          <input
            type="text"
            placeholder="Nam *"
            className="logininputstyle givinginputmargin1"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <img src={profileicon} alt="profile" className="imagestyleforlogin" />
        </div>
        <div className="container">
          <input
            type="email"
            placeholder="Email professionnel *"
            className="logininputstyle givinginputmargin1"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <img src={email} alt="profile" className="imagestyleforlogin" />
        </div>
        <div className="container">
          <input
            type="tel"
            placeholder="Numéro de téléphone *"
            className="logininputstyle givinginputmargin1"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
          <img src={number} alt="profile" className="imagestyleforlogin" />
        </div>
        <div className="container">
          <input
            type="text"
            placeholder="Entreprise"
            className="logininputstyle givinginputmargin1"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
          />
          <img src={entreprise} alt="profile" className="imagestyleforlogin" />
        </div>
        <div className="container">
          <input
            type="password"
            placeholder="Mot de passe *"
            className="logininputstyle givinginputmargin1"
            name="password1"
            value={formData.password1}
            onChange={handleChange}
          />
          <img src={lock} alt="profile" className="imagestyleforlogin" />
        </div>
        <div className="container">
          <input
            type="password"
            placeholder="Confirmer mot de passe *"
            className="logininputstyle givinginputmargin1"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
          />
          <img src={lock} alt="profile" className="imagestyleforlogin" />
        </div>
        <div className="flexdiv infostyle">
          <input
            type="checkbox"
            className="checkboxstyle"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
          />
          <div className="flexdiv fontsizesmall">
            J’accepte les
            <span className="bluecolor">conditions générales d’utilisation</span> et la{' '}
            <span className="bluecolor">charte de confidentialité</span>
          </div>
        </div>
        <button type="submit" className="signupbuttonstyle">
          Créer un compte
        </button>
      </form>
    </div>
          <div className="signupdiv">
            <div className="formheader">Je m’inscris</div>
            <form onSubmit={handleSubmit1}>
            <input
              type="text"
              placeholder="john.hill@datayoyo.fr"
              className="logininputstyle givinginputmargin"
              name="username"
              value={formData1.username}
              onChange={handleChange1}
            />
            <div class="container">
              <input
                type="password"
                placeholder="Mot de passe"
                className="logininputstyle givinginputmargin1"
                name="password"
                value={formData1.password}
                onChange={handleChange1}
              />
              <img src={lock} alt="profile" class="imagestyleforlogin" />
            </div>
            <div className="settinglink bluecolor fontsizesmall">
              J’ai oublié mon mot de passe
            </div>
            <button  type="submit" className="signupbuttonstyle">Me connecter</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
