import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getBillStats, getChallanStats, getGrowthRate, getNewBills } from "@/redux/dashboard/dashboardThunk"
import { AppDispatch, RootState } from "@/redux/store"
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const DashboardCards = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getBillStats());
        dispatch(getChallanStats());
        dispatch(getNewBills());
        dispatch(getGrowthRate());
    }, [dispatch]);

    const { billGrowthRate, billStates, challanStates, newBillsState } = useSelector((state: RootState) => state.dashboard);
    return (
        <>
            <div className="grid grid-cols-4 mt-5 gap-4">
                {/* Total Bills Card */}
                <Card className="@container/card">
                    <CardHeader className="relative">
                        <CardDescription>Total Bills</CardDescription>
                        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                            {billStates?.totalBills ?? "-"}
                        </CardTitle>
                        <div className="absolute right-4 top-4">
                            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                {billStates?.trend === "up" ? (
                                    <>
                                        <TrendingUpIcon className="size-3" />
                                        +{billStates?.percentage?.toFixed(2)}%
                                    </>
                                ) : (
                                    <>
                                        <TrendingDownIcon className="size-3" />
                                        -{Math.abs(Number(billStates?.percentage?.toFixed(2)))}%
                                    </>
                                )}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            {billStates?.trend === "up" ? "Trending up" : "Trending down"} this month
                            {billStates?.trend === "up" ? (
                                <TrendingUpIcon className="size-4" />
                            ) : (
                                <TrendingDownIcon className="size-4" />
                            )}
                        </div>
                        <div className="text-muted-foreground">Bills for the last 12 months</div>
                    </CardFooter>
                </Card>

                {/* Total Challans Card */}
                <Card className="@container/card">
                    <CardHeader className="relative">
                        <CardDescription>Total Challans</CardDescription>
                        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                            {challanStates?.totalChallans ?? "-"}
                        </CardTitle>
                        <div className="absolute right-4 top-4">
                            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                {challanStates?.trend === "up" ? (
                                    <>
                                        <TrendingUpIcon className="size-3" />
                                        +{challanStates?.percentage}%
                                    </>
                                ) : (
                                    <>
                                        <TrendingDownIcon className="size-3" />
                                        -{challanStates?.percentage}%
                                    </>
                                )}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            {challanStates?.trend === "up" ? "Trending up" : "Trending down"} this month
                            {challanStates?.trend === "up" ? (
                                <TrendingUpIcon className="size-4" />
                            ) : (
                                <TrendingDownIcon className="size-4" />
                            )}
                        </div>
                        <div className="text-muted-foreground">Challans for the last 12 months</div>
                    </CardFooter>
                </Card>

                {/* New Bills Card */}
                <Card className="@container/card">
                    <CardHeader className="relative">
                        <CardDescription>New Bills</CardDescription>
                        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                            {newBillsState?.thisMonthTotal ?? "-"}
                        </CardTitle>
                        <div className="absolute right-4 top-4">
                            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                {newBillsState?.trend === "up" ? (
                                    <>
                                        <TrendingUpIcon className="size-3" />
                                        +{newBillsState?.percentage}%
                                    </>
                                ) : (
                                    <>
                                        <TrendingDownIcon className="size-3" />
                                        -{Math.abs(Number(newBillsState?.percentage))}%
                                    </>
                                )}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            {newBillsState?.trend === "up" ? "New bills up" : "New bills down"} this month
                            {newBillsState?.trend === "up" ? (
                                <TrendingUpIcon className="size-4" />
                            ) : (
                                <TrendingDownIcon className="size-4" />
                            )}
                        </div>
                        <div className="text-muted-foreground">Compared to last month</div>
                    </CardFooter>
                </Card>

                {/* Bill Growth Rate Card */}
                <Card className="@container/card">
                    <CardHeader className="relative">
                        <CardDescription>Growth Rate</CardDescription>
                        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                            {billGrowthRate?.growthRate?.toFixed(2) ?? "-"}%
                        </CardTitle>
                        <div className="absolute right-4 top-4">
                            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                {billGrowthRate?.trend === "up" ? (
                                    <>
                                        <TrendingUpIcon className="size-3" />
                                        +{billGrowthRate?.growthRate?.toFixed(2)}%
                                    </>
                                ) : (
                                    <>
                                        <TrendingDownIcon className="size-3" />
                                        -{Math.abs(Number(billGrowthRate?.growthRate?.toFixed(2)))}%
                                    </>
                                )}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            {billGrowthRate?.trend === "up" ? "Growth up" : "Growth down"} this month
                            {billGrowthRate?.trend === "up" ? (
                                <TrendingUpIcon className="size-4" />
                            ) : (
                                <TrendingDownIcon className="size-4" />
                            )}
                        </div>
                        <div className="text-muted-foreground">Based on previous month</div>
                    </CardFooter>
                </Card>
            </div>

        </>
    )
}

export default DashboardCards