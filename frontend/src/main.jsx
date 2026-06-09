import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import global theme (premium design tokens and components)
import './styles/theme.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
