// import type { Config } from "tailwindcss";
import {color, colorsType, fontSize, fontSizeType} from "./styles";

const config: {
  plugins: any[];
  theme: {
    extend: {
      backgroundImage: { "gradient-conic": string; "gradient-radial": string },
      screens: {
        mobile: { min: string, max: string },
        tablet: { min: string, max: string },
        pc: { min: string },
      },
       };
    fontSize: fontSizeType
    colors: colorsType
  };
  content: string[]
} = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: color,
    fontSize: fontSize,
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        mobile: { min: "0px", max: "480px" },
        tablet: { min: "481px", max: "768px" },
        pc: { min: "769px" },
      },
    },

  },
  plugins: [],
};

export default config;
