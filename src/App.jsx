import './styles/css/style.css';
import 'aframe';
import 'aframe-environment-component';
import 'aframe-extras';
import 'aframe-event-set-component';
import './components/CustomLookControls';
import EnvironmentSelection from './pages/EnviromentSelection';
import Editor from './pages/Editor';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnvironmentSelection />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </Router>
  );
}

export default App;
