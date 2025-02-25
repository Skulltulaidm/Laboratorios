import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { SimpleForm } from './components/SimpleForm'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SimpleForm />
  </StrictMode>,
)
