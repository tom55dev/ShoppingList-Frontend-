import { Badge, IconButton } from '@material-tailwind/react'
import { IShopItem } from '@/utils/types'

const ShopItem = ({ name, desc, count, purchased }: IShopItem) => {
    return (
        <div
            className={`${
                purchased ? 'bg-[#D5DFE92B] border-none' : ''
            } border-[0.5px] border-[#D5DFE9] rounded-[4px] flex items-center justify-between pl-[18px] pr-[30px] pt-[24px] pb-[20px]`}
        >
            <div className="flex gap-[18px] items-center">
                <input
                    className="w-6 h-6"
                    defaultChecked={purchased}
                    type="checkbox"
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
                <IconButton variant="text" className="rounded-full">
                    <div className="material-icons-outlined">edit</div>
                </IconButton>
                <IconButton variant="text" className="rounded-full">
                    <div className="material-icons-outlined">delete</div>
                </IconButton>
            </div>
        </div>
    )
}

export default ShopItem
