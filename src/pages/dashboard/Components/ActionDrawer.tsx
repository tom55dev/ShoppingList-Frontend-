import { IShopItem } from '@/utils/types'
import {
    Button,
    Drawer,
    IconButton,
    Input,
    Textarea,
    Typography
} from '@material-tailwind/react'
import { useEffect, useState } from 'react'

interface IActionDrawer {
    isEdit?: boolean
    isOpen: boolean
    defaultValue: IShopItem
    handleClose: () => unknown
    handleAction: ({
        id,
        itemName,
        description,
        count,
        purchased
    }: IShopItem) => void
}

const ActionDrawer = ({
    isEdit = false,
    isOpen,
    defaultValue,
    handleClose,
    handleAction
}: IActionDrawer) => {
    const [isChecked, setChecked] = useState<boolean>()
    useEffect(
        () => setChecked(!!defaultValue.purchased),
        [defaultValue.purchased]
    )
    const [itemName, setItemName] = useState(defaultValue.itemName)
    const [description, setDescription] = useState(defaultValue.description)
    const [count, setCount] = useState<number>(defaultValue.count)

    return (
        <Drawer
            placement="right"
            open={isOpen}
            onClose={handleClose}
            size={560}
            className="border-b-[5px] border-[#4D81B7] flex flex-col"
        >
            <div className="flex items-center justify-between h-16 bg-[#FAFAFA] border-b-[0.5px] border-[##D5DFE9/90]  pl-[30px] pr-[20px]">
                <Typography
                    variant="h1"
                    color="blue-gray"
                    className="flex items-center font-semibold text-[18px] tracking-[0.25px] uppercase text-[#5C6269] font-dosis"
                >
                    Shopping list
                </Typography>
                <IconButton
                    variant="text"
                    color="blue-gray"
                    onClick={handleClose}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="12"
                        viewBox="0 0 13 12"
                        fill="none"
                    >
                        <path
                            d="M0.589996 1.41L5.18 6L0.589996 10.59L2 12L8 6L2 0L0.589996 1.41ZM11 0H13V12H11V0Z"
                            fill="#555F7C"
                        />
                    </svg>
                </IconButton>
            </div>
            <form className="p-[30px] flex flex-col justify-between flex-1">
                <div className="flex flex-col items-start gap-[13px] text-[16px] leading-[22px]">
                    <div className="flex flex-col gap-[5px]">
                        <Typography className="text-[18px] leading-6 text-[#2A323C]">
                            {isEdit ? 'Edit' : 'Add'} an Item
                        </Typography>
                        <Typography className="text-[#5C6269]">
                            {isEdit
                                ? 'Edit your item below'
                                : 'Add your new item below'}
                        </Typography>
                    </div>
                    <Input
                        label="Item Name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                    <Textarea
                        label="Description"
                        maxLength={100}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Input
                        label="How many?"
                        type="number"
                        min={1}
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value))}
                    />
                    {isEdit && (
                        <span className="text-[#9CA8B4] flex gap-[13px]">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => setChecked(!isChecked)}
                            />
                            Purchased
                        </span>
                    )}
                </div>
                <div className="flex justify-end gap-[17px] text-[14px] font-semibold">
                    <Button
                        variant="text"
                        className="capitalize"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-[#1871E8] text-white capitalize"
                        onClick={() =>
                            handleAction({
                                id: defaultValue.id,
                                itemName,
                                description,
                                count,
                                purchased: !!isChecked
                            })
                        }
                    >
                        {isEdit ? 'Save Item' : 'Add Item'}
                    </Button>
                </div>
            </form>
        </Drawer>
    )
}

export default ActionDrawer
