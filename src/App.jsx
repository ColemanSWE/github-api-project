import './App.css';
import { SummaryCard, GradeCard } from './Components';

function App() {
  return (
    <div className="App">
      <header className="App-container">
        <SummaryCard />
        <GradeCard />
      </header>
    </div>
  );
}

export default App;
