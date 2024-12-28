
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import 'remixicon/fonts/remixicon.css'
createRoot(document.getElementById('root')!).render(
 <BrowserRouter >
  <App />
 </BrowserRouter>
)
