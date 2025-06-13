// server.js (main file)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const marketplaceRoutes = require('./routes/marketplace');
const lostFoundRoutes = require('./routes/lostfound');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ DB Connection Error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/lostfound', lostFoundRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
require('dotenv').config();
console.log("DB URI:", process.env.MONGO_URI);  // 👈 add this line