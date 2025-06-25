import { useTheme, alpha as hexAlpha } from '@mui/material/styles';

import { Chart, useChart } from 'src/components/chart';
import { useSettingsContext } from '../../settings';
import { fCurrency } from '../../../utils/format-number';
import { EMPTY_CHART } from '../../../_mock/_chart';

type BarChartProps = {
  chart: {
    colors?: string[];
    categories: string[];
    series: number[];
  };
  fallbackMessage?: string;
};

export function BarChart({ chart, fallbackMessage }: BarChartProps) {
  const theme = useTheme();
  const { themeMode } = useSettingsContext();

  const isChartEmpty = chart.series.every((value) => value === 0);

  if (isChartEmpty) {
    chart = EMPTY_CHART;
  }

  const chartColors = chart.colors ?? [hexAlpha(theme.palette.success.dark, 0.8)];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: { width: 0 },
    xaxis: {
      categories: chart.categories,
      labels: {
        show: true,
        formatter: (val: string) => fCurrency(+val),
      },
    },
    tooltip: {
      enabled: false,
      y: {
        formatter: (value: number) => fCurrency(value),
        title: { formatter: () => '' },
      },
      theme: themeMode,
    },
    dataLabels: {
      formatter: (val) => fCurrency(+val),
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '30%',
        borderRadius: 2,
      },
    },
    noData: {
      text: fallbackMessage,
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        fontSize: '14px',
      },
    },
  });

  return <Chart type="bar" series={[{ data: chart.series }]} options={chartOptions} height={500} />;
}
