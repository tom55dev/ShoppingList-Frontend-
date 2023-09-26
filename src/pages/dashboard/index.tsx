import { useEffect, useState } from 'react'
import Header from '@components/Header'
import { IShopItem, initialValue } from '@/utils/types'
import Empty from './Components/Empty'
import ShopList from './Components/ShopList'
import ActionDrawer from './Components/ActionDrawer'
import ActionDialog from './Components/ActionDialog'
import { useMutation, useQuery } from '@apollo/client'
import { Spinner } from '@material-tailwind/react'
import {
    ADD_A_ITEM,
    DELETE_ITEM,
    GET_ALL_ITEM,
    UPDATE_ITEM,
    UPDATE_PURCHASE_STATUS
} from '@/utils/api'
import toast from 'react-hot-toast'

const Dashboard = () => {
    const [items, setItems] = useState<IShopItem[]>([])
    const [openModal, setOpenModal] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [defaultValue, setDefaultValue] = useState<IShopItem>(initialValue)
    const [isEdit, setIsEdit] = useState(false)
    const [deleteId, setDeleteId] = useState<number>(-1)
    const [checkId, setCheckId] = useState<number>(-1)
    const [updatedValue, setUpdatedValue] = useState<IShopItem>(initialValue)

    const handleModal = (id: number) => {
        setOpenModal(true)
        setDeleteId(id)
    }

    const handleDelete = () => {
        deleteShoppingItem({ variables: { id: deleteId } })
    }

    const handleEdit = (id: number) => {
        console.log('edit: ', id)
        setDefaultValue(items.find((el) => el.id === id) || initialValue)
        setIsEdit(true)
        setOpenDrawer(true)
    }

    const handleChecked = (id: number) => {
        setCheckId(id)
        const found = items.find((el) => el.id === id)
        if (!found) return
        updatePurchasedStatus({
            variables: {
                id: id,
                purchased: !found.purchased
            }
        })
    }

    const handleAction = ({
        id,
        itemName,
        description,
        count,
        purchased
    }: IShopItem) => {
        if (isEdit) {
            //edit action
            const updated = {
                id: id,
                itemName: itemName,
                description: description,
                count: count,
                purchased: purchased
            }
            setUpdatedValue(updated)
            updateShoppingItem({
                variables: updated
            })
        } else {
            //add action
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
    const [
        deleteShoppingItem,
        { data: delete_data, loading: delete_loading, error: delete_error }
    ] = useMutation(DELETE_ITEM)
    const [
        updatePurchasedStatus,
        { data: status_data, loading: status_loading, error: status_error }
    ] = useMutation(UPDATE_PURCHASE_STATUS)

    const [
        updateShoppingItem,
        { data: update_data, loading: update_loading, error: update_error }
    ] = useMutation(UPDATE_ITEM)

    if (error || add_error || delete_error || status_error || update_error) {
        toast.error('Error occured.')
    }

    useEffect(() => {
        if (!loading && !error && data) {
            setItems(data.shoppingItems)
        }
    }, [loading, error, data])

    useEffect(() => {
        if (!loading && !error && add_data) {
            const itemsCopy = [...items]
            itemsCopy.push(add_data.addShoppingItem)
            setItems(itemsCopy)
            toast.success('Successfully added.')
            setOpenDrawer(false)
        }
    }, [add_loading, add_error, add_data])

    useEffect(() => {
        if (!delete_loading && !delete_error && delete_data) {
            if (delete_data.deleteShoppingItem) {
                setItems(items.filter((el) => el.id !== deleteId))
                toast.success('Successfully deleted.')
            } else {
                toast.error('Delete failed.')
            }
        }
    }, [delete_loading, delete_error, delete_data])

    useEffect(() => {
        if (!status_loading && !status_error && status_data) {
            if (status_data.updatePurchasedStatus) {
                setItems((el) => {
                    return el.map((item) => {
                        if (item.id === checkId) {
                            return { ...item, purchased: !item.purchased }
                        } else {
                            return item
                        }
                    })
                })
                toast.success('Successfully updated.')
            } else {
                toast.error('Delete failed.')
            }
        }
    }, [status_loading, status_error, status_data])

    useEffect(() => {
        if (!update_loading && !update_error && update_data) {
            if (update_data.updateShoppingItem) {
                setOpenDrawer(false)
                setItems(
                    items.map((el) => {
                        if (el.id === updatedValue.id) return updatedValue
                        else return el
                    })
                )
                toast.success('Successfully updated.')
            } else {
                toast.error('Delete failed.')
            }
        }
    }, [update_loading, update_error, update_data])

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
