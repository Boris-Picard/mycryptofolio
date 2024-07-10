import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

import { useChartStore } from "@/stores/useChartStore"

export default function PieChartComponent() {
    const { dataChart } = useChartStore()

    const chartConfig = {
        portfolioPercentage: {
            label: "portfolioPercentage",
        },
        chrome: {
            label: "Chrome",
            color: "hsl(var(--chart-1))",
        },
        safari: {
            label: "Safari",
            color: "hsl(var(--chart-2))",
        },
        firefox: {
            label: "Firefox",
            color: "hsl(var(--chart-3))",
        },
        edge: {
            label: "Edge",
            color: "hsl(var(--chart-4))",
        },
        other: {
            label: "Other",
            color: "hsl(var(--chart-5))",
        },
    }
    console.log(dataChart);
    return (
        <Card className="col-span-2">
            <CardHeader className="items-center pb-0">
                <CardTitle>Holdings</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie data={dataChart} dataKey="portfolioPercentage" nameKey="name" />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
