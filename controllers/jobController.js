const  JobApplication  = require('../models/JobApplication'); // Adjust import path if needed
const { uploadToS3 } = require('../servises/s3servises');

exports.createJobApplication = async (req, res) => {
  try {
    const { userId, companyName, jobTitle, applicationDate, status, notes } = req.body;

    // Validate required fields
    if (!userId || !companyName || !jobTitle || !applicationDate) {
      return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    let attachmentUrl = null;

    // Upload file to S3 if it exists
    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;
      attachmentUrl = await uploadToS3(req.file.buffer, fileName);
    }

    // Create a new job application record
    const jobApplication = await JobApplication.create({
      userId,
      companyName,
      jobTitle,
      applicationDate,
      status,
      notes,
      attachment: attachmentUrl,
    });

    res.status(201).json(jobApplication);
  } catch (error) {
    console.error('Error creating job application:', error);
    res.status(500).json({ error: 'Failed to create job application.' });
  }
};


// Fetch all job applications for a user
exports.getJobApplications = async (req, res) => {
    try {
        const { userId } = req.params;

        const jobApplications = await JobApplication.findAll({
            where: { userId },
        });

        res.status(200).json(jobApplications);
    } catch (error) {
        console.error("Error fetching job applications:", error);
        res.status(500).json({ error: "Failed to fetch job applications." });
    }
};

// Update a job application
exports.updateJobApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const jobApplication = await JobApplication.findByPk(id);

        if (!jobApplication) {
            return res.status(404).json({ error: "Job application not found." });
        }

        await jobApplication.update(updates);
        res.status(200).json(jobApplication);
    } catch (error) {
        console.error("Error updating job application:", error);
        res.status(500).json({ error: "Failed to update job application." });
    }
};

// Delete a job application
exports.deleteJobApplication = async (req, res) => {
    try {
        const { id } = req.params;

        const jobApplication = await JobApplication.findByPk(id);

        if (!jobApplication) {
            return res.status(404).json({ error: "Job application not found." });
        }

        await jobApplication.destroy();
        res.status(200).json({ message: "Job application deleted successfully." });
    } catch (error) {
        console.error("Error deleting job application:", error);
        res.status(500).json({ error: "Failed to delete job application." });
    }
};
