export type Trend = "up" | "down";

export interface BillsStatData {
  totalBills: number;
  currentMonthTotal: number;
  lastMonthTotal: number;
  percentage: number;
  trend: Trend;
}

export interface ChallanStatData {
  totalChallans: number;
  currentMonthTotal: number;
  lastMonthTotal: number;
  percentage: number;
  trend: Trend;
}

export interface NewBillsStatData {
  thisMonthTotal: number;
  lastMonthTotal: number;
  change: number;
  percentage: number;
  trend: Trend;
}

export interface GrowthRateStatData {
  currentMonthBills: number;
  lastMonthBills: number;
  growthRate: number;
  trend: Trend;
}

export interface PerfomanceChartData {
  date: string;
  bill: number;
}

export interface ChartCountData {
  name: string;
  length: number;
  fill: string;
}

export interface RecentBillsData {
  id: number;
  billNo: string;
  name: string;
  billingDate: Date;
  lotNo: string;
  receivedDate: Date;
  contactNo: number;
  panId: string;
}

export interface DashboardStatData {
  billStates: BillsStatData | null;
  challanStates: ChallanStatData | null;
  newBillsState: NewBillsStatData | null;
  billGrowthRate: GrowthRateStatData | null;
  perfomanceChartData: PerfomanceChartData[] | null;
  countChartData: ChartCountData[] | null;
  recentBillsData: RecentBillsData[] | null;
  isLoading: boolean;
  error: string | null;
}

export interface BankDetail {
  bankName: string;
  accountNo: string;
  ifscCode: string;
  branch: string;
}

export interface Challan {
  challanDate: string; // ISO date string
  vehicleNo: string;
  challanNo: string;
  lotQuantity: number;
  rateAmount: number;
  freightAmount: number;
  cashAdvance: number;
  bankAdvance: number;
  fuelAdvance: number;
  tcAmount: number;
  lotPoint: string;
  ulPoint: string;
}

export interface Bill {
  _id?: string;
  billNo: string;
  name: string;
  billingDate: string; // ISO date string or null if empty
  lotNo: string;
  receivedDate: string; // ISO date string
  contactNo: string; // Assuming it's a string to handle large numbers
  panId: string;
  bankDetails: BankDetail[];
  challans: Challan[];
}

export interface BillData {
  bills: Bill[];
  totalBills: number;
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  success: boolean;
  bill: Bill | null;
  error: string | null;
}
