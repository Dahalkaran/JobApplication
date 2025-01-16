document.addEventListener('DOMContentLoaded', () => {
  loadDashboardData();

  const addApplicationModal = document.getElementById('addApplicationModal');
  const addCompanyForm = document.getElementById('addCompanyForm');

  // Open "Add Job Application" modal
  document.getElementById('openAddApplicationForm').addEventListener('click', () => {
    addApplicationModal.style.display = 'block';
  });

  // Close "Add Job Application" modal
  document.getElementById('closeAddApplicationModal').addEventListener('click', () => {
    addApplicationModal.style.display = 'none';
  });

  // Open "Add Company" form
  document.getElementById('openAddCompanyForm').addEventListener('click', () => {
    addCompanyForm.style.display = 'block';
  });

  // Close "Add Company" form
  document.getElementById('cancelCompanyForm').addEventListener('click', () => {
    addCompanyForm.style.display = 'none';
  });

  async function loadDashboardData() {
    try {
      const token = localStorage.getItem('token');

      // Fetch and display overview data
      const overviewResponse = await axios.get('/dashboard/overview', {
        headers: { Authorization: `Bearer ${token}` },
      });
      displayOverview(overviewResponse.data);

      // Fetch and display applications
      const applicationsResponse = await axios.get('/dashboard/applications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      displayApplications(applicationsResponse.data);

      // Fetch and render chart data
      const chartResponse = await axios.get('/dashboard/chart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      renderChart(chartResponse.data);

      // Fetch and populate company dropdown
      const companyResponse = await axios.get('/companies/list', {
        headers: { Authorization: `Bearer ${token}` },
      });
      displayCompanies(companyResponse.data);
      populateCompanyDropdown(companyResponse.data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      alert('Failed to load dashboard data. Please try again later.');
    }
  }

  function displayOverview(data) {
    const overviewElement = document.getElementById('overview');
    overviewElement.innerHTML = `
      <p>Total Applications: ${data.totalApplications}</p>
      <p>Applications in Progress: ${data.inProgress}</p>
      <p>Interviews Scheduled: ${data.interviews}</p>
      <p>Offers Received: ${data.offers}</p>
    `;
  }

  function displayApplications(data) {
    const tableBody = document.getElementById('applicationsTable');
    tableBody.innerHTML = '';
    data.forEach(application => {
      const row = `
        <tr>
          <td>${application.companyName}</td>
          <td>${application.jobTitle}</td>
          <td>${application.status}</td>
          <td>${new Date(application.applicationDate).toLocaleDateString()}</td>
          <td>
            <button onclick="viewDetails('${application.id}')">View</button>
            <button onclick="deleteApplication('${application.id}')">Delete</button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  }

  function renderChart(data) {
    const ctx = document.getElementById('statusChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Applied', 'In Progress', 'Interviewed', 'Offered', 'Rejected'],
        datasets: [{
          data: data.statusCounts,
          backgroundColor: ['#3498db', '#f1c40f', '#2ecc71', '#e74c3c', '#9b59b6'],
        }],
      },
    });
  }

  function populateCompanyDropdown(companies) {
    const dropdown = document.getElementById('companySelect');
    dropdown.innerHTML = '';
    companies.forEach(company => {
      const option = document.createElement('option');
      option.value = company.id;
      option.textContent = company.name;
      dropdown.appendChild(option);
    });
  }

  // Event listener for Add Application
  document.getElementById('addApplicationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('companyId', document.getElementById('companySelect').value);
    formData.append('jobTitle', document.getElementById('jobTitle').value);
    formData.append('applicationDate', document.getElementById('applicationDate').value);
    formData.append('status', document.getElementById('status').value);
    formData.append('notes', document.getElementById('notes').value);
    formData.append('attachment', document.getElementById('attachment').files[0]);
  
    const token = localStorage.getItem('token');
  
    try {
      await axios.post('/jobs/create', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      alert('Job application added successfully!');
      location.reload();
    } catch (error) {
      console.error('Error adding job application:', error);
      alert('Failed to add job application.');
    }
  });
  
  document.getElementById('closeAddApplicationModal').addEventListener('click', () => {
    document.getElementById('addApplicationModal').style.display = 'none';
  });
  

  // Event listener for Add Company
  document.getElementById('companyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
      name: document.getElementById('name').value,
      contactDetails: document.getElementById('contactDetails').value,
      industry: document.getElementById('industry').value,
      notes: document.getElementById('notes').value,
    }
    console.log('Form Data:', formData);
    const token = localStorage.getItem('token');

    try {
      await axios.post('/companies/create', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Company added successfully!');
      location.reload();
    } catch (error) {
      console.error('Error adding company:', error);
      alert('Failed to add company.');
    }
  });
});

// Function to view application details
async function viewDetails(id) {
  try {
    const response = await axios.get(`/applications/${id}`);
    alert(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error fetching application details:', error);
  }
}

// Function to delete an application
async function deleteApplication(id) {
  if (confirm('Are you sure you want to delete this application?')) {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Application deleted successfully!');
      location.reload();
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  }
}

function displayCompanies(data) {
  const tableBody = document.getElementById('companiesTable');
  tableBody.innerHTML = '';
  data.forEach(company => {
    const row = `
      <tr>
        <td>${company.name}</td>
        <td>${company.contactDetails}</td>
        <td>${company.industry}</td>
        <td>${company.notes}</td>
        <td>
          <button onclick="openEditCompanyModal('${company.id}')">Update</button>
          <button onclick="deleteCompany('${company.id}')">Delete</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

function openEditCompanyModal(companyId) {
  // Fetch the company details by ID
  const token = localStorage.getItem('token');
  axios.get(`/companies/${companyId}` ,{
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(response => {
      const company = response.data;
      console.log(company)
      document.getElementById('addCompanyModal').style.display = 'block';
      // Reset form fields first before populating
      document.getElementById('name').value = '';
      document.getElementById('contactDetails').value = '';
      document.getElementById('industry').value = '';
      document.getElementById('notes').value = '';
      
      // Populate the form fields with the company data
      document.getElementById('name').value = company.name;
      document.getElementById('contactDetails').value = company.contactDetails;
      document.getElementById('industry').value = company.industry;
      document.getElementById('notes').value = company.notes;
      
      // Change the form to show as edit mode
      const companyForm = document.getElementById('companyForm');
      companyForm.onsubmit = function(e) {
        e.preventDefault();
        const updatedData = {
          name: document.getElementById('name').value,
          contactDetails: document.getElementById('contactDetails').value,
          industry: document.getElementById('industry').value,
          notes: document.getElementById('notes').value,
        };
        updateCompany(companyId, updatedData);
      };
      
      // Open the modal for editing
    })
    .catch(error => {
      console.error('Error fetching company details:', error);
    });
}

async function updateCompany(companyId, data) {
  const token = localStorage.getItem('token');
  try {
    await axios.put(`/companies/${companyId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Company updated successfully!');
    location.reload(); // Refresh the dashboard to show updated data
  } catch (error) {
    console.error('Error updating company:', error);
    alert('Failed to update company.');
  }
}

document.getElementById('cancelCompanyForm').addEventListener('click', () => {
  document.getElementById('addCompanyModal').style.display = 'none';
});
