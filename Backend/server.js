require('dotenv').config();

if (!process.env.GOOGLE_GEMINI_KEY) {
  console.error('Missing GOOGLE_GEMINI_KEY. Add your Gemini API key to Backend/.env.');
  process.exit(1);
}

const app = require('./src/app.js');
const port = Number(process.env.PORT) || 3000;



//to start the server
console.log("inside server.js");
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
