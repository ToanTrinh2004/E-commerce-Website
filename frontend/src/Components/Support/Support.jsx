import React, { useState } from 'react';
import './Support.css';

const Support = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send the data to the server)
        console.log('Form data submitted:', formData);
        alert('Your message has been sent!');
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <div className='support'>
        <div className="support-container">
            <h2>Contact Support</h2>
            <form className="support-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="message">Message</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>

                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
    );
};

export default Support;
