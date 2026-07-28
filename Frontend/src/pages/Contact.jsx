import { useState, useEffect } from "react";
import axios from "axios";
import { MapPin, Phone, Mail, Send, CheckCircle2, XCircle, Navigation } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { Kicker, Title } from "../components/SectionHeading";
import Magnetic from "../components/Magnetic";
import api from "../lib/api";

const INPUT_CLASS =
  "w-full bg-white border border-black/[0.08] rounded-sm p-4 text-sm text-[#17150F] placeholder:text-[#A29A8B] focus:outline-none focus:border-[#A9832F]/70 transition duration-300 shadow-sm";

export default function Contact() {
  const [settings, setSettings] = useState({ location: "", phone: "", email: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.get("/settings").then((res) => setSettings(res.data.data));
  }, []);

  const address = settings.location;
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.post(`${apiUrl}/api/contact`, formData);

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setStatus(""), 5000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#F5F1E8] text-[#17150F] font-['Outfit'] py-20 md:py-28 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-[30%] w-[40%] h-[35%] bg-[#D4AF6A]/[0.10] blur-[140px] rounded-full pointer-events-none" />

      {/* Grain */}
      <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:22px_22px] opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-10 relative z-10">
        <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
          <Kicker tone="light" className="mb-5">Contact Me</Kicker>
          <Title tone="light">Let's Start A New Project</Title>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* Left half — info + form */}
          <div>
            <div className="flex flex-wrap gap-x-10 gap-y-6 mb-10 pb-10 border-b border-black/[0.08]">
              <ContactItem icon={<MapPin size={18} strokeWidth={1.5} />} title="Location" text={settings.location} />
              <ContactItem icon={<Phone size={18} strokeWidth={1.5} />} title="Phone" text={settings.phone} />
              <ContactItem icon={<Mail size={18} strokeWidth={1.5} />} title="Email" text={settings.email} />
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={INPUT_CLASS}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={INPUT_CLASS}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={INPUT_CLASS}
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Your Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={INPUT_CLASS}
                />
              </div>

              <textarea
                name="message"
                placeholder="Start writing message here"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className={`${INPUT_CLASS} resize-none`}
              ></textarea>

              <div className="flex items-center gap-6 flex-wrap">
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex items-center gap-2.5 bg-[#17150F] text-[#F5F1E8] px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-[#A9832F] transition-colors duration-300 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Submit Now"}
                    <Send size={13} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </button>
                </Magnetic>

                <p className="font-['JetBrains_Mono'] text-[10px] tracking-[0.3em] uppercase text-[#A29A8B]">
                  Avg. response <span className="text-[#A9832F]">&lt; 24 hours</span>
                </p>
              </div>

              {/* Success/Error Notification */}
              {status === "success" && (
                <div className="flex items-center gap-3 bg-white border border-[#A9832F]/30 text-[#17150F] px-6 py-4 rounded-sm animate-fade-in-up shadow-lg">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-green-600" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Message Sent Successfully</p>
                    <p className="text-xs text-[#6F6A60] mt-1">Thank you for reaching out. I'll get back to you soon!</p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-3 bg-white border border-[#E5734D]/40 text-[#17150F] px-6 py-4 rounded-sm animate-fade-in-up shadow-lg">
                  <XCircle className="w-6 h-6 flex-shrink-0 text-[#D14D2A]" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Failed to Send Message</p>
                    <p className="text-xs text-[#6F6A60] mt-1">Please try again or email me directly at {settings.email}</p>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right half — square map card + get directions */}
          <Reveal width="100%">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-black/[0.08] shadow-xl group">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                src={mapEmbedSrc}
                title="Map"
                className="absolute inset-0 w-full h-full"
                style={{ filter: "grayscale(0.5) sepia(0.12) contrast(0.95)" }}
              ></iframe>

              {/* Overlay gradient so it reads as a designed card, not a raw embed */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#17150F]/70 via-transparent to-transparent" />

              {/* Address chip */}
              <div className="absolute top-4 left-4 right-4 flex items-start gap-2 bg-white/90 backdrop-blur-sm rounded-sm px-4 py-3 shadow-md">
                <MapPin size={16} className="text-[#A9832F] mt-0.5 flex-shrink-0" />
                <p className="text-xs font-medium text-[#17150F] leading-snug">{address}</p>
              </div>

              {/* Get Directions button */}
              <div className="absolute bottom-4 left-4 right-4">
                <Magnetic strength={0.15} className="block w-full">
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-label="OPEN"
                    className="group flex items-center justify-center gap-2.5 w-full bg-[#17150F] text-[#F5F1E8] px-6 py-4 text-xs font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-[#A9832F] transition-colors duration-300 shadow-lg"
                  >
                    <Navigation size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    Get Directions
                  </a>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, title, text }) {
  return (
    <div className="flex gap-3 items-start group">
      <div className="min-w-[42px] min-h-[42px] w-[42px] h-[42px] border border-[#A9832F]/40 bg-white/70 rounded-sm flex items-center justify-center text-[#A9832F] group-hover:bg-[#17150F] group-hover:text-[#D4AF6A] group-hover:border-[#17150F] transition-colors duration-500 shadow-sm">
        {icon}
      </div>
      <div>
        <h4 className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] uppercase text-[#A29A8B]">{title}</h4>
        <p className="text-[#17150F] text-sm mt-1 font-medium">{text}</p>
      </div>
    </div>
  );
}
