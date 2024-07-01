import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/context/ThemeProvider.tsx"



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <App />
        <Toaster />
    </ThemeProvider>
  </React.StrictMode>,
)
