
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from "./components/ui/provider"
import 'bootstrap-icons/font/bootstrap-icons.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
createRoot(document.getElementById('root')!).render(
  <Provider>
    <App />
  </Provider>,
)
