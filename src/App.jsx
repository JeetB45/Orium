import { motion } from "framer-motion";
import './App.css'


function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={`px-6 py-3 rounded-xl font-semibold transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

function Card({ children, className }) {
  return (
    <div className={`rounded-2xl bg-zinc-900 shadow-md ${className}`}>{children}</div>
  );
}

function CardContent({ children, className }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

function App() {

  return (
    <>
       <main className="min-h-screen bg-black text-white font-sans px-4 py-10">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold"
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}>
          Build Elite Websites with <span className="text-yellow-400">Orium</span>
        </motion.h1>
        <p className="text-lg md:text-xl text-gray-300">
          We create luxury-grade digital experiences for businesses that demand more.
        </p>
        <a href="https://wa.me/7359399890" target="_blank">
          <Button className="bg-yellow-500 text-black hover:bg-yellow-400 text-lg">Let's Talk on WhatsApp</Button>
        </a>
      </section>

      {/* Services */}
      <section className="py-20 max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {[
          { title: "1-Page Websites", desc: "Clean, fast, SEO-optimized sites for small businesses." },
          { title: "Portfolio & Landing Pages", desc: "High-converting designs with creative flair." },
          { title: "Hosting & Domain", desc: "From purchase to deployment – fully managed." },
        ].map((service, i) => (
          <Card key={i}>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2 text-yellow-400">{service.title}</h3>
              <p className="text-gray-300">{service.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Showcase */}
      <section className="py-16 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Recent Work</h2>
        <p className="text-gray-400 mb-6">(Sample project screenshots or mockups can go here)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-zinc-800 h-48 rounded-xl animate-pulse" />
          <div className="bg-zinc-800 h-48 rounded-xl animate-pulse" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-zinc-700 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Orium Studio. Built with passion & precision.
      </footer>
    </main>
    </>
  )
}

export default App
