import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0D1321",
        paper: "#F5F2EB",
        steel: "#D8DEE9",
        accent: "#FC4C02",
        gov: "#365B6D",
        sci: "#2A7F62",
        health: "#A25A2B",
        econ: "#7743A8",
        culture: "#1E4FA1",
      },
      boxShadow: {
        editorial: "0 8px 30px rgba(13, 19, 33, 0.12)",
      },
      backgroundImage: {
        noise:
          "radial-gradient(circle at 20% 20%, rgba(252,76,2,0.08), transparent 40%), radial-gradient(circle at 80% 0%, rgba(30,79,161,0.1), transparent 35%), linear-gradient(180deg, #f5f2eb 0%, #ece9e2 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
