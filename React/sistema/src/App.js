import './App.css';
import Menu from './components/utils/Menu';
import {BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Menu />
      </Router>
    </div>
  );
}

export default App;
