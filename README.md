# Modern Portfolio Website

A modern, responsive portfolio website built with React and Vite that automatically showcases your GitHub projects.

## 🌟 Features

- ⚡️ **Lightning Fast**: Built with Vite for optimal performance
- 🎨 **Modern UI**: Clean design with Tailwind CSS
- 🔄 **Real-time GitHub Integration**: Automatically displays your latest projects
- 📱 **Fully Responsive**: Works perfectly on all devices
- ✨ **Smooth Animations**: Beautiful transitions with Framer Motion
- 📧 **Contact Form**: Easy to reach out via EmailJS
- 🌙 **Modern Stack**: React 18 with latest best practices

## 🛠️ Tech Stack

- **Frontend Framework**: React with Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Contact Form**: EmailJS
- **Project Data**: GitHub REST API

## 🚀 Quick Start

1. Clone the repository
```bash
git clone https://github.com/ShashwatThakur0/React-Portfolio.git
cd React-Portfolio
```

2. Install dependencies
```bash
cd client
npm install
```

3. Configure
- Replace `GITHUB_USERNAME` in `src/services/github.js` with your GitHub username
- Set up EmailJS:
  1. Create an account at [EmailJS](https://www.emailjs.com/)
  2. Get your service ID, template ID, and user ID
  3. Update these in the Contact component

4. Start the development server
```bash
npm run dev
```

5. Open http://localhost:5173 in your browser

## 📝 Project Structure

```
client/
├── public/          # Static files
├── src/
│   ├── components/  # React components
│   ├── services/    # API services (GitHub)
│   ├── App.jsx      # Main app component
│   └── main.jsx     # Entry point
└── index.html       # HTML template
```

## 🎨 Customization

1. **Personal Information**: Update your name and details in `Home.jsx`
2. **Projects**: They're automatically fetched from your GitHub
3. **Styling**: Customize colors and theme in `tailwind.config.js`
4. **Content**: Modify text in respective components

## 📱 Features

### Home Page
- Professional introduction
- Call-to-action buttons
- Smooth animations

### Projects Section
- Real-time GitHub repository display
- Project stars and forks count
- Live demo links (if available)
- Primary language tags

### Contact Form
- Name, email, and message fields
- Email notification system
- Success/error handling

## 📤 Deployment

Deploy your portfolio using:
- [Vercel](https://vercel.com/) (Recommended)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)

## 📄 License

This project is open source and available under the MIT License.
