import { Badge, IconButton } from '@material-tailwind/react'
import { IShopItem } from '@/utils/types'

interface IProps extends IShopItem {
    handleDelete: (id: number | string) => unknown
    handleEdit: (id: number | string) => unknown
    handleChecked: (id: number | string) => unknown
}

const ShopItem = ({
    id,
    name,
    desc,
    count,
    purchased,
    handleDelete,
    handleEdit,
    handleChecked
}: IProps) => {
    return (
        <div
            className={`${
                purchased
                    ? 'bg-[#D5DFE92B] border-[0.5px] border-[#D5DFE92B]'
                    : ''
            } border-[0.5px] border-[#D5DFE9] rounded-[4px] flex items-center justify-between pl-[18px] pr-[30px] pt-[24px] pb-[20px] hover:brightness-90`}
        >
            <div className="flex gap-[18px] items-center">
                <input
                    className="w-6 h-6 cursor-pointer"
                    defaultChecked={purchased}
                    type="checkbox"
                    onChange={() => handleChecked(id)}
                />
                <div className="flex flex-col gap-[3px] text-[16px] font-semibold">
                    <div
                        className={`flex items-center gap-6 leading-5 ${
                            purchased ? 'line-through text-[#4D81B7]' : ''
                        }`}
                    >
                        {name}{' '}
                        <Badge
                            className={`${
                                count > 1 ? '' : 'hidden '
                            }bg-[#1871E8]`}
                            content={count}
                        />{' '}
                    </div>
                    <div
                        className={`leading-5 text-[#7D7A7A] ${
                            purchased ? 'line-through' : ''
                        }`}
                    >
                        {desc}
                    </div>
                </div>
            </div>
            <div className="flex gap-5">
                <IconButton
                    variant="text"
                    className="rounded-full"
                    onClick={() => handleEdit(id)}
                >
                    <div className="material-icons-outlined">edit</div>
                </IconButton>
                <IconButton
                    variant="text"
                    className="rounded-full"
                    onClick={() => handleDelete(id)}
                >
                    <div className="material-icons-outlined">delete</div>
                </IconButton>
            </div>
        </div>
    )
}

export default ShopItem
