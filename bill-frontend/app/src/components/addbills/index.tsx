"use client";

import { z } from "zod";
import { useForm,  } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BillSchema } from "@/schemas/BillSchema"
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getAddBill } from "@/redux/bill/billThunk";
import { useNavigate } from "react-router-dom";
import { resetBillState } from "@/redux/bill/billSlice";
import { useEffect } from "react";
import Challan from "./Challan";
import BankDetails from "./BankDetails";
import Bills from "./Bills";
import { Form } from "../ui/form";

const AddBillLayout = () => {
const dispatch = useDispatch<AppDispatch>();
const {error, isLoading, success} = useSelector((state: RootState) => state.bill)
const navigate = useNavigate();
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
    formState: {isDirty, isValid, isSubmitting },
  } = form;

  useEffect(() => {
    if(success){
      dispatch(resetBillState());
      navigate("/bills");
    }
  }, [dispatch, success, navigate])
  

  const onSubmit = async (values: z.infer<typeof BillSchema>) => {
    dispatch(getAddBill(values));
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <Card className="p-0 gap-0">
        <CardHeader className="border-b gap-0 [.border-b]:pb-0 px-4 !pb-3 pt-3">
          <h3 className="text-2xl font-semibold">Add Bill</h3>
        </CardHeader>
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
             <Bills form={form} />
              <Challan form={form} />
              <BankDetails form={form} />
              <Button
                type="submit"
                disabled={!isDirty || !isValid || isSubmitting}
                className="px-6 py-3"
              >
                {isLoading ? "Adding..." : "Add Bill"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBillLayout;
