import { getBillById, updateBillById } from "@/redux/bill/billThunk";
import { AppDispatch, RootState } from "@/redux/store"
import { BillSchema } from "@/schemas/BillSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { z } from "zod";
import { Form } from "../ui/form";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Bills from "../addbills/Bills";
import Challan from "../addbills/Challan";
import BankDetails from "../addbills/BankDetails";


const UpdateBillLayout = () => {
  const { id } = useParams();
  const { bill, error, isLoading, success } = useSelector((state: RootState) => state.bill);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof BillSchema>>({
    resolver: zodResolver(BillSchema),
    defaultValues: {
      billNo: "",
      name: "",
      billingDate: new Date().toISOString(),
      lotNo: "",
      receivedDate: new Date().toISOString(),
      contactNo: "",
      panId: "",
      challans: [
        {
          challanDate: new Date().toISOString(),
          vehicleNo: "",
          challanNo: "",
          lotQuantity: 0,
          rateAmount: 0,
          freightAmount: 0,
          cashAdvance: 0,
          bankAdvance: 0,
          fuelAdvance: 0,
          tcAmount: 0,
          lotPoint: "",
          ulPoint: "",
        },
      ],
      bankDetails: [
        {
          bankName: "",
          accountNo: "",
          ifscCode: "",
          branch: "",
        },
      ]
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: {isValid, isSubmitting },
  } = form;

  useEffect(() => {
    dispatch(getBillById(id ?? ""));
  }, [dispatch, id]);

  useEffect(() => {
    if (bill && id) {
      form.reset({
        billNo: bill.billNo ?? "",
        name: bill.name ?? "",
        billingDate: bill.billingDate ?? new Date().toISOString(),
        lotNo: bill.lotNo ?? "",
        receivedDate: bill.receivedDate ?? new Date().toISOString(),
        contactNo: bill.contactNo ?? "",
        panId: bill.panId ?? "",
        challans: bill.challans && bill.challans.length > 0 ? bill.challans : [
          {
            challanDate: new Date().toISOString(),
            vehicleNo: bill.challans.length > 0 ? bill.challans[0].vehicleNo : "",
            challanNo: bill.challans.length > 0 ? bill.challans[0].challanNo : "",
            lotQuantity: bill.challans.length > 0 ? bill.challans[0].lotQuantity : 0,
            rateAmount: bill.challans.length > 0 ? bill.challans[0].rateAmount : 0,
            freightAmount: bill.challans.length > 0 ? bill.challans[0].freightAmount : 0,
            cashAdvance: bill.challans.length > 0 ? bill.challans[0].cashAdvance : 0,
            bankAdvance: bill.challans.length > 0 ? bill.challans[0].bankAdvance : 0,
            fuelAdvance: bill.challans.length > 0 ? bill.challans[0].fuelAdvance : 0,
            tcAmount: bill.challans.length > 0 ? bill.challans[0].tcAmount : 0,
            lotPoint: bill.challans.length > 0 ? bill.challans[0].lotPoint : "",
            ulPoint: bill.challans.length > 0 ? bill.challans[0].ulPoint : "",
          },
        ],
        bankDetails: bill.bankDetails && bill.bankDetails.length > 0 ? bill.bankDetails : [
          {
            bankName: bill.bankDetails.length > 0 ? bill.bankDetails[0].bankName : "",
            accountNo: bill.bankDetails.length > 0 ? bill.bankDetails[0].accountNo : "",
            ifscCode: bill.bankDetails.length > 0 ? bill.bankDetails[0].ifscCode : "",
            branch: bill.bankDetails.length > 0 ? bill.bankDetails[0].branch : "",
          },
        ]
      }, 
      {
        keepDefaultValues: true,
        keepDirty: true
      }
    );
    }

  }, [bill, id, form, success, navigate]);


  

  const onSubmit = async (values: z.infer<typeof BillSchema>) => {
    if (!id) return;
      await dispatch(updateBillById({ id, data: values }));
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <Card className="p-0 gap-0">
        <CardHeader className="border-b gap-0 [.border-b]:pb-0 px-4 !pb-3 pt-3">
          <h3 className="text-2xl font-semibold">Update Bill</h3>
        </CardHeader>
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Bills form={form} />
              <Challan form={form} />
              <BankDetails form={form} />
              <Button
                type="submit"
                disabled={!isValid || isSubmitting || isLoading}
                className="px-6 py-3"
              >
                {isLoading ? "Updating..." : "Update Bill"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default UpdateBillLayout