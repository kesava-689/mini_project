import React from 'react'
import './Contact.css'
import msg_icon from '../../assets/msg-icon.png'
import mail_icon from '../../assets/mail-icon.png'
import phone_icon from '../../assets/phone-icon.png'
import location_icon from '../../assets/location-icon.png'
import white_arrow from '../../assets/white-arrow.png'

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    // Step 1: Send email using Web3Forms
    formData.append("access_key", "2d50e040-6ae9-4f85-b7dd-7dadcce03dd7");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");

      // Step 2: Save to backend database (Node.js + MongoDB)
      await fetch("http://localhost:5000/api/contacts/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          message: formData.get("message")
        })
      });

      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className='contact'>
      <div className='contact-col'>
        <h3>Send us a message.<img className="mail-icon" src={msg_icon} alt='' /></h3>
        <p>Have questions, suggestions, or want to join our mission to fight food wastage?
We would love to hear from you!
<br></br>
🌟 Whether you're a restaurant, NGO, volunteer, or a kind-hearted individual looking to make a difference, feel free to reach out.</p>
        <ul>
          <li><img src={mail_icon} alt='' />chennakesavulu689@gmail.com</li>
          <li><img src={phone_icon} alt='' />+91 6305732145 </li>
          <li><img src={location_icon} alt='' />RGUKT RKVALLEY</li>
        </ul>
      </div>
      <div className='contact-col'>
        <form onSubmit={onSubmit}>
          <label>Your Name</label>
          <input type='text' name='name' placeholder='Enter your name' required />
          <label>Phone Number</label>
          <input type='tel' name='phone' placeholder='Enter your phone number' required />
          <label>Write your message here</label>
          <textarea name='message' rows='6' placeholder='Enter Your Message' required></textarea>
          <button type='submit' className='btn dark-btn'>Send Message<img src={white_arrow} alt='' /></button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  )
}

export default Contact
