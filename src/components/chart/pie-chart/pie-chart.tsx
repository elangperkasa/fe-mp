import { useTheme } from '@mui/material/styles';
import { Chart, useChart, ChartLegends } from 'src/components/chart';
import Stack from '@mui/material/Stack';
import { useSettingsContext } from '../../settings';
import { EMPTY_CHART } from '../../../_mock/_chart';

type PieChartProps = {
  chart: {
    colors?: string[];
    categories: string[];
    series: number[];
  };
  fallbackMessage?: string;
};

export function PieChart({ chart, fallbackMessage }: PieChartProps) {
  const theme = useTheme();
  const { themeMode } = useSettingsContext();

  const isChartEmpty = chart.series.every((value) => value === 0);

  if (isChartEmpty) {
    chart = EMPTY_CHART;
  }

  const chartColors = chart.colors ?? [
    theme.palette.success.dark,
    theme.palette.warning.main,
    theme.palette.info.dark,
    theme.palette.error.main,
  ];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    labels: chart.categories,
    stroke: { width: 0 },
    dataLabels: {
      enabled: true,
      // dropShadow: { enabled: false },
      offsetX: -5000,
      offsetY: -5000,
      textAnchor: 'start',
      formatter(val, opts) {
        const percentage = val.toString().split('.')[0];

        const index = opts.seriesIndex || 0;
        const value = opts.w.config.series[index];

        return `${value} Dus (${percentage}%)`;
      },
    },
    plotOptions: { pie: { donut: { labels: { show: false } } } },
    tooltip: {
      enabled: false,
      shared: true,
      intersect: false,
      y: { formatter: (value: number) => `${value}` },
      theme: themeMode,
      fillSeriesColor: false,
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

  return (
    <Stack>
      <Chart
        type="pie"
        series={chart.series}
        options={chartOptions}
        width={300}
        height={240}
        sx={{
          my: 3,
          mx: 'auto',
        }}
      />

      <ChartLegends
        labels={chartOptions?.labels}
        colors={chartOptions?.colors}
        sx={{
          p: 3,
          justifyContent: 'center',
        }}
      />
    </Stack>
  );
}
