import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

function App() {
  return (
   <div>
      <Seznam prvniPolozka="Ahoj Dito"/>
      <Seznam prvniPolozka=""/>
      <Tlacitko/>
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
