import { useState } from 'react'
import Header from '@components/Header'
import { IShopItem } from '@/utils/types'
import Empty from './Components/Empty'
import ShopList from './Components/ShopList'

const Dashboard = () => {
    const [items, setItems] = useState<IShopItem[]>([
        {
            name: 'Potato',
            desc: 'Potato is delicious.',
            count: 1,
            purchased: false
        },
        {
            name: 'Tomato',
            desc: 'Tomato is not delicious.',
            count: 10,
            purchased: true
        }
    ])

    return (
        <div className="flex flex-col items-center justify-center">
            <Header />
            {items.length ? <ShopList items={items} /> : <Empty />}
        </div>
    )
}

export default Dashboard
