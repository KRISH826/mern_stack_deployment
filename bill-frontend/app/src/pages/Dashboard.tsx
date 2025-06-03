import DashboardBills from "@/components/dashboard/DashboardBills"
import DashboardCards from "@/components/dashboard/DashboardCards"
import DashboardChart from "@/components/dashboard/DashboardChart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"


const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("90d");
  return (
    <div className="dashboard_page min-h-[calc(100dvh-100px)] bg-white rounded-2xl shadow-md p-5">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <DashboardCards />
      <div>
        <div className="grid grid-cols-[1fr_550px] gap-4 mt-5">
          <Card className="">
            <CardHeader className="justify-between flex items-center gap-3 flex-wrap">
              <div>
                <CardTitle className="font-semibold text-2xl">Performance</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Showing total visitors for the last 3 months
                </CardDescription>
              </div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
                  <SelectValue placeholder="Last 3 months" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="90d" className="rounded-lg">
                    Last 3 months
                  </SelectItem>
                  <SelectItem value="30d" className="rounded-lg">
                    Last 30 days
                  </SelectItem>
                  <SelectItem value="7d" className="rounded-lg">
                    Last 7 days
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
                <DashboardChart charType="area" timeRange={timeRange}  />
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader className="">
              <CardTitle className="font-semibold text-2xl">Count Charts</CardTitle>
            </CardHeader>
            <CardContent>
              <DashboardChart charType="pie" timeRange="null" />
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 mt-5 gap-4">
          <DashboardBills />
        </div>
      </div>
    </div>
  )
}

export default Dashboard