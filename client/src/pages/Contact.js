import React from 'react'
import { useForm, ValidationError } from '@formspree/react';
import './CSS/contact.css'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Contact() {
  const [state, handleSubmit] = useForm("xwkzlwgn");
  if (state.succeeded) {
      return <h2 className='formThankYou'>Thank You for your submission!</h2>;
  }

return (
  <div className='contactHeader'>
      <div className='contactHeaderDiv'>
        <h1>Have something to say?</h1>
      </div>
      <div className='formDiv'>
        <form className='form' onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input className='formInput' id="email" type="email" name="email" placeholder='Email Address' />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <label htmlFor="message">Message</label>
          <textarea className='textArea' id="message" name="message" placeholder='Give your feedback!' />
          <ValidationError prefix="Message" field="message" errors={state.errors} />
          <button type="submit" disabled={state.submitting} className='formButton'>
          <FontAwesomeIcon icon={faPaperPlane} /> Submit</button>
        </form>
      </div>
  </div>
)}
