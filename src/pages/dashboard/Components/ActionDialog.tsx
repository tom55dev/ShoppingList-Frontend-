import {
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Button
} from '@material-tailwind/react'

interface IActionDialog {
    isOpen: boolean
    handleDialog: React.Dispatch<React.SetStateAction<boolean>>
    deleteId: number | string
    handleDelete: (id: unknown) => unknown
}

const ActionDialog = ({
    isOpen,
    handleDialog,
    deleteId,
    handleDelete
}: IActionDialog) => (
    <Dialog
        open={isOpen}
        handler={() => handleDialog(!isOpen)}
        size="xs"
        className="p-[30px] m-0 w-[410px] h-[240px]"
    >
        <DialogHeader className="font-semibold leading-6 text-[18px] text-[#2A323C] p-0">
            Delete Item?
        </DialogHeader>
        <DialogBody className="text-[14px] leading-5 text-[#5C6269] p-0">
            Are you sure you want to delete this item? This can not be undone.
        </DialogBody>
        <DialogFooter className="absolute bottom-[30px] right-[30px] gap-[10px] p-0">
            <Button
                variant="text"
                color="red"
                onClick={() => handleDialog(!isOpen)}
                className="px-[15px] py-[8px] capitalize leading-5 font-semibold text-[14px]"
            >
                <span>Cancel</span>
            </Button>
            <Button
                className="bg-[#1871E8] px-[15px] py-[8px] capitalize leading-5 font-semibold text-[14px]"
                onClick={() => {
                    handleDialog(!isOpen)
                    handleDelete(deleteId)
                }}
            >
                <span>Delete</span>
            </Button>
        </DialogFooter>
    </Dialog>
)

export default ActionDialog
