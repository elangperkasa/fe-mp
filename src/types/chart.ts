export interface MixedChart {
  colors?: string[];
  categories: number[];
  series: {
    name: string;
    type: string;
    data: number[];
  }[];
}

export interface AreaChart {
  colors?: string[];
  categories: number[];
  series: {
    name: string;
    type: string;
    data: number[];
  }[];
}

export interface DonutChart {
  colors?: string[];
  categories: string[];
  series: number[];
}
