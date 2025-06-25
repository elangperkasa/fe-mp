import { useTheme } from '@mui/material/styles';
import Chart from '../../chart-old/chart';
import { useChart } from '../index';

type LineChartProps = {
  chart: {
    colors?: string[];
    categories: number[];
    series: {
      name?: string;
      data: number[];
    }[];
  };
};

export function LineChart({ chart }: LineChartProps) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [theme.palette.error.main, theme.palette.info.darker];

  const chartOptions = useChart({
    colors: chartColors,
    legend: { show: true },
    xaxis: { categories: chart.categories },
  });

  return <Chart type="line" series={chart.series} options={chartOptions} height={320} />;
}
