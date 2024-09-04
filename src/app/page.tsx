/* eslint-disable @next/next/no-img-element */
'use client'

import { Navbar } from '@/components/navbar'
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart'
import { useData } from '@/hooks/use-data'
import { Data } from './types/data'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const chartConfig = {
  umidity: {
    label: 'Umidade',
    color: '#7ba6e3'
  },
  temperature: {
    label: 'Temperatura',
    color: '#db1f51'
  },
  brightness: {
    label: 'Luminosidade',
    color: '#e3f2a7'
  }
} satisfies ChartConfig

export default function Home() {
  const { getData } = useData()
  const { theme } = useTheme()
  const [data, setData] = useState<
    (Data & { timestamp: number })[] | undefined
  >(undefined)

  useEffect(() => {
    const handleData = async () => {
      const data: (Data & { timestamp: number })[] = await getData()
      setData(data)
      // setData(data)
    }

    setInterval(() => {
      window.location.reload()
    }, 5000)

    handleData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Navbar />
      <main className="grid min-h-screen w-full grid-cols-1 grid-rows-3 gap-4 p-6 transition-all duration-500 md:grid-cols-3">
        <Card className="min-h-64">
          <CardHeader className="h-1/3">
            <CardTitle>Umidade</CardTitle>
            <CardDescription>Porcentagem</CardDescription>
            <Separator className="" />
          </CardHeader>
          <CardContent className="flex h-2/3 items-center justify-center p-0">
            <p className="text-center text-5xl font-bold md:text-7xl">
              {data ? data[data?.length - 1].umidity : 0} %
            </p>
          </CardContent>
        </Card>
        <Card className="min-h-64">
          <CardHeader className="h-1/3">
            <CardTitle>Temperatura</CardTitle>
            <CardDescription>Celsius (ºC)</CardDescription>
            <Separator />
          </CardHeader>
          <CardContent className="flex h-2/3 items-center justify-center p-0">
            <p className="text-center text-5xl font-bold md:text-7xl">
              {data ? data[data?.length - 1].temperature : 0} ºC
            </p>
          </CardContent>
        </Card>
        <Card className="min-h-64">
          <CardHeader className="h-1/3">
            <CardTitle>Luminosidade</CardTitle>
            <CardDescription>Sinal digital (0 ou 1)</CardDescription>
            <Separator />
          </CardHeader>
          <CardContent className="flex h-2/3 items-center justify-center p-0">
            <p className="text-center text-5xl font-bold md:text-7xl">
              {data ? data[data?.length - 1].brightness : 0}
            </p>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 md:row-span-2 md:row-start-2">
          <CardHeader className="h-auto">
            <CardTitle>Linha do tempo</CardTitle>
          </CardHeader>
          <CardContent className="flex h-fit items-center justify-center p-4">
            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] w-full"
            >
              <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="timestamp"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString()
                  }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="umidity" fill="var(--color-umidity)" radius={4} />
                <Bar
                  dataKey="temperature"
                  fill="var(--color-temperature)"
                  radius={4}
                />
                <Bar
                  dataKey="brightness"
                  fill="var(--color-brightness)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="md:col-start-3 md:row-span-2 md:row-start-2">
          <CardContent className="flex h-full items-center justify-center">
            <img
              src="/idle-bounce.gif"
              alt="Jumping plant"
              className={`h-full object-cover ${!theme ? 'invert' : theme === 'light' ? 'invert' : ''}`}
            />
          </CardContent>
        </Card>
      </main>
    </>
  )
}
