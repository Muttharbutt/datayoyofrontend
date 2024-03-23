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
import Loading from 'react-loading';
function Login() {

  const [signupFormData, setSignupFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    company_name: '',
    password1: '',
    password2: '',
  });
  const cookies = new Cookies();
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLoginSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/accounts/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginFormData),
    });
    const data = await response.json();

    if (response.ok) {
      setLoading(false);
        cookies.set('id', data.user_id, { path: '/' });
        cookies.set('first_name', data.first_name, { path: '/' });
        cookies.set('last_name', data.last_name, { path: '/' });
        cookies.set('email', data.email, { path: '/' });
        history('/tableone');
        // Do something with the user ID, like redirecting to a new page or storing it in state
    } else {
        setLoading(false);
        const errorMessage = data.error || 'An unspecified error occurred'; // Fallback error message
        setError(errorMessage);
        setTimeout(() => setError(null), 5000);
    }
  }
  const handleSignupSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try
    {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/accounts/signup/`, {
        method: 'POST',
        body: JSON.stringify(signupFormData),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        setLoading(false);
        window.location.reload();
      }
      else
      {
        setLoading(false);
        const errorData = await response.json();
        const errorMessage = errorData.error || 'An unspecified error occurred'; // Fallback error message
        setError(errorMessage);
        setTimeout(() => setError(null), 5000);
      }
    } catch (error) {
      setLoading(false);
      setError('An error occurred',error);
      setTimeout(() => setError(null), 5000);
    }
  };
  return (
    <>
      <Logoheader />
      {loading && <>
        <div className={`loading-modal ${loading ? 'visible' : 'hidden'}`}>
      <div className="loading-content">
        <Loading type="balls" color="#007bff" height={50} width={50} />
      </div>
    </div>
      </>}
      {error && (
        <div className="error-message">{error}</div>
      )}
      <div className="settingbackground">
        <div className="loginheader">Bienvenue chez Datayoyo</div>
        <div className="flexdiv">
        <div className="signupdiv">
      <div className="formheader">Je m’inscris</div>
      <form onSubmit={handleSignupSubmit}>
        <input
          type="text"
          placeholder="Prénom *"
          className="logininputstyle givinginputmargin"
          name="first_name"
          value={signupFormData.first_name}
          onChange={handleSignupChange}
        />
        <div className="container">
          <input
            type="text"
            placeholder="Nom *"
            className="logininputstyle givinginputmargin1"
            name="last_name"
            value={signupFormData.last_name}
            onChange={handleSignupChange}
          />
          <img src={profileicon} alt="profile" className="imagestyleforlogin" />
        </div>
        <div className="container">
          <input
            type="email"
            placeholder="Email professionnel *"
            className="logininputstyle givinginputmargin1"
            name="email"
            value={signupFormData.email}
            onChange={handleSignupChange}
          />
          <img src={email} alt="profile" className="imagestyleforlogin" />
        </div>
        <div className="container">
          <input
            type="tel"
            placeholder="Numéro de téléphone *"
            className="logininputstyle givinginputmargin1"
            name="phone_number"
            value={signupFormData.phone_number}
            onChange={handleSignupChange}
          />
          <img src={number} alt="profile" className="imagestyleforlogin" />
        </div>
        <div className="container">
          <input
            type="text"
            placeholder="Entreprise"
            className="logininputstyle givinginputmargin1"
            name="company_name"
            value={signupFormData.company_name}
            onChange={handleSignupChange}
          />
          <img src={entreprise} alt="profile" className="imagestyleforlogin" />
        </div>
        <div className="container">
          <input
            type="password"
            placeholder="Mot de passe *"
            className="logininputstyle givinginputmargin1"
            name="password1"
            value={signupFormData.password1}
            onChange={handleSignupChange}
          />
          <img src={lock} alt="profile" className="imagestyleforlogin" />
        </div>
        <div className="container">
          <input
            type="password"
            placeholder="Confirmer mot de passe *"
            className="logininputstyle givinginputmargin1"
            name="password2"
            value={signupFormData.password2}
            onChange={handleSignupChange}
          />
          <img src={lock} alt="profile" className="imagestyleforlogin" />
        </div>
        <div className="flexdiv infostyle">
          <input
            type="checkbox"
            className="checkboxstyle"
            name="agreeTerms"
            checked={signupFormData.agreeTerms}
            onChange={handleSignupChange}
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
            <form onSubmit={handleLoginSubmit}>
            <input
              type="text"
              placeholder="Adresse email"
              className="logininputstyle givinginputmargin"
              name="username"
              value={loginFormData.username}
              onChange={handleLoginChange}
            />
            <div className="container">
              <input
                type="password"
                placeholder="Mot de passe"
                className="logininputstyle givinginputmargin1"
                name="password"
                value={loginFormData.password}
                onChange={handleLoginChange}
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
