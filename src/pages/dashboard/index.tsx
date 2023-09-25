import { useState } from 'react'
import Header from '@components/Header'
import { IShopItem } from '@/utils/types'
import Empty from './Components/Empty'
import ShopList from './Components/ShopList'
import ActionDrawer from './Components/ActionDrawer'
import ActionDialog from './Components/ActionDialog'

const Dashboard = () => {
    const [items, setItems] = useState<IShopItem[]>([
        {
            id: 1,
            name: 'Potato',
            desc: 'Potato is delicious.',
            count: 1,
            purchased: false
        },
        {
            id: 2,
            name: 'Tomato',
            desc: 'Tomato is not delicious.',
            count: 10,
            purchased: true
        }
    ])
    const [openModal, setOpenModal] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [defaultValue, setDefaultValue] = useState<IShopItem>()
    const [isEdit, setIsEdit] = useState(false)
    const [deleteId, setDeleteId] = useState<number | string>('')

    const handleModal = (id: number | string) => {
        setOpenModal(true)
        setDeleteId(id)
    }

    const handleDelete = () => {
        console.log('delete: ', deleteId)
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <Header />
            {items.length ? (
                <ShopList
                    items={items}
                    handleOpen={() => {
                        setIsEdit(false), setOpenDrawer(true)
                    }}
                    handleDelete={handleModal}
                />
            ) : (
                <Empty />
            )}
            <ActionDrawer
                isEdit={isEdit}
                isOpen={openDrawer}
                handleClose={() => setOpenDrawer(false)}
                {...defaultValue}
            />
            <ActionDialog
                deleteId={deleteId}
                isOpen={openModal}
                handleDialog={setOpenModal}
                handleDelete={handleDelete}
            />
        </div>
    )
}

export default Dashboard
