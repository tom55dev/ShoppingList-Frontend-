export interface IShopItem {
    id: number
    itemName: string
    description: string
    count: number
    purchased: boolean
}

export const initialValue = {
    id: -1,
    itemName: '',
    description: '',
    count: 1,
    purchased: false
}
