import { alpha, useTheme } from '@mui/material/styles';
import { Chart, useChart } from '../index';
import { useSettingsContext } from '../../settings';
import { EMPTY_CHART } from '../../../_mock/_chart';
import { fMonth } from '../../../utils/format-time';

type MixedChartProps = {
  chart: {
    colors?: string[];
    categories: number[];
    series: {
      name: string;
      type: string;
      data: number[];
    }[];
  };
  fallbackMessage?: string;
  useNumberLabel?: boolean;
};

export function MixedChart({ chart, fallbackMessage, useNumberLabel }: MixedChartProps) {
  const theme = useTheme();
  const { themeMode } = useSettingsContext();

  let renderableChart = {
    ...chart,
    categories: useNumberLabel ? chart.categories : fMonth(chart.categories),
  };

  const isFirstSeriesEmpty = chart.series[0].data.every((value) => value === 0);
  const isSecondSeriesEmpty = chart.series[1].data.every((value) => value === 0);

  if (isFirstSeriesEmpty || isSecondSeriesEmpty) {
    renderableChart = EMPTY_CHART;
  }

  const chartColors = chart.colors ?? [
    alpha(theme.palette.success.dark, 0.8),
    theme.palette.warning.main,
  ];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: { width: [0, 2] },
    fill: { type: ['solid', 'gradient'] },
    legend: { show: true },
    xaxis: {
      type: 'category',
      categories: renderableChart.categories,
    },
    tooltip: {
      enabled: false,
      shared: true,
      intersect: false,
      y: { formatter: (value: number) => `${value} points` },
      theme: themeMode,
      fillSeriesColor: false,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'bottom',
        },
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

  return <Chart type="line" series={renderableChart.series} options={chartOptions} height={320} />;
}
