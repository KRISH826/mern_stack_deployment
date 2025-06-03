import { z } from "zod";

// Utility regex patterns
const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const CONTACT_NO_REGEX = /^[6-9]\d{9}$/; // Valid Indian mobile numbers

// Utility to validate ISO date strings with optional custom error messages
const isoDateString = (field: string) =>
    z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
            message: `${field} must be a valid ISO date string`,
        });

// Bank Detail Schema
export const BankDetailSchema = z.object({
    bankName: z.string().min(2, "Bank name must be at least 2 characters"),
    accountNo: z
        .string()
        .min(6, "Account number must be at least 6 digits")
        .max(20, "Account number must be at most 20 digits"),
    ifscCode: z
        .string()
        .regex(IFSC_REGEX, "Invalid IFSC code format"),
    branch: z.string().min(2, "Branch name must be at least 2 characters"),
});

// Challan Schema
export const ChallanSchema = z.object({
    challanDate: isoDateString("Challan Date"),
    vehicleNo: z.string().min(2, "Vehicle number is too short"),
    challanNo: z.string().min(1, "Challan number is required"),
    lotQuantity: z.number().min(0, "Lot quantity must be a positive number"),
    rateAmount: z.number().min(0, "Rate amount must be a positive number"),
    freightAmount: z.number().min(0, "Freight amount must be a positive number"),
    cashAdvance: z.number().min(0, "Cash advance must be a positive number"),
    bankAdvance: z.number().min(0, "Bank advance must be a positive number"),
    fuelAdvance: z.number().min(0, "Fuel advance must be a positive number"),
    tcAmount: z.number().min(0, "TC amount must be a positive number"),
    lotPoint: z.string().min(1, "Lot point is required"),
    ulPoint: z.string().min(1, "Unload point is required"),
});

// Bill Schema
// export const BillSchema = z.object({
//   billNo: z.string().min(1, "Bill number is required"),
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   billingDate: isoDateString("Billing Date").nullable().optional(),
//   lotNo: z.string().min(1, "Lot number is required"),
//   receivedDate: isoDateString("Received Date"),
//   contactNo: z
//     .string()
//     .regex(CONTACT_NO_REGEX, "Invalid Indian mobile number format"),
//   panId: z
//     .string()
//     .regex(PAN_REGEX, "Invalid PAN ID format"),
//   bankDetails: z.array(BankDetailSchema).nonempty("At least one bank detail is required"),
//   challans: z.array(ChallanSchema).nonempty("At least one challan is required"),
// });

export const BillSchema = z.object({
    billNo: z.string().min(4, "Bill No is required"),
    name: z.string().min(4, "Name is required"),
    billingDate: isoDateString("Billing Date"),
    lotNo: z.string().min(4, "Lot No is required"),
    receivedDate: isoDateString("Received Date"),
    contactNo: z.string().regex(CONTACT_NO_REGEX, "Invalid Indian mobile number format"),
    panId: z.string().regex(PAN_REGEX, "Invalid PAN ID format"),
    challans: z.array(
        z.object({
            challanDate: isoDateString("Challan Date"),
            vehicleNo: z.string().min(2, "Vehicle number is too short"),
            challanNo: z.string().min(1, "Challan number is required"),
            lotQuantity: z.coerce.number({
                required_error: "Lot quantity is required",
                invalid_type_error: "Lot quantity must be a number",
            }).refine((val) => !isNaN(val), {
                message: "Lot quantity must be a valid number",
            }).refine((val) => val >= 0, {
                message: "Lot quantity must be a positive number",
            }).refine((val) => val >= 10, {
                message: "Lot quantity must be at least 10",
            }),

            rateAmount: z.coerce.number({
                required_error: "Rate amount is required",
                invalid_type_error: "Rate amount must be a number",
            }).refine((val) => !isNaN(val), {
                message: "Rate amount must be a valid number",
            }).refine((val) => val >= 0, {
                message: "Rate amount must be a positive number",
            }).refine((val) => val >= 1000, {
                message: "Rate amount must be at least 1000",
            }),

            freightAmount: z.coerce.number({
                required_error: "Freight amount is required",
                invalid_type_error: "Freight amount must be a number",
            }).refine((val) => !isNaN(val), {
                message: "Freight amount must be a valid number",
            }).refine((val) => val >= 0, {
                message: "Freight amount must be a positive number",
            }).refine((val) => val >= 1000, {
                message: "Freight amount must be at least 1000",
            }),

            cashAdvance: z.coerce.number({
                required_error: "Cash advance is required",
                invalid_type_error: "Cash advance must be a number",
            }).refine((val) => !isNaN(val), {
                message: "Cash advance must be a valid number",
            }).refine((val) => val >= 0, {
                message: "Cash advance must be a positive number",
            }).refine((val) => val >= 1000, {
                message: "Cash advance must be at least 1000",
            }),

            bankAdvance: z.coerce.number({
                required_error: "Bank advance is required",
                invalid_type_error: "Bank advance must be a number",
            }).refine((val) => !isNaN(val), {
                message: "Bank advance must be a valid number",
            }).refine((val) => val >= 0, {
                message: "Bank advance must be a positive number",
            }).refine((val) => val >= 1000, {
                message: "Bank advance must be at least 1000",
            }),

            fuelAdvance: z.coerce.number({
                required_error: "Fuel advance is required",
                invalid_type_error: "Fuel advance must be a number",
            }).refine((val) => !isNaN(val), {
                message: "Fuel advance must be a valid number",
            }).refine((val) => val >= 0, {
                message: "Fuel advance must be a positive number",
            }).refine((val) => val >= 1000, {
                message: "Fuel advance must be at least 1000",
            }),

            tcAmount: z.coerce.number({
                required_error: "TC amount is required",
                invalid_type_error: "TC amount must be a number",
            }).refine((val) => !isNaN(val), {
                message: "TC amount must be a valid number",
            }).refine((val) => val >= 0, {
                message: "TC amount must be a positive number",
            }).refine((val) => val >= 1000, {
                message: "TC amount must be at least 1000",
            }),
            lotPoint: z.string().min(1, "Lot point is required"),
            ulPoint: z.string().min(1, "Unload point is required"),
        })
    ),
    bankDetails: z.array(
        z.object({
            bankName: z.string().min(1, "Bank Name is required"),
            accountNo: z.string().min(1, "Account No is required"),
            ifscCode: z.string().min(1, "IFSC Code is required"),
            branch: z.string().min(1, "Branch is required"),
        })
    ),
});
