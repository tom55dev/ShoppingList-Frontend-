import React from 'react'
import './index.css'
import App from './App'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-tailwind/react'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink
} from '@apollo/client'
import { API_URL } from './utils/api'
import { Toaster } from 'react-hot-toast'

const client = new ApolloClient({
    link: new HttpLink({
        uri: API_URL,
        fetchOptions: 'POST'
    }),
    cache: new InMemoryCache()
})

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider>
            <ApolloProvider client={client}>
                <App />
                <Toaster />
            </ApolloProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root') as HTMLElement
)
