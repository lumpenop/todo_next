import {DefaultColors} from "tailwindcss/types/generated/colors";

export type fontSizeType = {
  [index: string]: (string | {[index: string]: string})[] | fontSizeType;
}

let fontSize: fontSizeType = {
  '16': {
    'bold': ['16px', {
      fontWeight: '600'
    }],
    'xbold': ['16px', {
      fontWeight: '800'
    }],
  },
  '18': ['18px', {
    fontWeight: '800'
  }],
  '20': ['16px', {
    fontWeight: '800'
  }]
}



export type colorPicks = Pick<DefaultColors, 'slate'|'violet'|'rose'|'lime'|'amber'|'green'>
export type colorsType = {
  [index in keyof colorPicks]: { [index: string]: string; };
};


export let color:
  colorsType
 =  {
  'slate': {
    '900': '#0F172A',
    '800': '#1E293B',
    '500': '#64748B',
    '400': '#94A3B8',
    '300': '#CBD5E1',
    '200': '#E2E8F0',
    '100': '#F1F5F9'
  },
  'violet': {
    '600': '#7C3AED',
    '100': '#EDE9FE'
  },
  'rose': {
    '500': '#F43F5E'
  },
  'lime': {
    '300': '#BEF264'
  },
  'amber': {
    '300': '#FCD34D',
    '800': '#92400E'
  },
  'green': {
    '700': '#15803D'
  }
}


export {fontSize}
