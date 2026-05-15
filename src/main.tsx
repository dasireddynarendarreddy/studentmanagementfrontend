
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter } from 'react-router-dom';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
