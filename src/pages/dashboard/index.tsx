import { useEffect, useState } from 'react'
import Header from '@components/Header'
import { IShopItem } from '@/utils/types'
import Empty from './Components/Empty'
import ShopList from './Components/ShopList'
import ActionDrawer from './Components/ActionDrawer'
import ActionDialog from './Components/ActionDialog'
import { gql, useQuery } from '@apollo/client'
import { Spinner } from '@material-tailwind/react'
import { GET_ALL_ITEM } from '@/utils/api'
import toast from 'react-hot-toast'

const Dashboard = () => {
    const [items, setItems] = useState<IShopItem[]>([])
    const [openModal, setOpenModal] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [defaultValue, setDefaultValue] = useState<IShopItem>()
    const [isEdit, setIsEdit] = useState(false)
    const [deleteId, setDeleteId] = useState<number>(-1)

    const handleModal = (id: number) => {
        setOpenModal(true)
        setDeleteId(id)
    }

    const handleDelete = () => {
        console.log('delete: ', deleteId)
    }

    const handleEdit = (id: number) => {
        console.log('edit: ', id)
        setDefaultValue(items.find((el) => el.id === id))
        setIsEdit(true)
        setOpenDrawer(true)
    }

    const handleChecked = (id: number) => {
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

    const { data, loading, error } = useQuery(GET_ALL_ITEM)

    if (error) {
        toast.error('Error occured.')
        console.error('fetch error: ', error)
    }

    useEffect(() => {
        if (!loading && !error) {
            setItems(data.shoppingItems)
        }
    }, [loading, error, data])

    return (
        <div className="flex flex-col items-center justify-center">
            <Header />
            {loading ? (
                <Spinner
                    className="text-[#1871E8] w-16 h-16 mt-[124px]"
                    color="white"
                />
            ) : items.length ? (
                <ShopList
                    items={items}
                    handleOpen={() => {
                        setDefaultValue({
                            id: -1,
                            itemName: '',
                            description: '',
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
