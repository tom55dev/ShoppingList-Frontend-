import React from 'react'
import './index.css'
import App from './App'
import ReactDOM from 'react-dom'

import { ThemeProvider } from '@material-tailwind/react'

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root') as HTMLElement
)
