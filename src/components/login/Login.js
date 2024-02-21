import "./Login.css";
import profileicon from "../../assets/profileicon.png";
import email from "../../assets/email.png";
import entreprise from "../../assets/entreprise.png";
import lock from "../../assets/lock.png";
import number from "../../assets/number.png";
import Header from "../shared/header/Header";
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import $ from 'jquery'; 
function Login() {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    phoneNumber: '',
    company: '',
    password1: '',
    password2: '',
    agreeTerms: false,
  });
  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = $.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
  const [formData1, setFormData1] = useState({
    username1: '',
    password11: '',
  });
  var csrftoken = getCookie('csrftoken');
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
    const response = await fetch('http://127.0.0.1:8000/login/  ', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify(formData1),
      credentials: "same-origin",
      withCredentials: true
    });
    console.log(response)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
const response = await fetch('http://127.0.0.1:8000/reports/register/', {
  method: 'POST',
  body: JSON.stringify(formData)
});
      console.log(response); // Handle response from backend
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <>
      <Header />
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
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <div className="container">
          <input
            type="text"
            placeholder="Nam *"
            className="logininputstyle givinginputmargin1"
            name="name"
            value={formData.name}
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
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <img src={number} alt="profile" className="imagestyleforlogin" />
        </div>
        <div className="container">
          <input
            type="text"
            placeholder="Entreprise"
            className="logininputstyle givinginputmargin1"
            name="company"
            value={formData.company}
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
              name="username1"
              value={formData1.username1}
              onChange={handleChange1}
            />
            <div class="container">
              <input
                type="password"
                placeholder="Mot de passe"
                className="logininputstyle givinginputmargin1"
                name="password11"
                value={formData1.password11}
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
