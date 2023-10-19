const DB_URI = "y"; 
const API = 
  process.env.NODE_ENV === "production" 
    ? "https://xxx.vercel.com/api" 
    : "http://localhost:3000/api"; 
//const API = "http://localhost:3000/api"; 
const NEXTAUTH_SECRET = "YOUR_dsafdsa"; 
const GOOGLE_CLIENT_ID = ""; 
const GOOGLE_CLIENT_SECRET = ""; 
const CLOUDINARY_UPLOAD_PRESET = ""; 
const CLOUDINARY_URL = ""; 
 
module.exports = { 
  DB_URI, 
  API, 
  NEXTAUTH_SECRET, 
  GOOGLE_CLIENT_ID, 
  GOOGLE_CLIENT_SECRET, 
  CLOUDINARY_UPLOAD_PRESET, 
  CLOUDINARY_URL, 
}; 
 
