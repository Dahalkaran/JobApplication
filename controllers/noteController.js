const  JobApplication  = require('../models/JobApplication');

exports.addNote = async (req, res) => {
  const { jobId, note } = req.body;

  try {
    const jobApplication = await JobApplication.findOne({
      where: { id: jobId, userId: req.user.id },
    });

    if (!jobApplication) return res.status(404).json({ error: 'Job application not found' });

    jobApplication.notes = jobApplication.notes
      ? `${jobApplication.notes}\n${note}`
      : note;

    await jobApplication.save();
    res.status(200).json({ message: 'Note added successfully', jobApplication });
  } catch (error) {
    res.status(500).json({ error: 'Error adding note' });
  }
};

exports.getNotes = async (req, res) => {
  const { jobId } = req.params;

  try {
    const jobApplication = await JobApplication.findOne({
      where: { id: jobId, userId: req.user.id },
    });

    if (!jobApplication) return res.status(404).json({ error: 'Job application not found' });

    res.status(200).json({ notes: jobApplication.notes });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notes' });
  }
};
