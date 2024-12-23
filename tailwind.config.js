const flowbite = require("flowbite-react/tailwind")

module.exports = {
  content: [
    'index.html',
    './src/**/*.{js,jsx,ts,tsx,vue,html}',
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin({
      charts: true,
    })
  ],
}
