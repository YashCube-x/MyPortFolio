import { useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Reveal } from "../components/Reveal";

export default function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

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
      await axios.post("http://localhost:5000/api/contact", formData);

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Auto hide after 5 seconds
      setTimeout(() => {
        setStatus("");
      }, 5000);
    } catch (error) {
      setStatus("error");
      
      // Auto hide error after 5 seconds
      setTimeout(() => {
        setStatus("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-white text-black font-['Outfit'] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-10 mb-16 md:mb-20">
        <div className="text-center mb-10 md:mb-16">
          <p className="text-gray-400 text-xs tracking-[4px] uppercase font-bold mb-4">
            Contact Me
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1f2933]">
            Let's Start A New Project
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 md:gap-16">

          {/* Contact Info */}
          <div className="space-y-8">
            <ContactItem icon={<FaMapMarkerAlt />} title="Location" text="Kanpur, Uttar Pradesh 208024" />
            <ContactItem icon={<FaPhoneAlt />} title="Phone" text="+91-9125900756" />
            <ContactItem icon={<FaEnvelope />} title="Email" text="yashcube07@gmail.com" />
          </div>

          {/* Contact Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-sm p-4 text-sm focus:outline-none focus:border-black transition"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-sm p-4 text-sm focus:outline-none focus:border-black transition"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-sm p-4 text-sm focus:outline-none focus:border-black transition"
              />
              <input
                type="text"
                name="subject"
                placeholder="Your Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-sm p-4 text-sm focus:outline-none focus:border-black transition"
              />
            </div>

            <textarea
              name="message"
              placeholder="Start writing message here"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-sm p-4 text-sm focus:outline-none focus:border-black transition resize-none"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#1f252b] text-white px-10 py-4 text-xs font-bold tracking-widest uppercase rounded-sm hover:opacity-90 transition cursor-pointer disabled:opacity-50"
            >
              {loading ? "Sending..." : "Submit Now"}
            </button>

            {/* Success/Error Notification */}
            {status === "success" && (
              <div className="flex items-center gap-3 bg-[#1f2933] border border-gray-700 text-white px-6 py-4 rounded-sm animate-fade-in-up shadow-lg">
                <svg className="w-6 h-6 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Message Sent Successfully</p>
                  <p className="text-xs text-gray-400 mt-1">Thank you for reaching out. I'll get back to you soon!</p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-3 bg-[#1f2933] border border-gray-700 text-white px-6 py-4 rounded-sm animate-fade-in-up shadow-lg">
                <svg className="w-6 h-6 flex-shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Failed to Send Message</p>
                  <p className="text-xs text-gray-400 mt-1">Please try again or email me directly at yashcube07@gmail.com</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Map */}
      <div className="w-full h-[250px] md:h-[400px] bg-gray-100 overflow-hidden grayscale-[50%]">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          src="https://www.openstreetmap.org/export/embed.html?bbox=80.2396%2C26.3934%2C80.4496%2C26.5434&layer=mapnik"
          title="Map"
        ></iframe>
      </div>
    </section>
  );
}

function ContactItem({ icon, title, text }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="w-14 h-14 border border-gray-200 rounded-full flex items-center justify-center text-[#1f2933] text-lg">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-bold text-[#1f2933]">{title}</h4>
        <p className="text-gray-500 text-sm mt-1">{text}</p>
      </div>
    </div>
  );
}
