import { StrictMode , createElement} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import reactImg from './assets/react.svg'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <browserRouter>
    <App />
  </browserRouter>
)
