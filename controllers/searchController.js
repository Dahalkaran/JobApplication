const  JobApplication  = require('../models/JobApplication');
const { Op } = require('sequelize');

exports.searchApplications = async (req, res) => {
  const { keyword, status, dateFrom, dateTo } = req.query;

  try {
    const whereClause = { userId: req.user.id };

    if (keyword) {
      whereClause[Op.or] = [
        { companyName: { [Op.like]: `%${keyword}%` } },
        { jobTitle: { [Op.like]: `%${keyword}%` } },
      ];
    }

    if (status) whereClause.status = status;
    if (dateFrom && dateTo) whereClause.applicationDate = { [Op.between]: [dateFrom, dateTo] };

    const results = await JobApplication.findAll({ where: whereClause });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error searching applications' });
  }
};
