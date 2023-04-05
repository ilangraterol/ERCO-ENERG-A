import './App.css';
import CitySelector from './components/CitySelector';
import CountrySelector from './components/CountrySelector';
import PopulationTable from './components/PopulationTable';
import StateSelector from './components/StateSelector';



function App() {
  return (
    <div className="App">

      <h1>ERCO ENERGÍA</h1>
      <header className="App-header">
      
      <CountrySelector />
      {/* <CitySelector /> */}
      {/* <StateSelector /> */}
      {/* <PopulationTable /> */}
      </header>
    </div>
  );
}

export default App;
