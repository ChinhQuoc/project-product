import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <div>
        <Layout></Layout>
      </div>
    </Router>
  );
}

export default App;
