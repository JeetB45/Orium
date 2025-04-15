import { motion, useMotionValue, animate } from "framer-motion";
import './App.css'
import React from "react"
import { useRef, useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ExternalLink } from 'lucide-react';
import {
  ArrowRight,
  ChevronRight,
  Code,
  Layout,
  Smartphone,
  Palette,
  Globe,
  Cloud,
  Zap,
  Users,
  Send,
} from "lucide-react";

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
      const res = await fetch("/send-email", {
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

  const Counter = ({ from = 0, to, duration = 4 }) => {
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

  const processSteps = [
    {
      title: "Discovery",
      description: "Understanding your goals and requirements",
      icon: <Users className="w-8 h-8 text-violet-400" />,
    },
    {
      title: "Planning",
      description: "Creating detailed project roadmap",
      icon: <Layout className="w-8 h-8 text-violet-400" />,
    },
    {
      title: "Design",
      description: "Crafting beautiful user interfaces",
      icon: <Palette className="w-8 h-10 text-violet-400" />,
    },
    {
      title: "Development",
      description: "Building with modern technologies",
      icon: <Code className="w-8 h-10 text-violet-400" />,
    },
    {
      title: "Testing",
      description: "Ensuring quality and performance",
      icon: <Zap className="w-8 h-10 text-violet-400" />,
    },
    {
      title: "Launch",
      description: "Deploying and maintaining your solution",
      icon: <Globe className="w-8 h-10 text-violet-400" />,
    },
  ];

  const services = [
    {
      title: "Website Development",
      description: "Custom web solutions built with cutting-edge technologies, ensuring responsive design and optimal user experience",
      icon: <Code className="w-10 h-10 text-violet-400" />,
    },
    {
      title: "E-commerce Solutions",
      description: "Scalable online stores with advanced features, secure payment integration, and seamless inventory management",
      icon: <Globe className="w-10 h-10 text-violet-400" />,
    },
    {
      title: "UI/UX Design",
      description: "Intuitive and engaging user experiences with modern design principles and beautiful interfaces",
      icon: <Palette className="w-10 h-10 text-violet-400" />,
    },
    {
      title: "Cloud & DevOps",
      description: "Comprehensive cloud solutions and DevOps practices for scalable and reliable applications",
      icon: <Cloud className="w-10 h-10 text-violet-400" />,
    },
  ];

  const ProjectCard = ({ title, description, imageUrl, link }) => {
    return (
      <Card className="group overflow-hidden transition-all duration-300 hover:scale-[1.02] bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white flex items-center gap-2 hover:text-violet-400 transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
                <span>View Project</span>
              </a>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
            <p className="text-gray-400">{description}</p>
          </div>
        </CardContent>
      </Card>
    );
  };

  const projects = [
    {
      title: "AI-Powered Analytics Platform",
      description: "Enterprise-level analytics solution with advanced AI capabilities for real-time data processing",
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      link: "#",
    },
    {
      title: "Digital Transformation Suite",
      description: "End-to-end digital transformation platform for Fortune 500 companies",
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      link: "#",
    },
    {
      title: "Enterprise Integration Hub",
      description: "Seamless system integration platform connecting legacy and modern infrastructures",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
      link: "#",
    },
  ];

  const technologies = [
    {
      category: "Frontend",
      items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Python", "Java", "PostgreSQL", "MongoDB"],
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    },
    {
      category: "Tools & Others",
      items: ["Git", "Jira", "Figma", "Adobe XD", "Postman"],
    },
  ];

  const testimonials = [
    {
      name: "John Smith",
      role: "CEO, TechCorp",
      company: "TechCorp Inc.",
      content: "Elite Digital Solutions transformed our digital presence completely. Their expertise in web development is unmatched.",
    },
    {
      name: "Sarah Johnson",
      role: "CTO, InnovateTech",
      company: "InnovateTech",
      content: "The team's attention to detail and technical expertise made our project a huge success. Highly recommended!",
    },
    {
      name: "Michael Brown",
      role: "Director, DataFlow",
      company: "DataFlow Systems",
      content: "Outstanding service and exceptional results. They delivered beyond our expectations.",
    },
  ];

  const Input = React.forwardRef((props, ref) => {
    const { className, type, ...rest } = props

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...rest}
      />
    )
  })
  Input.displayName = "Input";


  const Textarea = React.forwardRef((props, ref) => {
    const { className, ...rest } = props

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...rest}
      />
    )
  })
  Textarea.displayName = "Textarea";

  const cn = (...inputs) => {
    return twMerge(clsx(inputs))
  }
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-slate-900 text-white font-sans">
        <nav className="fixed top-0 left-0 w-full bg-black/5 backdrop-blur border-b border-white/10 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">Orium</h1>

            {/* Hamburger Icon */}
            <button
              className="md:hidden text-3xl focus:outline-none text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? "✖️" : "☰"}
            </button>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-8 font-medium text-white">
              <li className="hover:text-violet-500 cursor-pointer">Home</li>
              <li><a href="#services" className="hover:text-violet-500 cursor-pointer">Services</a></li>
              <li><a href="#aboutus" className="hover:text-violet-500 cursor-pointer">About Us</a></li>
              <li><a href="#contact" className="hover:text-violet-500 cursor-pointer">Contact Us</a></li>
            </ul>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-60 opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"
              }`}
          >
            <ul className="flex flex-col space-y-4 px-6 pb-4 pt-2 font-medium text-white">
              <li className="hover:text-violet-500 cursor-pointer">Home</li>
              <li><a href="#services" className="hover:text-violet-500 cursor-pointer">Services</a></li>
              <li><a href="#aboutus" className="hover:text-violet-500 cursor-pointer">About Us</a></li>
              <li><a href="#contact" className="hover:text-violet-500 cursor-pointer">Contact Us</a></li>
            </ul>
          </div>
        </nav>


        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col justify-center items-center px-4 relative text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-800/20 via-transparent to-transparent" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-center mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Elite Digital Solutions
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Empowering enterprises with cutting-edge technology solutions that drive innovation and digital excellence
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
              <Button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 flex items-center justify-center gap-2 text-sm sm:text-base w-1/2 sm:w-auto">
                <span>Explore Solutions</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="border-violet-700 bg-amber-100 text-violet-400 hover:bg-violet-950/50 px-6 py-3 text-sm sm:text-base w-1/2 sm:w-auto"
              >
                View Case Studies
              </Button>
            </div>
          </div>
        </section>


        {/*Services */}
        <section className="py-32 px-4 relative">
          <div className="container">
            <motion.h2
              className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-4 text-center"
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Services
            </motion.h2>

            <motion.p
              className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Comprehensive digital solutions tailored to your business needs
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="p-6 rounded-xl bg-white/5 cursor-pointer backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/*Process*/}
        <section className="py-32 px-4 relative bg-black/40">
          <div className="container">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-4 text-center">
              Our Design & Development Process
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
              A systematic approach to delivering exceptional results
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group hover:bg-white/10 transition-all hover:scale-105"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                      {(index + 1).toString().padStart(2, '0')}
                    </div>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/*Portfolio */}
        <section className="py-32 px-4 relative bg-black/40">
          <div className="container">
            <div className="flex items-center justify-between mb-16">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-4">
                  Featured Projects
                </h2>
                <p className="text-gray-400 max-w-2xl">
                  Discover how we've helped leading organizations achieve digital transformation
                </p>
              </div>
              <Button variant="ghost" className="hidden md:flex items-center text-violet-400 hover:text-violet-300">
                View All Projects <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
            <Button variant="ghost" className="md:hidden mt-8 w-full text-violet-400 hover:text-violet-300">
              View All Projects <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/*Tech Stack*/}
        <section className="py-32 px-4 relative bg-black/40">
          <div className="container">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-4 text-center">
              Our Technology Stack
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
              We use cutting-edge technologies to build robust and scalable solutions
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {technologies.map((tech) => (
                <Card key={tech.category} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">{tech.category}</h3>
                    <ul className="space-y-2">
                      {tech.items.map((item) => (
                        <li key={item} className="text-gray-400 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-32 px-4 relative">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="max-w-6xl mx-auto py-20 px-4 md:px-8 text-white"
                >
                  <div className="text-center space-y-6">
                    <h2 className="text-4xl font-bold text-violet-600">
                      We Create Digital Solutions That Drive Results
                    </h2>
                    <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
                      Founded with a passion for exceptional design and cutting-edge technology, our team of creative professionals is dedicated to helping businesses succeed in the digital landscape. We combine strategic thinking with technical expertise to deliver solutions that not only look great but also perform exceptionally well.
                    </p>
                  </div>

                  <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
                    <div>
                      <h3 className="text-xl font-bold text-violet-500">Creative Excellence</h3>
                      <p className="text-zinc-300">
                        Our design team brings fresh ideas and creative solutions to every project.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-violet-500">Technical Expertise</h3>
                      <p className="text-zinc-300">
                        We stay ahead of the curve with the latest technologies and development practices.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-violet-500">Results-Driven</h3>
                      <p className="text-zinc-300">
                        We focus on creating solutions that achieve your business objectives.
                      </p>
                    </div>
                  </div>

                  <div className="mt-16 grid grid-cols-3 gap-6 text-center">
                    <div>
                      <h4 className="text-3xl font-bold text-violet-500"><Counter to={1} /></h4>
                      <p className="text-zinc-400">Years Experience</p>
                    </div>
                    <div>
                      <h4 className="text-3xl font-bold text-violet-500"><Counter to={5} /></h4>
                      <p className="text-zinc-400">Projects Completed</p>
                    </div>
                    <div>
                      <h4 className="text-3xl font-bold text-violet-500"><Counter to={3} /></h4>
                      <p className="text-zinc-400">Happy Clients</p>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-2xl blur-3xl" />
                <div className="relative aspect-square rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 flex items-center justify-center">
                  <Users className="w-32 h-32 text-violet-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-32 px-4 relative">
          <div className="container max-w-4xl mx-auto">
            <div className="relative p-8 md:p-12 rounded-2xl overflow-hidden text-center flex flex-col items-center">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20 backdrop-blur-sm" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-800/40 via-transparent to-transparent" />

              <div className="relative z-10 max-w-xl">
                <div className="flex justify-center items-center gap-2 mb-4">
                  <Zap className="w-6 h-6 text-violet-400" />
                  <span className="text-violet-400 font-semibold text-sm sm:text-base">
                    Limited Time Offer
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Let’s Build Something Incredible Together
                </h2>

                <p className="text-gray-400 mb-6">
                  Ready to elevate your digital presence? Partner with us and turn your ideas into reality.
                </p>

                {/* 👉 Centered Button */}
                <div className="flex justify-center">
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto">
                    <span>Get Started</span>
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-32 px-4 relative bg-black/40 flex justify-center">
          <div className="container max-w-4xl w-full">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-4 text-center">
              Get In Touch
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
              Ready to start your project? Contact us for a free consultation
            </p>

            <form ref={form} onSubmit={sendEmail} className="space-y-6 mx-auto max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  placeholder="Your Name"
                  name="user_name"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
                <Input
                  type="email"
                  name="user_email"
                  placeholder="Your Email"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>

              <Textarea
                placeholder="Your Message"
                name="message"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 min-h-[200px]"
              />

              <Button
                type="submit"
                className={`bg-violet-600 cursor-pointer text-white w-full px-6 py-3 rounded-2xl text-lg hover:bg-violet-700`}
                disabled={isSending}
              >
                {isSending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
          </div>
        </section>

      </div>

    </>
  )
}

export default App
