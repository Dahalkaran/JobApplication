const Reminder = require('../models/Reminder');

exports.createReminder = async (req, res) => {
  const { jobId, reminderDate } = req.body;

  try {
    const reminder = await Reminder.create({ userId: req.user.id, jobId, reminderDate });
    res.status(201).json({ message: 'Reminder set successfully', reminder });
  } catch (error) {
    res.status(500).json({ error: 'Error setting reminder' });
  }
};
