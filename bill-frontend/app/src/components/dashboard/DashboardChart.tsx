import { getCountChartData, getPerfomanceChartData } from '@/redux/dashboard/dashboardThunk'
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../ui/chart'
import { AppDispatch, RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { Area, AreaChart, CartesianGrid, Pie, PieChart, XAxis } from 'recharts'
import { useEffect } from 'react'

interface Props {
    timeRange: string
    charType: "area" | "pie" | "bar"
}

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    bill: {
        label: "Bills",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig


const piechartConfig = {
    visitors: {
        label: "Visitors",
    },
    bills: {
        label: "Bills",
        color: "hsl(var(--chart-1))",
    },
    challans: {
        label: "Challans",
        color: "hsl(var(--chart-2))",
    },
    bank: {
        label: "Bank Details",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig

const DashboardChart = ({ timeRange, charType }: Props) => {

    // Filter the chart data based on the selected time range
    const { perfomanceChartData, countChartData  } = useSelector((state: RootState) => state.dashboard);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getPerfomanceChartData(timeRange))
        dispatch(getCountChartData())
    }, [timeRange,dispatch])


    const filteredData = perfomanceChartData?.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2024-06-30")
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })
    return (
        <>
            <div className='charts_container'>
                {
                    charType === "area" && <>
                        <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
                            <AreaChart data={filteredData}>
                                <defs>
                                    <linearGradient id="fillbill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-bill)" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="var(--color-bill)" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    minTickGap={32}
                                    tickFormatter={(value) => {
                                        const date = new Date(value)
                                        return date.toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            labelFormatter={(value) => {
                                                return new Date(value).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                })
                                            }}
                                            indicator="dot"
                                        />
                                    }
                                />
                                <Area dataKey="bill" type="natural" fill="url(#fillbill)" stroke="var(--color-bill)" stackId="a" />
                                <ChartLegend content={<ChartLegendContent />} />
                            </AreaChart>
                        </ChartContainer>
                    </>
                }

                {
                    charType === "pie" && <>
                        <ChartContainer config={piechartConfig} className="mx-auto aspect-square max-h-[300px]">
                            <PieChart>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                <Pie data={countChartData || []} dataKey="length" nameKey="name" />
                            </PieChart>
                        </ChartContainer>
                    </>
                }

            </div>
        </>
    )
}

export default DashboardChart