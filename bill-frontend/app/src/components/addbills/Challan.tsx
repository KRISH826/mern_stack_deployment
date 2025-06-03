import {UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { BillSchema } from "@/schemas/BillSchema";
import { z } from "zod";

export type BillFormValues = z.infer<typeof BillSchema>;
type FormProps = {
  form: UseFormReturn<BillFormValues>;
}

const Challan = ({ form }: FormProps) => {

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-4">
      <FormField
        control={form.control}
        name="challans.0.challanDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Challan Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? format(new Date(field.value), "PPP")
                    : "Select date"}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    field.value ? new Date(field.value) : undefined
                  }
                  onSelect={(date) =>
                    field.onChange(date ? date.toISOString() : null)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="challans.0.vehicleNo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Vehicle No</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Enter Vehicle No" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="challans.0.challanNo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Challan No</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Enter Challan No" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="challans.0.lotQuantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lot Quantity</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter Lot Quantity" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="challans.0.rateAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rate Amount</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter Rate Amount" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="challans.0.freightAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Freight Amount</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter Freight Amount" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="challans.0.cashAdvance"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cash Advance</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter Cash Advance" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="challans.0.bankAdvance"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bank Advance</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter Bank Advance" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="challans.0.fuelAdvance"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fuel Advance</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter Fuel Advance" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="challans.0.tcAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>TC Amount</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter TC Amount" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="challans.0.lotPoint"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lot Point</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Enter Lot Point" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="challans.0.ulPoint"
        render={({ field }) => (
          <FormItem>
            <FormLabel>UL Point</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Enter UL Point" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Challan;
