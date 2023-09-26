import { useEffect, useState } from 'react'
import Header from '@components/Header'
import { IShopItem } from '@/utils/types'
import Empty from './Components/Empty'
import ShopList from './Components/ShopList'
import ActionDrawer from './Components/ActionDrawer'
import ActionDialog from './Components/ActionDialog'
import { useQuery } from '@tanstack/react-query'
import { getAllShoppingList } from '@/utils/api'

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

    const handleEdit = (id: number | string) => {
        console.log('edit: ', id)
        setDefaultValue(items.find((el) => el.id === id))
        setIsEdit(true)
        setOpenDrawer(true)
    }

    const handleChecked = (id: number | string) => {
        setItems((el) => {
            return el.map((item) => {
                if (item.id === id) {
                    return { ...item, purchased: !item.purchased }
                } else {
                    return item
                }
            })
        })
    }

    const { data } = useQuery(['fetchAll'], getAllShoppingList, {
        select(data: any) {
            console.log('data: ', data)
            return data.data
        },
        onSuccess(data) {
            console.log('success: ', data)
        },
        onError(error) {
            console.log('error: ', error)
        }
    })

    return (
        <div className="flex flex-col items-center justify-center">
            <Header />
            {items.length ? (
                <ShopList
                    items={items}
                    handleOpen={() => {
                        setDefaultValue({
                            id: -1,
                            name: '',
                            desc: '',
                            count: 1,
                            purchased: false
                        }),
                            setIsEdit(false),
                            setOpenDrawer(true)
                    }}
                    handleDelete={handleModal}
                    handleEdit={handleEdit}
                    handleChecked={handleChecked}
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
