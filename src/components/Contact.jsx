import { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send the form data to a server here
    // For now, we'll just simulate a successful submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message! I will get back to you soon.'
    });
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-24 bg-gray-100 dark:bg-dark relative transition-colors duration-300">
      <div className="container">
        <h2 className="section-title text-slate-800 dark:text-white">Get In Touch</h2>
        <p className="section-description text-slate-600 dark:text-gray-400">
          Feel free to contact me for any work or suggestions
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
          <div className="bg-white dark:bg-dark-lighter p-10 rounded-xl h-full lg:col-span-1 shadow-lg">
            <h3 className="text-slate-800 dark:text-white text-2xl mb-6 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[50px] after:h-0.5 after:bg-gradient-primary">
              Contact Information
            </h3>
            <p className="text-slate-600 dark:text-gray-300 mb-8">
              I'm open for new opportunities. Feel free to contact me.
            </p>
            
            <div className="flex items-start mb-6">
              <div className="text-primary text-2xl bg-primary/10 p-2.5 rounded-full mr-4">
                <FaEnvelope />
              </div>
              <div>
                <h4 className="text-slate-800 dark:text-white text-lg mb-2">Email</h4>
                <p className="text-slate-600 dark:text-gray-300">sjxsubham@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start mb-6">
              <div className="text-primary text-2xl bg-primary/10 p-2.5 rounded-full mr-4">
                <FaPhone />
              </div>
              <div>
                <h4 className="text-slate-800 dark:text-white text-lg mb-2">Phone</h4>
                <p className="text-slate-600 dark:text-gray-300">+876XXXXX990</p>
              </div>
            </div>
            
            <div className="flex items-start mb-6">
              <div className="text-primary text-2xl bg-primary/10 p-2.5 rounded-full mr-4">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h4 className="text-slate-800 dark:text-white text-lg mb-2">Location</h4>
                <p className="text-slate-600 dark:text-gray-300">City-Kolkata, Country-India</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-lighter p-10 rounded-xl lg:col-span-2 shadow-lg">
            <h3 className="text-slate-800 dark:text-white text-2xl mb-6 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[50px] after:h-0.5 after:bg-gradient-primary">
              Send Me a Message
            </h3>
            {formStatus.submitted && (
              <div className={`p-4 mb-6 rounded-md font-medium ${formStatus.success 
                ? 'bg-green-800/10 text-green-500 border border-green-500/30' 
                : 'bg-red-800/10 text-red-500 border border-red-500/30'}`}
              >
                {formStatus.message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-slate-200 dark:border-white/10 bg-transparent dark:bg-white/5 rounded-md text-slate-800 dark:text-white text-base transition-all duration-300 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(142,45,226,0.3)]"
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-slate-200 dark:border-white/10 bg-transparent dark:bg-white/5 rounded-md text-slate-800 dark:text-white text-base transition-all duration-300 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(142,45,226,0.3)]"
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-slate-200 dark:border-white/10 bg-transparent dark:bg-white/5 rounded-md text-slate-800 dark:text-white text-base transition-all duration-300 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(142,45,226,0.3)]"
                />
              </div>
              <div className="mb-6">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full min-h-[150px] px-5 py-3 border border-slate-200 dark:border-white/10 bg-transparent dark:bg-white/5 rounded-md text-slate-800 dark:text-white text-base transition-all duration-300 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(142,45,226,0.3)] resize-vertical"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
