import { useEffect, useState } from 'react'
import Header from '@components/Header'
import { IShopItem, initialValue } from '@/utils/types'
import Empty from './Components/Empty'
import ShopList from './Components/ShopList'
import ActionDrawer from './Components/ActionDrawer'
import ActionDialog from './Components/ActionDialog'
import { useMutation, useQuery } from '@apollo/client'
import { Spinner } from '@material-tailwind/react'
import { ADD_A_ITEM, GET_ALL_ITEM } from '@/utils/api'
import toast from 'react-hot-toast'

const Dashboard = () => {
    const [items, setItems] = useState<IShopItem[]>([])
    const [openModal, setOpenModal] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [defaultValue, setDefaultValue] = useState<IShopItem>(initialValue)
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
        setDefaultValue(items.find((el) => el.id === id) || initialValue)
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

    const handleAction = ({
        id,
        itemName,
        description,
        count,
        purchased
    }: IShopItem) => {
        console.log(
            'action: ',
            isEdit,
            'value: ',
            id,
            itemName,
            description,
            count,
            purchased
        )

        if (isEdit) {
            //edit action
        } else {
            addShoppingItem({
                variables: {
                    itemName: itemName,
                    description: description,
                    count: count
                }
            })
        }
    }

    const { data, loading, error } = useQuery(GET_ALL_ITEM)
    const [
        addShoppingItem,
        { data: add_data, loading: add_loading, error: add_error }
    ] = useMutation(ADD_A_ITEM)

    if (error || add_error) {
        toast.error('Error occured.')
    }

    useEffect(() => {
        if (!loading && !error) {
            setItems(data.shoppingItems)
        }
    }, [loading, error, data])

    useEffect(() => {
        if (!loading && !error && add_data) {
            const itemsCopy = [...items]
            console.log('add: ', add_data)
            itemsCopy.push(add_data.addShoppingItem)
            setItems(itemsCopy)
            toast.success('Successfully added.')
            setOpenDrawer(false)
        }
    }, [add_loading, add_error, add_data])

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
                        setDefaultValue(initialValue),
                            setIsEdit(false),
                            setOpenDrawer(true)
                    }}
                    handleDelete={handleModal}
                    handleEdit={handleEdit}
                    handleChecked={handleChecked}
                />
            ) : (
                <Empty handleAction={setOpenDrawer} />
            )}
            <ActionDrawer
                isEdit={isEdit}
                isOpen={openDrawer}
                handleClose={() => setOpenDrawer(false)}
                defaultValue={defaultValue}
                handleAction={handleAction}
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
