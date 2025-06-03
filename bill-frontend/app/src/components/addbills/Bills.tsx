import { BillSchema } from '@/schemas/BillSchema';
import { z } from 'zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Calendar } from "../ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Input } from '../ui/input';
import { UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Button } from '../ui/button';

export type BillFormValues = z.infer<typeof BillSchema>;

type FormProps = {
    form: UseFormReturn<BillFormValues>;
}

const Bills = ({form}: FormProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-4">
    <FormField
      control={form.control}
      name="billNo"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Bill No</FormLabel>
          <FormControl>
            <Input placeholder="Enter Bill No" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter Name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="lotNo"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Lot No</FormLabel>
          <FormControl>
            <Input placeholder="Enter Lot No" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Billing Date Picker */}
    <FormField
      control={form.control}
      name="billingDate"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Billing Date</FormLabel>
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

    {/* Received Date Picker */}
    <FormField
      control={form.control}
      name="receivedDate"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Received Date</FormLabel>
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
      name="contactNo"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Contact No</FormLabel>
          <FormControl>
            <Input placeholder="Enter Contact No" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="panId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>PAN ID</FormLabel>
          <FormControl>
            <Input placeholder="Enter PAN ID" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
  )
}

export default Bills