import { useTheme } from '@mui/material/styles';
import { Chart, useChart } from '../index';
import { useSettingsContext } from '../../settings';
import { fMonth } from '../../../utils/format-time';
import { EMPTY_CHART } from '../../../_mock/_chart';

type AreaChartProps = {
  chart: {
    colors?: string[];
    categories: number[];
    series: {
      name?: string;
      data: number[];
    }[];
  };
  useNumberLabel?: boolean;
  fallbackMessage?: string;
};

export function AreaChart({ chart, useNumberLabel, fallbackMessage }: AreaChartProps) {
  const theme = useTheme();

  const { themeMode } = useSettingsContext();

  let renderableChart = {
    ...chart,
    categories: useNumberLabel ? chart.categories : fMonth(chart.categories),
  };

  const isAllSeriesEmpty = renderableChart.series.every((series) => {
    if (series.data.length) return series.data.every((value) => value === 0);
    return false;
  });

  if (isAllSeriesEmpty) {
    renderableChart = EMPTY_CHART;
  }

  const chartColors = renderableChart.colors ?? [
    theme.palette.success.dark,
    theme.palette.warning.main,
  ];

  const chartOptions = useChart({
    colors: chartColors,
    legend: { show: true },
    xaxis: {
      type: 'category',
      categories: renderableChart.categories,
    },
    tooltip: {
      enabled: false,
      x: { format: 'dd/MM/yy HH:mm' },
      theme: themeMode,
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

  return <Chart type="area" series={renderableChart.series} options={chartOptions} height={320} />;
}
