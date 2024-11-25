import React from 'react';
import './Contact.css';

const Contact: React.FC = () => {
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <form className="contact-form">
                <input type="text" placeholder="Your Name" className="form-input" />
                <input type="email" placeholder="Your Email" className="form-input" />
                <textarea placeholder="Your Message" className="form-textarea"></textarea>
                <button type="submit" className="form-button">Send Message</button>
            </form>
        </div>
    );
};

export default Contact;
