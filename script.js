
const form = document.querySelector('#search-form');
const input = document.querySelector('#interest-keyword');
const tableBody = document.querySelector('#data-table tbody');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the value entered in the input field
  const searchName = input.value;

  // Fetch data from the API based on the search input
  fetch(`https://graph.facebook.com/search?type=adinterest&q=[${searchName}]&limit=10000&locale=en_US&access_token=EAASZCPzgFwIgBO7k5PAYTZBg2BwVCo0RouoXRumtUjRHV11o2NWTN6MBciWHHnvpte0U1fgmVMZCx2ILoL839e9Tmi5egTpVXBQkitTMRLRlrZCZAlBOWwsCiyqgZAad457BNZAnqD58SiMyzEweY1fUyR7TRmStk9xSXbBwdXMTFyfnzfhq4ZBMQkCVVdqS3xoZCz09tSjGGUZCYWZAkTKZCXcskZCsRS5K1XZAWNsjZA57ClWwyHyY5J9CCUYeIun5Kz6KKxtIYBy5mziRIsZD`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // The 'data' variable contains the parsed JSON data
      console.log('API Data:', data);

      // Call function to populate the table with the data
      populateTable(data);
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
});

function populateTable(data) {
  let tableHTML = '';
  console.log(data.data);
  // Loop through the data and create table rows with the data
  data.data.forEach(item => {
    tableHTML += `
    <tr class="border border-b-2">
              
    <td class="px-4 py-3">${item.name}</td>
    <td class="px-4 py-3">${item.audience_size_lower_bound} - ${item.audience_size_upper_bound}</td>
    <td class="w-10 text-center">
    ${item.topic}
    </td>
    <td class="px-4 py-3">${item.disambiguation_category}</td>
  </tr>
    `;
  });

  // Insert the generated table rows into the table body
  tableBody.innerHTML = tableHTML;
}
