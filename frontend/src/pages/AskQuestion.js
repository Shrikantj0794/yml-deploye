import React from 'react'
import { useState } from 'react';
import emailjs from 'emailjs-com';


const AskQuestion = () => {
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
    
        const serviceID = 'YOUR_SERVICE_ID';
        const templateID = 'YOUR_TEMPLATE_ID';
        const userID = 'YOUR_USER_ID';
    
        emailjs.send(serviceID, templateID, formData, userID)
          .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert("Your message has been sent successfully!");
            setFormData({ name: '', email: '', message: '' }); // Clear form after submission
          })
          .catch((error) => {
            console.log('FAILED...', error);
            alert("Failed to send the message, please try again.");
          });
      };
  return (
    <div>
    <section class="text-gray-600 body-font relative">
<div class="container px-5 py-24 mx-auto">
  <div class="flex flex-col text-center w-full mb-12">
    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Ask Question</h1>
    <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Feel free to ask question.</p>
  </div>
  <form onSubmit={handleSubmit} className="lg:w-1/2 md:w-2/3 mx-auto">
    <div className="flex flex-wrap -m-2">
      <div className="p-2 w-1/2">
        <div className="relative">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            required
          />
        </div>
      </div>
      <div className="p-2 w-1/2">
        <div className="relative">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            required
          />
        </div>
      </div>
      <div className="p-2 w-full">
        <div className="relative">
          <label htmlFor="message" className="leading-7 text-sm text-gray-600">Question</label>
          <textarea
            id="message"
            name="question"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            required
          ></textarea>
        </div>
      </div>
      <div className="p-2 w-full">
        <button
          type="submit"
          className="flex mx-auto text-white bg-sky-600 border-0 py-2 px-8 focus:outline-none hover:bg-sky-700 rounded-full text-lg"
        >
          Send
        </button>
      </div>
    </div>
  </form>
 
</div>
</section>
  </div>
  )
}

export default AskQuestion
