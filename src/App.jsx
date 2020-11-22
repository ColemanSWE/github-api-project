import './App.css';
import { URLBar } from './Components/URLBar/URLBar';
import { Dashboard } from "./Components/Dashboard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <URLBar />
      </header>
    </div>
  );
}

export default App;
