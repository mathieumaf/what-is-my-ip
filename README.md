# What is my IP? 🌐

A modern, responsive web application built with **Nuxt 4** and **TailwindCSS** that displays your public IP address and detailed location information using the ip-api.com service.

## ✨ Features

- **🔍 IP Address Detection** - Automatically detects and displays your public IP address
- **📍 Location Information** - Shows country, region, city, and timezone
- **🔧 Technical Details** - Displays ISP, AS number, latitude, and longitude coordinates
- **🗺️ Interactive Map Link** - Direct link to view your location on Google Maps
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **⚡ Fast Loading** - Server-side API with optimized data fetching
- **🔄 Refresh Functionality** - Easy refresh button to get updated information

## 🛠️ Tech Stack

- **[Nuxt 4](https://nuxt.com/)** - Vue.js framework with SSR support
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[ip-api.com](https://ip-api.com/)** - Free IP geolocation API
- **TypeScript** - Type-safe development
- **Vue 3** - Progressive JavaScript framework

## 🏗️ Architecture

```
├── app/
│   ├── layouts/
│   │   └── default.vue      # Main layout with header and styling
│   ├── pages/
│   │   └── index.vue        # Home page with IP information display
│   └── app.vue              # Root component
├── server/
│   └── api/
│       └── ip.get.ts        # Server-side API endpoint for IP fetching
└── public/                  # Static assets and favicons
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, pnpm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/mathieumaf/what-is-my-ip.git
cd what-is-my-ip

# Install dependencies
npm install
```

### Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🐳 Docker Deployment

The application includes a multi-stage Dockerfile for containerized deployment:

### Build the Docker image

```bash
docker build -t what-is-my-ip .
```

### Run the container

```bash
# Run in foreground
docker run -p 3000:3000 what-is-my-ip

# Run in background (detached)
docker run -d -p 3000:3000 --name my-ip-app what-is-my-ip
```

### Docker Features

- **Multi-stage build** - Optimized for production with smaller image size
- **Security hardened** - Non-root user execution
- **Alpine Linux** - Minimal base image for reduced attack surface
- **Production ready** - Only runtime dependencies included

## 📊 API Information

The application uses the [ip-api.com](https://ip-api.com/) free API to fetch:

- **IP Address** - Your public IP
- **Location** - Country, region, city, timezone
- **ISP Information** - Internet Service Provider details
- **AS Number** - Autonomous System information
- **Coordinates** - Latitude and longitude for map integration

### Smart IP Detection

The server API includes intelligent IP detection with:

- **Header Analysis** - Checks `x-forwarded-for`, `x-real-ip`, `cf-connecting-ip`, `x-client-ip`
- **Private IP Filtering** - Automatically filters out private/local IP ranges:
  - IPv4: `192.168.x.x`, `10.x.x.x`, `172.16-31.x.x`, `127.0.0.1`
  - IPv6: `::1`, `::ffff:127.0.0.1`
  - Special: `169.254.x.x` (link-local), `224.x.x.x` (multicast)
- **Fallback Logic** - Uses server's public IP when client has private IP
- **Production Ready** - Works with proxies, CDNs, and load balancers

## 🎨 UI Components

- **Loading States** - Elegant spinner during data fetching
- **Error Handling** - User-friendly error messages with retry functionality
- **Card Layout** - Clean, organized information display
- **Interactive Elements** - Hover effects and smooth transitions
- **Responsive Grid** - Adapts to different screen sizes

## 🔧 Customization

The application is built with modularity in mind:

- **Styling** - Modify TailwindCSS classes in components
- **API Fields** - Adjust fields in `server/api/ip.get.ts`
- **Layout** - Update `app/layouts/default.vue` for different designs
- **Meta Tags** - Configure SEO settings in `nuxt.config.ts`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Mathieu Mafille**

---

Built with ❤️ using Nuxt 4 and TailwindCSS
