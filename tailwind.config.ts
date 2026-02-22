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
        accent: "#D9C94A",
        gov: "#365B6D",
        sci: "#1F6A8A",
        health: "#7C5B1B",
        econ: "#7743A8",
        culture: "#1E4FA1",
      },
      boxShadow: {
        editorial: "0 8px 30px rgba(13, 19, 33, 0.12)",
      },
      backgroundImage: {
        noise:
          "radial-gradient(circle at 15% 8%, rgba(217,201,74,0.12), transparent 35%), radial-gradient(circle at 84% 3%, rgba(30,79,161,0.16), transparent 35%), linear-gradient(180deg, #f4f1ea 0%, #ece8de 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
