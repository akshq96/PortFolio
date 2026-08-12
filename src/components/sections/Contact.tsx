import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Send, Download, CheckCircle } from 'lucide-react';

const SOCIALS = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/akshitraj', value: '@akshitraj' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/akshitraj', value: 'akshitraj' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/akshitraj', value: '@akshitraj' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@akshitraj.com', value: 'hello@akshitraj.com' },
];

type SendState = 'idle' | 'sending' | 'sent';

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);
  const [sendState, setSendState] = useState<SendState>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSendState('sending');
    setTimeout(() => {
      setSendState('sent');
      setTimeout(() => {
        setSendState('idle');
        setForm({ name: '', email: '', message: '' });
      }, 3000);
    }, 1800);
  };

  const inputClass = (field: string) =>
    `w-full bg-transparent border-b py-3 text-white placeholder-white/20 font-mono text-sm outline-none transition-all duration-300 ${
      focused === field
        ? 'border-primary text-white'
        : 'border-white/10 hover:border-white/20'
    }`;

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-[400px]"
          style={{ background: 'linear-gradient(to top, rgba(59,130,246,0.04), transparent)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">Contact</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Open a Channel
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Have a project in mind? Building something interesting? Let's talk.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Transmission Ready</span>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="relative">
                  <label className={`absolute -top-5 left-0 text-[10px] font-mono uppercase tracking-widest transition-colors duration-300 ${focused === 'name' ? 'text-primary' : 'text-white/30'}`}>
                    Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    placeholder="Your name"
                    className={inputClass('name')}
                    disabled={sendState !== 'idle'}
                  />
                  {focused === 'name' && (
                    <motion.div className="absolute bottom-0 left-0 h-px bg-primary"
                      initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.4 }} />
                  )}
                </div>

                <div className="relative">
                  <label className={`absolute -top-5 left-0 text-[10px] font-mono uppercase tracking-widest transition-colors duration-300 ${focused === 'email' ? 'text-primary' : 'text-white/30'}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    placeholder="you@company.com"
                    className={inputClass('email')}
                    disabled={sendState !== 'idle'}
                  />
                  {focused === 'email' && (
                    <motion.div className="absolute bottom-0 left-0 h-px bg-primary"
                      initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.4 }} />
                  )}
                </div>

                <div className="relative">
                  <label className={`absolute -top-5 left-0 text-[10px] font-mono uppercase tracking-widest transition-colors duration-300 ${focused === 'message' ? 'text-primary' : 'text-white/30'}`}>
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell me about the problem you're trying to solve..."
                    rows={4}
                    className={`${inputClass('message')} resize-none`}
                    disabled={sendState !== 'idle'}
                  />
                  {focused === 'message' && (
                    <motion.div className="absolute bottom-0 left-0 h-px bg-primary"
                      initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.4 }} />
                  )}
                </div>

                {/* Send button */}
                <motion.button
                  type="submit"
                  disabled={sendState !== 'idle'}
                  className="relative w-full py-4 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-300 disabled:cursor-not-allowed"
                  style={{ background: sendState === 'sent' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
                  whileHover={sendState === 'idle' ? { scale: 1.01 } : {}}
                  whileTap={sendState === 'idle' ? { scale: 0.99 } : {}}
                >
                  <AnimatePresence mode="wait">
                    {sendState === 'idle' && (
                      <motion.span key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2 text-white">
                        <Send className="w-4 h-4" /> Transmit Message
                      </motion.span>
                    )}
                    {sendState === 'sending' && (
                      <motion.span key="sending" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2 text-white">
                        <motion.div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                        Transmitting...
                      </motion.span>
                    )}
                    {sendState === 'sent' && (
                      <motion.span key="sent" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2 text-white">
                        <CheckCircle className="w-4 h-4" /> Message Received!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right: links + info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8 pt-4"
          >
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-5">Direct Lines</h3>
              <div className="flex flex-col gap-4">
                {SOCIALS.map(({ icon: Icon, label, href, value }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-4 p-4 rounded-xl glass border border-white/5 hover:border-primary/20 transition-all duration-300 hover:scale-[1.01]"
                  >
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/10 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-mono text-white/30 uppercase tracking-widest">{label}</div>
                      <div className="text-sm text-white/70 group-hover:text-white font-mono transition-colors duration-300 truncate">{value}</div>
                    </div>
                    <span className="text-white/20 group-hover:text-primary transition-colors duration-300 text-lg leading-none">↗</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Download className="w-4 h-4 text-white/40" />
                <span className="text-xs font-mono uppercase tracking-widest text-white/40">Resume</span>
              </div>
              <p className="text-sm text-white/50 mb-4">Full work history, projects, and references. PDF format.</p>
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/10 text-sm text-white/70 hover:text-white hover:border-primary/30 transition-all duration-300"
              >
                <Download className="w-4 h-4" /> Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
