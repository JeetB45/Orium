import { motion,useMotionValue,animate } from "framer-motion";
import './App.css'
import { useRef, useState,useEffect } from "react";

function Button({ children, className, ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      {...props}
      className={`px-6 py-3 rounded-xl font-semibold transition duration-300 ${className}`}
    >
      {children}
    </motion.button>
  );
}

function Card({ children, className }) {
  return (
    <div className={`rounded-2xl bg-zinc-900 text-white shadow-md ${className}`}>{children}</div>
  );
}

function CardContent({ children, className }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusColor, setStatusColor] = useState('text-green-400');
  const form = useRef();
  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage('');
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('user_name'),
      email: formData.get('user_email'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch("orium-rbmnmc80w-jeetb45s-projects.vercel.app/send-email", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        setStatusMessage('✅ Message sent successfully!');
        setStatusColor('text-green-500');
        e.target.reset();
      } else {
        setStatusMessage('❌ Failed to send message.');
        setStatusColor('text-red-500');
      }
    } catch (error) {
      console.error(error);
      setStatusMessage('⚠️ Error occurred! Please try again later.');
      setStatusColor('text-red-500');
    }
    setIsSending(false);
    setTimeout(() => setStatusMessage(''), 4000);
  };

  const Counter = ({ from = 0, to, duration = 4}) => {
    const count = useMotionValue(from);
    const [current, setCurrent] = useState(from);
  
    useEffect(() => {
      const controls = animate(count, to, {
        duration,
        onUpdate: (latest) => setCurrent(Math.floor(latest)),
      });
      return controls.stop;
    }, [count, to, duration]);
  
    return <span>{current}+</span>;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-black text-yellow-400 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orium</h1>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-2xl focus:outline-none cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? "✖️" : "☰"}
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8 font-medium">
          <li className="hover:text-yellow-300 cursor-pointer">Home</li>
          <a href="#services" className="hover:text-yellow-300 cursor-pointer">Services</a>
          <a href="#aboutus" className="hover:text-yellow-300 cursor-pointer">About Us</a>
          <a href="#contact" className="hover:text-yellow-300 cursor-pointer">Contact Us</a>
        </ul>
      </div>

      {/* Mobile Nav with smooth animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-60 opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"
        }`}
      >
        <ul className="flex flex-col space-y-4 px-6 pb-4 pt-2 font-medium">
          <li className="hover:text-yellow-300 cursor-pointer">Home</li>
          <a href="#services" className="hover:text-yellow-300 cursor-pointer">Services</a>
          <a href="#aboutus" className="hover:text-yellow-300 cursor-pointer">About Us</a>
          <a href="#contact" className="hover:text-yellow-300 cursor-pointer">Contact Us</a>
        </ul>
      </div>
    </nav>
      <div className="min-h-screen bg-black text-yellow-400 font-sans mt-12 px-6 py-12 space-y-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Crafting Elite Digital Experiences for Visionary Brands
          </h1>
          <p className="text-lg text-yellow-200 max-w-2xl mx-auto mb-6">
            Welcome to Orium — where luxury design, cutting-edge tech, and creative vision merge.
          </p>
          <a href="#contact">
            <Button className="text-lg cursor-pointer px-6 py-3 rounded-2xl bg-yellow-400 text-black hover:bg-yellow-300 transition">
              Let’s Build Your Brand
            </Button>
          </a>
        </motion.div>
        <div className="space-y-6 text-center" id="services">
          <h2 className="text-3xl font-bold">Our Services</h2>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              {
                title: "Web Design & Development",
                desc: "Responsive websites tailored for luxury and impact."
              },
              {
                title: "SEO & Performance",
                desc: "Optimized for speed, discoverability, and conversions."
              },
              {
                title: "UI/UX Design",
                desc: "Aesthetic-first visuals to establish online authority."
              },
            ].map((service, idx) => (
              <Card key={idx} className="rounded-2xl bg-yellow-50 text-white shadow-lg hover:shadow-2xl transition duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-200">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto text-center space-y-10"
        >
          <h2 className="text-3xl font-bold text-yellow-400">Our Design & Development Process</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "1. Discovery",
                desc: "We begin with deep research and strategy to understand your brand, goals, and audience."
              },
              {
                title: "2. Design",
                desc: "Wireframes, moodboards, and pixel-perfect prototypes tailored to your unique identity."
              },
              {
                title: "3. Development",
                desc: "Clean, scalable code brought to life with modern frameworks and responsive design."
              },
              {
                title: "4. Testing",
                desc: "Performance, responsiveness, and cross-browser testing to ensure a flawless experience."
              },
              {
                title: "5. Launch",
                desc: "Go-live with confidence, backed by optimization and SEO best practices."
              },
              {
                title: "6. Maintenance",
                desc: "Ongoing updates, improvements, and support to keep you ahead of the curve."
              },
            ].map((step, idx) => (
              <Card key={idx} className="bg-zinc-800 text-yellow-100 hover:shadow-xl transition duration-300">
                <CardContent>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-yellow-200">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
        <div className="pt-5" id="aboutus">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto py-20 px-4 md:px-8 text-white"
        >
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-bold text-yellow-400">
              We Create Digital Solutions That Drive Results
            </h2>
            <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
              Founded with a passion for exceptional design and cutting-edge technology, our team of creative professionals is dedicated to helping businesses succeed in the digital landscape. We combine strategic thinking with technical expertise to deliver solutions that not only look great but also perform exceptionally well.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-semibold text-yellow-300">Creative Excellence</h3>
              <p className="text-zinc-300">
                Our design team brings fresh ideas and creative solutions to every project.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-yellow-300">Technical Expertise</h3>
              <p className="text-zinc-300">
                We stay ahead of the curve with the latest technologies and development practices.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-yellow-300">Results-Driven</h3>
              <p className="text-zinc-300">
                We focus on creating solutions that achieve your business objectives.
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 text-center">
            <div>
              <h4 className="text-3xl font-bold text-yellow-400"><Counter to={1} /></h4>
              <p className="text-zinc-400">Years Experience</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-yellow-400"><Counter to={5}/></h4>
              <p className="text-zinc-400">Projects Completed</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-yellow-400"><Counter to={3}/></h4>
              <p className="text-zinc-400">Happy Clients</p>
            </div>
          </div>
        </motion.div>
        </div>
       <div className="pt-8" id="contact">
       <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center space-y-10"
        >
          <div >
            <h2 className="text-3xl font-bold">Let’s Get in Touch</h2>
            <p className="text-yellow-300 max-w-xl mx-auto">
              Want to discuss a project or explore possibilities? Drop your message and we’ll respond faster than your competitors.
            </p>
          </div>
          <form ref={form} onSubmit={sendEmail} className="max-w-xl mx-auto space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              name="user_name"
              className="w-full px-4 py-3 rounded-xl bg-yellow-50 text-black placeholder-gray-700"
              required
            />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-xl bg-yellow-50 text-black placeholder-gray-700"
              required
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              name="message"
              className="w-full px-4 py-3 rounded-xl bg-yellow-50 text-black placeholder-gray-700"
              required
            />
            <Button
              type="submit"
              className={`bg-yellow-400 cursor-pointer text-black w-full px-6 py-3 rounded-2xl text-lg hover:bg-yellow-300`}
              disabled={isSending}
            >
              {isSending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </Button>
            {statusMessage && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-2 text-lg font-medium ${statusColor}`}
              >
                {statusMessage}
              </motion.p>
            )}
          </form>
        </motion.div>
       </div>
        <footer className="text-center border-t border-yellow-700 pt-8 mt-12">
          <p className="text-yellow-600">© {new Date().getFullYear()} Orium. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}

export default App
