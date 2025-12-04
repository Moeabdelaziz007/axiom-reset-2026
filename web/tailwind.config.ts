import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                border: "hsl(var(--border))",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
            animation: {
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "fade-in-up": "fadeInUp 0.6s ease-out forwards",
            },
            keyframes: {
                fadeInUp: {
                    from: { opacity: "0", transform: "translateY(20px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
