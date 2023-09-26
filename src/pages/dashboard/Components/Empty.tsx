import { Button } from '@material-tailwind/react'

interface IEmpty {
    handleAction: React.Dispatch<React.SetStateAction<boolean>>
}

const Empty = ({ handleAction }: IEmpty) => (
    <div className="mt-[110px] px-[192px] pt-[87px] pb-[127px] flex flex-col gap-[16px] rounded items-center justify-center border border-[#C6C6C6] w-fit">
        <div className="text-[#87898C] text-[18px] leading-6">
            Your shopping list is empty :(
        </div>
        <Button className="rounded-[4px] text-white bg-[#1871E8] capitalize text-[14px] px-[15px] py-[8px]" onClick={() => handleAction(true)}>
            Add your first item
        </Button>
    </div>
)

export default Empty
