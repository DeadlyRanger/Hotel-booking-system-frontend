import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ApiContext } from './context/ApiContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ApiContext>
    <Toaster position='items-center top-0' />
    <App />
    </ApiContext>
    </BrowserRouter>
  </StrictMode>,
)
