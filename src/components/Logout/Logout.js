import "./Logout.css";
import moc1 from '../../assets/moc1.png'
import moc2 from '../../assets/moc2.png'
import moc3 from '../../assets/moc3.png'
import moc4 from '../../assets/moc4.png'
import moc5 from '../../assets/moc5.png'
import moc6 from '../../assets/moc6.png'
import Logoheader from "../shared/Loginheader/Loginheader";
function Logout() {
  return (
    <>
      <Logoheader />
     <div className="flexdiv">
<div className="settingwidthofbox">
    <div className="titleoflogout">
    Solutions d’automatisation de rapports financiers <span className="colorgrey">Power BI.</span>
    </div>
    <div className="subtitlelogout">Découvrez comment nos outils innovants révolutionnent les métiers du chiffres :<b> Commissariat aux Comptes, Direction financière, Expertise-comptable ...</b></div>
    <button className="button3">Réserver une démo</button>
</div>
<div className="pictureswall flexdiv">
<div className="row1">
<img style={{width: '100%',marginTop: '-12%'}} src={moc1} alt="sda"/>
<img style={{width: '100%'}} src={moc3} alt="sda"/>
<img style={{width: '100%'}} src={moc5} alt="sda"/>
</div>
<div className="row2">
<img style={{width: '100%',marginTop: '-50%'}} src={moc1} alt="sda"/>
<img style={{width: '100%'}} src={moc6} alt="sda"/>
<img style={{width: '100%'}} src={moc4} alt="sda"/>
<img style={{width: '100%'}} src={moc2} alt="sda"/>
</div>
</div>
     </div>
    </>
  );
}

export default Logout;
