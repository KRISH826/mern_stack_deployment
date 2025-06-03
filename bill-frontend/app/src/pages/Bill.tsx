import BillList from "@/components/bills/BillList"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PlusIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Bill = () => {
  const navigate = useNavigate();

  const addBillHandler = () => {
    navigate("/bills/add-bill");
  }

  return (
    <div className="dashboard_page min-h-[calc(100dvh-100px)] bg-white rounded-2xl shadow-md p-5">
      <Card className="w-full gap-2 mt-5">
        <CardHeader>
          <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl font-semibold">Bills</h1>
            <Button variant="default" size="lg" onClick={addBillHandler}><PlusIcon />Add Bill</Button>
          </div>
        </CardHeader>
        <CardContent>
          <BillList />
        </CardContent>
      </Card>
    </div>
  )
}

export default Bill