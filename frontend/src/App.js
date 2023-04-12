import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import SeznamPravidel from './SeznamPravidel';
import DetailPravidla from './DetailPravidla';

function App() {
  return (
   <div>
     <DetailPravidla/>
   </div>
  );
}

function Seznam(props){
  const a = props.prvniPolozka + props.prvniPolozka;

  return(
    <ul>
      <li>{a}</li>
      <li>P1</li>
      <li>P1</li>
      <li>P1</li>
    </ul>
  );
}

function Tlacitko(props){
  const [kolikrat, setKolikrat] = useState(0);

  return (
    <button onClick={() => setKolikrat(kolikrat + 1)}>Kliknul jsi {kolikrat}</button>
  )
}

export default App;
