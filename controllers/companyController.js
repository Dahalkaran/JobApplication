const  Company = require('../models/Company');

exports.createCompany = async (req, res) => {
  const { name, contactDetails, industry, notes } = req.body;
  console.log('Request Body:', req.body);  // Log the request body for debugging

  try {
    const company = await Company.create({
      userId: req.user.id,
      name,
      contactDetails,
      industry,
      notes,
    });

    res.status(201).json({ message: 'Company information saved successfully', company });
  } catch (error) {
    console.error('Error saving company:', error);
    res.status(500).json({ error: 'Error saving company information' });
  }
};

exports.getCompanyList = async (req, res) => {
  try {
    const companies = await Company.findAll({
      attributes: ['id', 'name', 'contactDetails', 'industry', 'notes'],
    });
    res.status(200).json(companies);
  } catch (error) {
    console.error('Error fetching company list:', error);
    res.status(500).json({ error: 'Failed to fetch company list.' });
  }
};

exports.updateCompany=async (req, res) => {
  try {
    console.log('Request Body:', req.body)
    const { id } = req.params;
    const { name, contactDetails, industry, notes } = req.body;
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(401).json({ message: 'Company not found' });
    } 
    company.name = name;
    company.contactDetails = contactDetails;
    company.industry = industry;
    company.notes = notes;
    await company.save();
    
    res.status(200).json(company);
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ message: 'Error updating company' });
  }
};
exports.deleteCompany=async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    await company.destroy();
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ message: 'Error deleting company' });
  }
};
exports.getCompanyById = async(req,res)=>{
  const companyId = req.params.id;  // Get the company ID from the URL parameter
 //console.log(companyId);
  try {
    // Find the company in the database
    const company = await Company.findByPk(companyId);
    console.log(company);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Send the company data as a response
    res.json(company);
  } catch (error) {
    console.error('Error fetching company details:', error);
    res.status(500).json({ message: 'Server error' });
  }

}