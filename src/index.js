import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App/App';

// we want to call BrowserRouter "Router" instead. We can import something as something else
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* for our Routes element to work, we must have our App within the Router */}
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
