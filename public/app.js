document.addEventListener('DOMContentLoaded', () => {
  const recordForm = document.getElementById('recordForm');
  const recordsTable = document.getElementById('recordsTable');

  recordForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;

      try {
          const response = await fetch('/create', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ title, description }),
          });

          if (response.ok) {
              loadRecords();
              recordForm.reset();
          } else {
              console.error('Failed to add record:', response.statusText);
          }
      } catch (error) {
          console.error('Fetch Error:', error);
      }
  });

  async function loadRecords() {
      try {
          const response = await fetch('/read');
          if (!response.ok) {
              throw new Error(`Failed to fetch records: ${response.statusText}`);
          }

          const records = await response.json();
          const tbody = recordsTable.querySelector('tbody');
          tbody.innerHTML = '';

          records.forEach((record) => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${record.id}</td>
                  <td>${record.title}</td>
                  <td>${record.description}</td>
                  <td><button onclick="updateRecord(${record.id})">Update</button></td>
                  <td><button onclick="deleteRecord(${record.id})">Delete</button></td>
              `;
              tbody.appendChild(row);
          });
      } catch (error) {
          console.error('Error loading records:', error);
      }
  }

  window.updateRecord = async function (id) {
      const title = prompt('Enter new title:');
      const description = prompt('Enter new description:');

      try {
          const response = await fetch(`/update/${id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ title, description }),
          });

          if (response.ok) {
              loadRecords();
          } else {
              console.error('Failed to update record:', response.statusText);
          }
      } catch (error) {
          console.error('Fetch Error:', error);
      }
  };

  window.deleteRecord = async function (id) {
      try {
          const response = await fetch(`/delete/${id}`, {
              method: 'DELETE',
          });

          if (response.ok) {
              loadRecords();
          } else {
              console.error('Failed to delete record:', response.statusText);
          }
      } catch (error) {
          console.error('Fetch Error:', error);
      }
  };

  loadRecords();
});
