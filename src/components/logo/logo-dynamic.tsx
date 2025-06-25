import { Box, BoxProps, Link, useTheme } from '@mui/material';
import { forwardRef } from 'react';
import type { TPTPLDesainLogoColorComponent } from 'src/assets/ptpl/color';
import { LogoColorRGB } from 'src/assets/ptpl/color';
import { RouterLink } from 'src/components/router-link';
import { useSettingsContext } from '../settings';

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

export function LogoPTMN(props: { fillColor?: TPTPLDesainLogoColorComponent }) {
  const { fillColor } = props;
  return (
    <g id="logo">
      <path
        d="M 336.61978,406.43862 C 329.07005,417.63441 316.22822,425 301.63448,425 H 205 l 53.34575,-81.43861 C 265.89384,332.38027 278.73237,325 293.33106,325 h 96.66893 z"
        fill={fillColor?.shapeRed ?? LogoColorRGB.shapeRed}
        id="shape-red"
      />
      <path
        d="M 258.40038,281.44644 C 265.92393,292.62285 278.78225,300 293.38108,300 h 96.61891 L 336.65543,218.57313 C 329.12695,207.37227 316.2637,200 301.66977,200 H 205 Z"
        fill={fillColor?.shapeGreen ?? LogoColorRGB.shapeGreen}
        id="shape-green"
      />
      <path
        d="m 217.41602,279.27289 c 5.31079,7.98062 11.9357,14.98785 19.58399,20.72711 H 134.34277 c -14.60173,0 -27.46385,-7.37834 -34.992238,-18.55415 L 0,129.99999 h 96.73704 c 14.60008,0 27.4425,7.37671 34.9758,18.5769 z"
        fill={fillColor?.shapeBlue ?? LogoColorRGB.shapeBlue}
        id="shape-blue"
      />
    </g>
  );
}

export function LogoRawV(props: { fillColor?: TPTPLDesainLogoColorComponent }) {
  const { fillColor } = props;
  return (
    <svg
      id="logo-ptpl-v"
      viewBox="0 0 390 495"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      // width="390"
      // height="495"
    >
      <defs id="defs-logo-ptpl-v" />
      <g id="g2048" transform="matrix(1,0,0,-1,0,425)">
        <LogoPTMN fillColor={fillColor} />
        <text
          id="text-pertamina-v"
          fontFamily="Futura Md BT"
          fontWeight="bold"
          fontSize="65.9273px"
          fill={fillColor?.textPertamina ?? LogoColorRGB.textPertamina}
          transform="scale(1.0204567,-0.97995335)"
        >
          <tspan
            x="-5.4080973 36.306343 73.612526 115.78754 149.52098 197.02544 257.88651 281.50714 337.56497"
            y="-32.512943"
            id="tspan-pertamina"
          >
            PERTAMINA
          </tspan>
        </text>
        <text
          id="text-lubricants-v"
          fontWeight="normal"
          fontSize="62.5803px"
          fontFamily="Futura Bk BT"
          fill={fillColor?.textLubricants ?? LogoColorRGB.textLubricants}
          transform="scale(0.9649839,-1.0362867)"
        >
          <tspan
            x="-5.3779912 22.063431 67.121193 102.29124 135.77165 151.9799 197.35051 236.46313 284.9628 316.69095"
            y="65.807106"
            id="tspan-lubricants"
          >
            LUBRICANTS
          </tspan>
        </text>
      </g>
    </svg>
  );
}

export function LogoRawH(props: { fillColor?: TPTPLDesainLogoColorComponent }) {
  const { fillColor } = props;
  return (
    <svg
      id="logo-ptpl-h"
      viewBox="0 0 1280 495"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      // width="1240"
      // height="395"
    >
      <defs id="defs-logo-ptpl-h" />
      <g id="g2048" transform="matrix(1,0,0,-1,0,425)">
        <LogoPTMN fillColor={fillColor} />
        <text
          id="text-pertamina"
          fontFamily="Futura Md BT"
          fontWeight="bold"
          fontSize="100.855px"
          fill={fillColor?.textPertamina ?? LogoColorRGB.textPertamina}
          transform="scale(1.0204567,-0.97995339)"
          x="450.7785"
          y="-142.86392"
        >
          <tspan
            id="tspan-pertamina"
            x="439.96234 523.39124 598.00354 682.35364 749.82043 844.82935 966.55151 1013.7927 1125.9084"
            y="-307.88989"
          >
            PERTAMINA
          </tspan>
        </text>
        <text
          id="text-lubricants"
          fontFamily="Futura Bk BT"
          fontWeight="normal"
          fontSize="100.161px"
          fill={fillColor?.textLubricants ?? LogoColorRGB.textLubricants}
          transform="scale(0.96498391,-1.0362867)"
          x="476.69189"
          y="-164.04704"
        >
          <tspan
            x="465.93591 520.81879 610.93439 681.27454 748.23541 780.65192 871.39319 949.61847 1046.6178 1110.0741"
            y="-172.432751"
            id="tspan-lubricants"
          >
            LUBRICANTS
          </tspan>
        </text>
      </g>
    </svg>
  );
}

