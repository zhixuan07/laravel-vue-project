/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        screens: {
            sm: { min: "300px", max: "600px" },
            md: { min: "601px", max: "1600px" },
            lg: { min: "1601px", max: "2000px" },
        },
        extend: {
            backgroundImage: { theme: "url('/src/assets/background.jpeg') ," },
            animation: {
                text: "text 5s ease infinite",
            },
            keyframes: {
                text: {
                    "0%, 100%": {
                        "background-size": "200% 200%",
                        "background-position": "left center",
                    },
                    "50%": {
                        "background-size": "200% 200%",
                        "background-position": "right center",
                    },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
