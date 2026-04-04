import React, { useState } from 'react';
import { contact } from '../services/api';

export default function ContactMe() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const result = await contact.send(formData);

  if (result.success) {
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  } else {
    console.error(result.error);
  }
};
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-purple-100 py-12 px-6">
        <h1 className="text-4xl font-bold text-purple-700">Contact Us</h1>
        <p className="text-gray-700 mt-4 text-base sm:text-lg">
          We'd love to hear from you! Fill out the form below.
        </p>
      </div>

      {/* Form Section */}
      <div className="bg-white py-12 px-6">
        {submitted && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-xl">
            Thank you for your message! We'll get back to you soon.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border-none focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border-none focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border-none focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message..."
              rows="6"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border-none focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition"
          >
            Send Message
          </button>
        </form>
      </div>

    </div>
  );
}