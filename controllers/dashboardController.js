const JobApplication  = require('../models/JobApplication');
const { Sequelize } = require('sequelize');

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const totalApplications = await JobApplication.count({ where: { userId } });
    const inProgress = await JobApplication.count({ where: { userId, status: 'In Progress' } });
    const interviews = await JobApplication.count({ where: { userId, status: 'Interview Scheduled' } });
    const offers = await JobApplication.count({ where: { userId, status: 'Offer Received' } });

    res.status(200).json({ totalApplications, inProgress, interviews, offers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};

exports.getApplicationTimeline = async (req, res) => {
  try {
    const userId = req.user.id;

    const timeline = await JobApplication.findAll({
      where: { userId },
      attributes: ['applicationDate', 'status', 'jobTitle', 'companyName'],
      order: [['applicationDate', 'ASC']],
    });

    res.status(200).json(timeline);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching application timeline' });
  }
};
exports.getApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await JobApplication.findAll({
      where: { userId },
      attributes: ['id', 'companyName', 'jobTitle', 'status', 'applicationDate'],
    });
    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};
exports.getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const application = await JobApplication.findOne({
      where: { id, userId },
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.status(200).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch application details' });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const application = await JobApplication.destroy({
      where: { id, userId },
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete application' });
  }
};
exports.getChartData = async (req, res) => {
  try {
    const userId = req.user.id;
    const statuses = ['Applied', 'In Progress', 'Interviewed', 'Offered', 'Rejected'];
    const statusCounts = await Promise.all(
      statuses.map((status) =>
        JobApplication.count({ where: { userId, status } })
      )
    );

    res.status(200).json({ statuses, statusCounts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch chart data' });
  }
};

