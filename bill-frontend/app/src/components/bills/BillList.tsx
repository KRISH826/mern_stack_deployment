import { columns } from "./table/column"
import { DataTable } from "./table/DataTable"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { getAllBills } from "@/redux/bill/billThunk"

const BillList = () => {
  const {bills} = useSelector((state: RootState) => state.bill)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllBills());
  }, [dispatch])
  
  return (
    <>
      <DataTable columns={columns} data={bills || []} />
    </>
  )
}

export default BillList