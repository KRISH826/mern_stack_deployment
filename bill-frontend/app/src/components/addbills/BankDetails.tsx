import { Input } from "../ui/input";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { BillSchema } from "@/schemas/BillSchema";
import { z } from "zod";

export type BillFormValues = z.infer<typeof BillSchema>;

type FormProps = {
    form: UseFormReturn<BillFormValues>;
}

const BankDetails = ({ form }: FormProps) => {

    return (
        <div className="grid grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="bankDetails.0.bankName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter Bank Name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="bankDetails.0.accountNo"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Account No.</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter Account No" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="bankDetails.0.ifscCode"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>IFSC Code</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter IFSC Code" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="bankDetails.0.branch"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Branch Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Branch Name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default BankDetails;
