const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    default: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  phone: {
    type: String,
    required: true,
    default: "+91 11 25652140"
  },
  email: {
    type: String,
    required: true,
    default: "aaiasupport@gmail.com"
  },
  socialLinks: {
    youtube: {
      type: String,
      required: false,
      default: "https://www.youtube.com"
    },
    instagram: {
      type: String,
      required: false,
      default: "https://www.instagram.com"
    },
    facebook: {
      type: String,
      required: false,
      default: "https://www.facebook.com"
    },
    twitter: {
      type: String,
      required: false,
      default: "https://www.twitter.com"
    }
  }
},{ collection: "Contact" });

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
