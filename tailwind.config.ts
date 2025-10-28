import * as colors from '@radix-ui/colors';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import windyRadixPlugin from 'windy-radix-palette';
import { toRadixVars } from 'windy-radix-palette/vars';
import { ThemeSetting } from './edit-me/types/Config';
import resumeConfig from './edit-me/config/resumeConfig';
import { contrastColor } from './src/helpers/colorContrast';

const hasRadixPalette = (token: string): token is keyof typeof colors =>
  Object.prototype.hasOwnProperty.call(colors, token);

const accentKey = hasRadixPalette(resumeConfig.accentColor)
  ? resumeConfig.accentColor
  : ('blue' as keyof typeof colors);
const accentDarkKey = hasRadixPalette(`${accentKey}Dark`)
  ? (`${accentKey}Dark` as keyof typeof colors)
  : ('blueDark' as keyof typeof colors);

const neutralKey = hasRadixPalette(resumeConfig.neutralColor)
  ? resumeConfig.neutralColor
  : ('mauve' as keyof typeof colors);
const neutralDarkKey = hasRadixPalette(`${neutralKey}Dark`)
  ? (`${neutralKey}Dark` as keyof typeof colors)
  : ('mauveDark' as keyof typeof colors);

export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: resumeConfig.appTheme === ThemeSetting.System ? 'media' : 'class',
  plugins: [
    windyRadixPlugin({
      // only generate CSS vars for configured color choices
      colors: Object.fromEntries(
        Object.entries({
          [accentKey]: colors[accentKey],
          [accentDarkKey]: colors[accentDarkKey],
          amber: colors.amber,
          amberDark: colors.amberDark,
          [neutralKey]: colors[neutralKey],
          [neutralDarkKey]: colors[neutralDarkKey],
          red: colors.red,
          redDark: colors.redDark,
        }).filter(([, value]) => value !== undefined && value !== null),
      ),
    }),
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus']);
    }),
  ],
  theme: {
    extend: {
      // add semantic names for configured color choices
      colors: {
        accent: toRadixVars(accentKey),
        accentContrast: contrastColor,
        danger: toRadixVars('red'),
        neutral: toRadixVars(neutralKey),
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      fontFamily: {
        mono: ['var(--font-jetbrains-mono)'],
        sans: ['var(--font-albert)'],
      },
    },
  },
} satisfies Config;
