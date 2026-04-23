import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Globe, MessageSquare, Code } from 'lucide-react';
import toast from 'react-hot-toast';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message summoned successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="contact-page container">
      <div className="contact-layout">
        <div className="contact-left">
          <header className="contact-header">
            <h1 className="contact-title">GET IN <br /> TOUCH</h1>
            <p className="page-subtitle">GOT A QUESTION ABOUT AN ORDER? WE'RE HERE TO HELP.</p>
          </header>

          <div className="contact-info">
            <div className="info-item">
              <h4>OUR ADDRESS</h4>
              <p>SECTOR 28, NOIDA, UP <br /> INDIA - 201301</p>
            </div>
            <div className="info-item">
              <h4>EMAIL US</h4>
              <p>SUPPORT@ANIPOSTER.IN</p>
            </div>
            <div className="info-item">
              <h4>FOLLOW US</h4>
              <div className="flex" style={{ gap: '20px', marginTop: '10px' }}>
                <Globe size={24} />
                <MessageSquare size={24} />
                <Code size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <div className="contact-form-container">
            <h3>SEND A MESSAGE</h3>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">YOUR NAME</label>
                <div className="input-wrapper">
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="TANJIRO KAMADO" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">EMAIL ADDRESS</label>
                <div className="input-wrapper">
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="TANJIRO@DEMONSLAYER.COM" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">YOUR MESSAGE</label>
                <textarea 
                  id="message" 
                  placeholder="WHAT'S ON YOUR MIND?" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary submit-btn">
                SEND MESSAGE <Send size={18} style={{ marginLeft: '10px' }} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
