const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/database');

// Route imports
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const companyRoutes = require('./routes/companyRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const searchRoutes = require('./routes/searchRoutes');
const noteRoutes = require('./routes/noteRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/reminders', reminderRoutes);
app.use('/companies', companyRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/search', searchRoutes);
app.use('/notes', noteRoutes);

// Database sync
sequelize
  .sync( {} )
  .then(() => console.log('Database connected and synced'))
  .catch((err) => console.log('Error syncing database:', err));

// Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
