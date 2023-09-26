import { gql } from '@apollo/client'

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const GET_ALL_ITEM = gql`
    query {
        shoppingItems {
            id
            itemName
            description
            count
            purchased
        }
    }
`
