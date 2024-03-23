import React, { useState } from 'react';
import './checktype.css';
import question from "../../assets/question.png"
import Cookies from 'universal-cookie';
import Loading from 'react-loading';
function Checktype({ fileN, fileNMinus1 }){
  const cookies = new Cookies();
const check=cookies.get('check')
const check1=cookies.get('check1')
const [selectedValue, setSelectedValue] = useState('');
const [selectedValue1, setSelectedValue1] = useState('');
const [selectedValue2, setSelectedValue2] = useState('');
const [selectedValue3, setSelectedValue3] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const handleSelectChange = (event) => {
  setSelectedValue(event.target.value);
};
const handleSelectChange1 = (event) => {
  setSelectedValue1(event.target.value);
};

const handleSelectChange2 = (event) => {
  setSelectedValue2(event.target.value);
};
const handleSelectChange3 = (event) => {
  setSelectedValue3(event.target.value);
};
  const handleSaveAndNextClick = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file_n", fileN);
    formData.append("file_n_minus_1", fileNMinus1);
    formData.append("encoding_n",selectedValue)
    formData.append("delimiter_n",selectedValue1)
    formData.append("encoding_n_minus_1",selectedValue2)
    formData.append("delimiter_n_minus_1",selectedValue3)
    formData.append("creator", cookies.get('id'));
    formData.append("account_legal_name", cookies.get("clientName"));
    formData.append("start_date_n_minus_1", cookies.get("dateOpenNMinus1"));
    formData.append("end_date_n_minus_1", cookies.get("dateCloseNMinus1"));
    formData.append("start_date_n", cookies.get("dateOpenN"));
    formData.append("end_date_n", cookies.get("dateCloseN"));

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/reports/reports/`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setLoading(false);
        const data = await response.json();
        console.log("Success:", data);
        cookies.set('reportId', data.id, { path: '/' });

        cookies.set('headersNMinus1', data.headers_n_minus_1, { path: '/' });
        cookies.set('headersN', data.headers_n, { path: '/' });

        window.location.href = "http://localhost:3000/steptwo";
      } else {
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
        <div className="settingside">Étape 1 : Importation des bases</div>
        <div className="settingside1">C'est un fichier texte !<b>Quelques réglages ensemble et tout sera prêt pour l’importation.</b> </div>
        <div className="flexdiv">
          <div className="box2">
          <div className="settingsetponeheader textspan">1.Exercice N-1
             </div>

          <div className='divinsidestepone'>
          <div className={`settingsetponeheader parent ${check ? '' : 'customColor'}`}><span className='textspan1'>Sélectionnez le délimiteur utilisé dans votre fichier
          <img style={{width:"40px"}} src={question}/>  </span>

    <div className="logoutdiv1">
      <div className='textsetting'>   <img style={{width:"40px"}} src={question}/>  Informations importante : importation des données comptables.</div>
 <ul className='textsetting1'>
  <li className='paddingboot'>Un délimiteur est un caractère utilisé pour séparer les différentes données dans un fichier texte, notamment dans les fichiers CSV ou TXT. Le choix du bon délimiteur est essentiel pour permettre une lecture correcte et une séparation adéquate des informations lors de l'importation de votre fichier..</li>
  <li>Les délimiteurs les plus fréquemment utilisés dans les Fichiers des Écritures Comptables (FEC) et d'autres types de fichiers de données incluent la virgule (,), le point-virgule (;), la tabulation (Tab) et le pipe (|). La sélection du délimiteur dépend de la manière dont votre fichier a été structuré à l'origine.</li>
 <li>Identifier correctement le délimiteur utilisé dans votre fichier permet d'assurer que chaque colonne et chaque entrée de données sont correctement importées et affichées dans l'application, garantissant ainsi l'intégrité et la précision des données traitées.</li>

 </ul>
</div>

             </div>
             <select value={selectedValue} onChange={handleSelectChange} className={`selectstyle1  ${check ? '' : 'customColor1'}`} disabled={!check}>
               <option default value="" disabled>select</option>
               <option value="utf-8">utf-8</option>
               <option value="iso-8859-1">iso-8859-1</option>
               <option value="utf-16">utf-16</option>
               <option value="ansi">ansi</option>
               <option value="cp1252">windows-1252</option>
             </select>

             <div  className={`settingsetponeheader parent ${check ? '' : 'customColor'}`}><span className='textspan1'>Sélectionnez l'encodage de votre fichier
          <img style={{width:"40px"}} src={question}/>  </span>

    <div className="logoutdiv1">
      <div className='textsetting'>   <img style={{width:"40px"}} src={question}/>  Informations importante : importation des données comptables.</div>
 <ul className='textsetting1'>
  <li className='paddingboot'>L'encodage est un standard qui permet de représenter les caractères textuels sous forme de données numériques que l'ordinateur peut lire et manipuler. Choisir le bon encodage pour votre fichier est essentiel pour assurer que tous les caractères, y compris les accents et les symboles spéciaux, s'affichent correctement.</li>
  <li>Dans le cas du Fichier des Écritures Comptables (FEC) :</li>
  <ul>
      <li>Les encodages les plus fréquemment utilisés pour les FEC sont UTF-8, ISO-8859-1 (Latin-1), et ANSI.</li>
      <li>Ces critères techniques ont leur importance car, s’ils ne sont pas respectés, ils peuvent remettre en cause la lisibilité du fichier par le logiciel Alto 2 de l’administration.</li>
      <li>L’administration fiscale est uniquement capable de lire les fichiers utilisant les jeux de caractères ASCII, ISO 8859-15 et EBCDIC.</li>
    </ul>
 </ul>
</div>

             </div>

             <select value={selectedValue1} onChange={handleSelectChange1} className={`selectstyle1  ${check ? '' : 'customColor1'}`} disabled={!check}>
              <option default value="" disabled>select</option>
              <option value="tab">tab</option>
              <option value="|">|</option>
              <option value=",">,</option>
              <option value=";">;</option>
            </select>


          </div>
          </div>
          <div className="box2">
          <div className="textspan ">2.Exercice N-1
    </div>
    <div className='divinsidestepone'>
          <div  className={`settingsetponeheader parent ${check1 ? '' : 'customColor'}`}><span className='textspan1'>Sélectionnez le délimiteur utilisé dans votre fichier
          <img style={{width:"40px"}} src={question}/>  </span>

    <div className="logoutdiv1">
      <div className='textsetting'>   <img style={{width:"40px"}} src={question}/>  Informations importante : importation des données comptables.</div>
 <ul className='textsetting1'>
  <li className='paddingboot'>Un délimiteur est un caractère utilisé pour séparer les différentes données dans un fichier texte, notamment dans les fichiers CSV ou TXT. Le choix du bon délimiteur est essentiel pour permettre une lecture correcte et une séparation adéquate des informations lors de l'importation de votre fichier..</li>
  <li>Les délimiteurs les plus fréquemment utilisés dans les Fichiers des Écritures Comptables (FEC) et d'autres types de fichiers de données incluent la virgule (,), le point-virgule (;), la tabulation (Tab) et le pipe (|). La sélection du délimiteur dépend de la manière dont votre fichier a été structuré à l'origine.</li>
 <li>Identifier correctement le délimiteur utilisé dans votre fichier permet d'assurer que chaque colonne et chaque entrée de données sont correctement importées et affichées dans l'application, garantissant ainsi l'intégrité et la précision des données traitées.</li>

 </ul>
</div>

             </div>
             <select value={selectedValue2} onChange={handleSelectChange2} className={`selectstyle1  ${check1 ? '' : 'customColor1'}`} disabled={!check1}>
               <option default value="" disabled>select</option>
               <option value="utf-8">utf-8</option>
               <option value="iso-8859-1">iso-8859-1</option>
               <option value="utf-16">utf-16</option>
               <option value="ansi">ansi</option>
               <option value="cp1252">windows-1252</option>
             </select>

             <div  className={`settingsetponeheader parent ${check1 ? '' : 'customColor'}`}><span className='textspan1'>Sélectionnez l'encodage de votre fichier
          <img style={{width:"40px"}} src={question}/>  </span>

    <div className="logoutdiv1">
      <div className='textsetting'>   <img style={{width:"40px"}} src={question}/>  Informations importante : importation des données comptables.</div>
 <ul className='textsetting1'>
  <li className='paddingboot'>L'encodage est un standard qui permet de représenter les caractères textuels sous forme de données numériques que l'ordinateur peut lire et manipuler. Choisir le bon encodage pour votre fichier est essentiel pour assurer que tous les caractères, y compris les accents et les symboles spéciaux, s'affichent correctement.</li>
  <li>Dans le cas du Fichier des Écritures Comptables (FEC) :</li>
  <ul>
      <li>Les encodages les plus fréquemment utilisés pour les FEC sont UTF-8, ISO-8859-1 (Latin-1), et ANSI.</li>
      <li>Ces critères techniques ont leur importance car, s’ils ne sont pas respectés, ils peuvent remettre en cause la lisibilité du fichier par le logiciel Alto 2 de l’administration.</li>
      <li>L’administration fiscale est uniquement capable de lire les fichiers utilisant les jeux de caractères ASCII, ISO 8859-15 et EBCDIC.</li>
    </ul>
 </ul>
</div>

             </div>

             <select value={selectedValue3} onChange={handleSelectChange3} className={`selectstyle1  ${check1 ? '' : 'customColor1'}`} disabled={!check1}>
               <option default value="" disabled>select</option>
               <option value="tab">tab</option>
               <option value="|">|</option>
               <option value=",">,</option>
               <option value=";">;</option>
             </select>


          </div>
          </div>

        </div>
        <div style={{marginTop:"10%",paddingLeft:"42%"}}>
        <button style={{background:"white",border:"1px solid #1054FB",borderRadius:"10px",padding:"10px",paddingLeft:"20px",paddingRight:"20px",color:"#1054FB"}} >Annuler </button>
        <button style={{background:"#1054FB",marginLeft:"5%",border:"1px solid #1054FB",borderRadius:"10px",padding:"10px",paddingLeft:"20px",paddingRight:"20px",color:"white"}} onClick={handleSaveAndNextClick}>Enregistrer et passer à l’étape suivante</button>

        </div>

      </div>
</>
  );
}

export default Checktype;
