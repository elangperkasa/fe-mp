import { useTheme } from '@mui/material/styles';

import { Chart, useChart, ChartLegends } from 'src/components/chart';
import Stack from '@mui/material/Stack';
import { useSettingsContext } from '../../settings';
import { fCurrency } from '../../../utils/format-number';
import { EMPTY_CHART } from '../../../_mock/_chart';

type DonutChartProps = {
  chart: {
    colors?: string[];
    categories: string[];
    series: number[];
  };
  fallbackMessage?: string;
};

export function DonutChart({ chart, fallbackMessage }: DonutChartProps) {
  const theme = useTheme();
  const { themeMode } = useSettingsContext();

  const isChartEmpty = chart.series.every((value) => value === 0);

  if (isChartEmpty) {
    chart = EMPTY_CHART;
  }

  const chartColors = chart.colors ?? [
    theme.palette.success.main,
    theme.palette.success.dark,
    theme.palette.success.darker,
    theme.palette.success.light,
    theme.palette.success.lighter,
  ];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    labels: chart.categories,
    stroke: { width: 0 },
    plotOptions: { pie: { donut: { size: '72%' } } },
    tooltip: {
      enabled: false,
      shared: true,
      intersect: false,
      y: { formatter: (value: number) => fCurrency(value) },
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
    <Stack display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
      {!isChartEmpty && (
        <ChartLegends
          labels={chartOptions?.labels}
          values={chart.series.map((series) => fCurrency(series))}
          colors={chartOptions?.colors}
          sx={{
            flexDirection: 'column',
            gap: 2,
            p: 3,
          }}
        />
      )}

      <Chart
        type="donut"
        series={chart.series}
        options={chartOptions}
        width={200}
        height={200}
        sx={{
          my: 3,
          mx: 'auto',
        }}
      />
    </Stack>
  );
}
