import { useState, useRef } from 'react';
import { Send, Loader2, Check, AlertCircle, Mail, User, MessageSquare, FileText, MapPin, Phone, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import emailjs from '@emailjs/browser';

// EmailJS configuration — replace these with your actual keys
const EMAILJS_SERVICE_ID = 'service_portfolio'; // Your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_contact'; // Your EmailJS template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';   // Your EmailJS public key

const ContactApp = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [errorMsg, setErrorMsg] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'message') {
      setCharCount(value.length);
    }
  };

  const validateForm = () => {
    if (!formData.from_name.trim()) return 'Please enter your name.';
    if (!formData.from_email.trim()) return 'Please enter your email.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email)) return 'Please enter a valid email address.';
    if (!formData.subject.trim()) return 'Please enter a subject.';
    if (!formData.message.trim()) return 'Please enter a message.';
    if (formData.message.trim().length < 10) return 'Message must be at least 10 characters.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setStatus('error');
      setErrorMsg(validationError);
      setTimeout(() => {
        if (status === 'error') setStatus('idle');
      }, 4000);
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      setFormData({ from_name: '', from_email: '', subject: '', message: '' });
      setCharCount(0);

      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus('error');
      setErrorMsg(
        err?.text || 'Failed to send message. Please try again or email directly at sjxsubham@gmail.com'
      );

      setTimeout(() => {
        setStatus('idle');
        setErrorMsg('');
      }, 6000);
    }
  };

  const inputClasses = (fieldName) =>
    `w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-sm text-white/90 placeholder:text-white/20 outline-none transition-all duration-300 ${
      focusedField === fieldName
        ? 'border-purple-500/50 shadow-[0_0_0_3px_rgba(168,85,247,0.08)] bg-white/[0.05]'
        : 'border-white/8 hover:border-white/15'
    }`;

  return (
    <div className="h-full overflow-y-auto bg-[#0a0e14] custom-scrollbar">
      <div className="p-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 mb-4">
            <Mail size={24} className="text-purple-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Get In Touch</h2>
          <p className="text-white/40 text-sm max-w-md mx-auto leading-relaxed">
            Have a project idea, job opportunity, or just want to say hello?
            I'd love to hear from you. Fill out the form below or reach out through any of my social links.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            {/* Contact Cards */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5">
                <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                  Contact Information
                </h3>
              </div>

              <div className="p-1">
                {[
                  {
                    icon: <Mail size={14} />,
                    label: 'Email',
                    value: 'sjxsubham@gmail.com',
                    href: 'mailto:sjxsubham@gmail.com',
                    color: 'text-blue-400',
                    hoverBg: 'hover:bg-blue-500/5',
                  },
                  {
                    icon: <Phone size={14} />,
                    label: 'Phone',
                    value: '+876XXXXX990',
                    href: null,
                    color: 'text-green-400',
                    hoverBg: 'hover:bg-green-500/5',
                  },
                  {
                    icon: <MapPin size={14} />,
                    label: 'Location',
                    value: 'Kolkata, India',
                    href: null,
                    color: 'text-red-400',
                    hoverBg: 'hover:bg-red-500/5',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl ${item.hoverBg} transition-colors duration-200 group cursor-default`}
                  >
                    <div className={`w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 ${item.color} group-hover:scale-105 transition-transform duration-200`}>
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-xs text-white/70 hover:text-white/90 transition-colors truncate block"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-xs text-white/70 truncate">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5">
                <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                  Find Me Online
                </h3>
              </div>

              <div className="p-2 grid grid-cols-2 gap-1.5">
                {[
                  {
                    icon: <FaGithub size={16} />,
                    label: 'GitHub',
                    href: 'https://github.com/SjxSubham',
                    color: 'hover:text-white hover:bg-white/5',
                    tag: '@SjxSubham',
                  },
                  {
                    icon: <FaLinkedin size={16} />,
                    label: 'LinkedIn',
                    href: 'https://www.linkedin.com/in/subham-mondal-914b0b2b8',
                    color: 'hover:text-blue-400 hover:bg-blue-500/5',
                    tag: 'Connect',
                  },
                  {
                    icon: <FaTwitter size={16} />,
                    label: 'Twitter/X',
                    href: 'https://x.com/SjxSubham4249',
                    color: 'hover:text-sky-400 hover:bg-sky-500/5',
                    tag: '@SjxSubham',
                  },
                  {
                    icon: <SiLeetcode size={15} />,
                    label: 'LeetCode',
                    href: 'https://leetcode.com/u/Sjx_Subham/',
                    color: 'hover:text-amber-400 hover:bg-amber-500/5',
                    tag: 'Sjx_Subham',
                  },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-white/40 ${item.color} transition-all duration-200 group`}
                  >
                    <span className="group-hover:scale-110 transition-transform duration-200">
                      {item.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium leading-tight">{item.label}</p>
                      <p className="text-[9px] text-white/20 group-hover:text-white/30 truncate transition-colors">
                        {item.tag}
                      </p>
                    </div>
                    <ExternalLink size={9} className="ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-green-500/5 border border-green-500/10 rounded-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-green-400/70 text-[11px] font-medium">
                Open for new opportunities
              </span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden"
            >
              {/* Form header */}
              <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare size={12} />
                  Send a Message
                </h3>
                {status === 'success' && (
                  <span className="flex items-center gap-1 text-[10px] text-green-400 animate-fadeIn">
                    <Check size={10} />
                    Sent!
                  </span>
                )}
              </div>

              <div className="p-5 space-y-4">
                {/* Status Messages */}
                {status === 'success' && (
                  <div className="flex items-start gap-3 p-4 bg-green-500/8 border border-green-500/15 rounded-xl animate-slideIn">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500/15 shrink-0">
                      <Check size={14} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-green-400 text-sm font-medium">Message sent successfully!</p>
                      <p className="text-green-400/50 text-xs mt-0.5">
                        Thank you for reaching out. I'll get back to you as soon as possible.
                      </p>
                    </div>
                  </div>
                )}

                {status === 'error' && errorMsg && (
                  <div className="flex items-start gap-3 p-4 bg-red-500/8 border border-red-500/15 rounded-xl animate-slideIn">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/15 shrink-0">
                      <AlertCircle size={14} className="text-red-400" />
                    </div>
                    <div>
                      <p className="text-red-400 text-sm font-medium">Something went wrong</p>
                      <p className="text-red-400/50 text-xs mt-0.5">{errorMsg}</p>
                    </div>
                  </div>
                )}

                {/* Name field */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] text-white/40 font-medium mb-1.5 ml-1">
                    <User size={10} />
                    Your Name <span className="text-red-400/60">*</span>
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('from_name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="John Doe"
                    className={inputClasses('from_name')}
                    required
                    disabled={status === 'sending'}
                  />
                </div>

                {/* Email field */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] text-white/40 font-medium mb-1.5 ml-1">
                    <Mail size={10} />
                    Your Email <span className="text-red-400/60">*</span>
                  </label>
                  <input
                    type="email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('from_email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="john@example.com"
                    className={inputClasses('from_email')}
                    required
                    disabled={status === 'sending'}
                  />
                </div>

                {/* Subject field */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] text-white/40 font-medium mb-1.5 ml-1">
                    <FileText size={10} />
                    Subject <span className="text-red-400/60">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Project Collaboration / Job Opportunity / Just saying hi!"
                    className={inputClasses('subject')}
                    required
                    disabled={status === 'sending'}
                  />
                </div>

                {/* Message field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5 ml-1">
                    <label className="flex items-center gap-1.5 text-[11px] text-white/40 font-medium">
                      <MessageSquare size={10} />
                      Message <span className="text-red-400/60">*</span>
                    </label>
                    <span className={`text-[10px] font-mono transition-colors ${
                      charCount > 1000 ? 'text-red-400/60' : charCount > 0 ? 'text-white/20' : 'text-transparent'
                    }`}>
                      {charCount}/1000
                    </span>
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Tell me about your project, idea, or just say hello..."
                    rows={5}
                    maxLength={1000}
                    className={`${inputClasses('message')} resize-none`}
                    required
                    disabled={status === 'sending'}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className={`w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    status === 'sending'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 cursor-not-allowed'
                      : status === 'success'
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30 cursor-default'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-500/15 hover:shadow-purple-500/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-purple-500/10'
                  }`}
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending Message...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <Check size={16} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </button>

                {/* Powered by note */}
                <p className="text-center text-[10px] text-white/15">
                  Powered by EmailJS — Your message goes directly to my inbox
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.06);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.12);
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ContactApp;
