/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{tsx, ts, jsx, js}"
  ],
  theme: {
    extend: {
      spacing: {
        '96': '24rem',
        '320': '80rem'
      },
      // 配置颜色
      colors: {
        white: "luyi(cw)",
        black: "luyi(cb)",
        // white: "var(--white)",
        // black: "var(--black)",
        gray: {
          // 变量式的
          50: "luyi(cg05)",
          100: "luyi(cg10)",
          // 50: "var(--color-gray-50)",
          // 100: "var(--color-gray-100)",
          // 200: "var(--color-gray-200)",
          // 300: "var(--color-gray-300)",
          // 400: "#9ca3af",
          // 500: "#6b7280",
          // 600: "var(--color-gray-600)",
          // 700: "#374151",
          // 800: "var(--color-gray-800)",
          // 900: "var(--color-gray-900)",
          // 950: "var(--color-gray-950)"

          // 正向的
          // 50: "#f9fafb",
          // 100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712"
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}