export function LogoWhite() {
  const colorWhite: TPTPLDesainLogoColorComponent = {
    shapeRed: '#ffffff',
    shapeGreen: '#ffffff',
    shapeBlue: '#ffffff',
    textPertamina: '#ffffff',
    textLubricants: '#ffffff',
  };
  return <LogoRawV fillColor={colorWhite} />;
}

export function LogoGold() {
  const colorGold: TPTPLDesainLogoColorComponent = {
    shapeRed: 'rgb(195, 135, 52)',
    shapeGreen: 'rgb(195, 135, 52)',
    shapeBlue: 'rgb(195, 135, 52)',
    textPertamina: 'rgb(195, 135, 52)',
    textLubricants: 'rgb(195, 135, 52)',
  };
  return colorGold;
}

export function LogoThemed() {
  const theme = useTheme();

  const colorThemed: TPTPLDesainLogoColorComponent = {
    shapeRed: theme.palette.primary.main,
    shapeGreen: theme.palette.primary.main,
    shapeBlue: theme.palette.primary.main,
    textPertamina: theme.palette.primary.main,
    textLubricants: theme.palette.primary.main,
  };

  return colorThemed;
}

const colorWhite: TPTPLDesainLogoColorComponent = {
  shapeRed: '#ffffff',
  shapeGreen: '#ffffff',
  shapeBlue: '#ffffff',
  textPertamina: '#ffffff',
  textLubricants: '#ffffff',
};

export const LogoV = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const { themeMode } = useSettingsContext();

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 65,
          height: 75,
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <LogoRawV fillColor={themeMode === 'dark' ? colorWhite : LogoColorRGB} />
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/dashboard" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export const LogoH = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const { themeMode } = useSettingsContext();

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 150,
          height: 55,
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <LogoRawH fillColor={themeMode === 'dark' ? colorWhite : LogoColorRGB} />
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export function LogoBlueWhite() {
  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="35" height="34">
      <path
        d="M0 0 C11.55 0 23.1 0 35 0 C35 11.22 35 22.44 35 34 C23.45 34 11.9 34 0 34 C0 22.78 0 11.56 0 0 Z "
        fill="#256AC0"
        transform="translate(0,0)"
      />
      <path
        d="M0 0 C0.928125 0.0825 1.85625 0.165 2.8125 0.25 C1.57591941 3.67437702 0.45969559 6.69734711 -2.1875 9.25 C-5.375 9.5 -5.375 9.5 -8.1875 9.25 C-4.98850897 0.39125561 -4.98850897 0.39125561 0 0 Z "
        fill="#F6F9FC"
        transform="translate(16.1875,12.75)"
      />
      <path
        d="M0 0 C2.97 0.495 2.97 0.495 6 1 C6.33 1.99 6.66 2.98 7 4 C7.66 4.33 8.32 4.66 9 5 C8.67 5.66 8.34 6.32 8 7 C5.36 7 2.72 7 0 7 C0 4.69 0 2.38 0 0 Z "
        fill="#3170C2"
        transform="translate(7,21)"
      />
      <path
        d="M0 0 C1.4540625 0.0309375 1.4540625 0.0309375 2.9375 0.0625 C0.0625 4.9375 0.0625 4.9375 -1.0625 6.0625 C-3.06208364 6.10330783 -5.06295254 6.10504356 -7.0625 6.0625 C-3.52966102 0.0720339 -3.52966102 0.0720339 0 0 Z "
        fill="#EBF0F9"
        transform="translate(25.0625,12.9375)"
      />
      <path
        d="M0 0 C2.75 -0.3125 2.75 -0.3125 6 0 C10 4.10526316 10 4.10526316 10 6 C7.25 6.375 7.25 6.375 4 6 C1.625 3 1.625 3 0 0 Z "
        fill="#EEF2F9"
        transform="translate(18,6)"
      />
      <path
        d="M0 0 C-0.33 0.99 -0.66 1.98 -1 3 C-3.64 3 -6.28 3 -9 3 C-9 2.34 -9 1.68 -9 1 C-5.8035914 -0.06546953 -3.34252724 -0.07427838 0 0 Z "
        fill="#98B7E0"
        transform="translate(16,25)"
      />
    </svg>
  );
}
