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

export const ADD_A_ITEM = gql`
    mutation AddShoppingItem(
        $itemName: String!
        $description: String!
        $count: Int!
    ) {
        addShoppingItem(
            itemName: $itemName
            description: $description
            count: $count
        ) {
            id
            itemName
            description
            count
            purchased
        }
    }
`
