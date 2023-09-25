import { Button } from '@material-tailwind/react'
import { IShopItem } from '@/utils/types'
import ShopItem from './ShopItem'

interface IShopList {
    items: IShopItem[]
    handleOpen: () => unknown
    handleDelete: (id: number | string) => unknown
    handleEdit: (id: number | string) => unknown
    handleChecked: (id: number | string) => unknown
}

const ShopList = ({
    items,
    handleOpen,
    handleDelete,
    handleEdit,
    handleChecked
}: IShopList) => (
    <div className="mt-[35px] w-full">
        <div className="mx-[164px]">
            <div className="flex items-end justify-between mb-[11px]">
                <div className="text-[18px] font-semibold leading-6">
                    Your Items
                </div>
                <Button
                    className="bg-[#1871E8] rounded-1 capitalize text-[14px] font-semibold leading-5 px-[15px] py-[8px]"
                    onClick={handleOpen}
                >
                    Add Item
                </Button>
            </div>
            <div className="flex flex-col gap-3">
                {items.map((item, key) => (
                    <ShopItem
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        handleChecked={handleChecked}
                        {...item}
                        key={key.toString()}
                    />
                ))}
            </div>
        </div>
    </div>
)

export default ShopList
