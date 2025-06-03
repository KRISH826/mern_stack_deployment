import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { getAllBills, getDeleteBill } from "@/redux/bill/billThunk";
import { AppDispatch } from "@/redux/store";
import { Bill } from "@/types/statType";
import { PencilIcon, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type Props = {
    bill: Bill
}

const TableActions = ({ bill }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();


    const handleDelete = async (id: string) => {
        try {
            await dispatch(getDeleteBill(id)).unwrap();
            await dispatch(getAllBills()).unwrap();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };
    return (
        <div className="flex items-center gap-2">
            <Button size={"icon"} onClick={() => navigate(`/bills/update-bill/${bill._id}`)}>
                <PencilIcon size={18} />
            </Button>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button size="icon" variant="destructive">
                        <Trash2 size={20} />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the bill <strong>{bill.billNo}</strong>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex gap-2">
                        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(bill._id as string)}>Confirm</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default TableActions