import './style.css'


// set API endpoint
const API_URL = 'http://localhost:3000/items';

// Get DOM elements
const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const nameInput = document.getElementById('name');

// STEP: Get/Read from API 
async function fetchItems() {
  try {
    const res = await fetch(API_URL); // Use fetch to GET from API
    const items = await res.json();   // Convert response to JSON
    renderItems(items);               // Pass data to render function
  } catch (err) {
    console.error('Error fetching items:', err);
  }
}


// Display items on the page
function renderItems(items) {
  itemList.innerHTML = ''; // Clear the list first
  console.log('Rendering items:', items); 
 
  items.forEach(item => {
    const li = document.createElement('li');  // Create <li>
    li.textContent = item.name; // Set item text
 
// Create a Delete Button (Delete)
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => deleteItem(item.id); // On click, call delete

    li.appendChild(deleteBtn);  // Add button to <li>
    itemList.appendChild(li);   // Add <li> to the list
  });
}

// Create item using form (Create)
itemForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent page reload
  const name = nameInput.value.trim(); // Get input value

  if (!name) return; // Don't submit empty values
  try {
    const res = await fetch(API_URL, {
      method: 'POST', // POST to API
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name }) // Send name in request body
    });
       if (res.ok) {
      nameInput.value = ''; // Clear input
      fetchItems();         // Refresh list
    }
  } catch (err) {
    console.error('Error adding item:', err);
  }
});  


// Delete item from API (Delete)
async function deleteItem(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      fetchItems(); // Refresh list after deleting
    }
  } catch (err) {
    console.error('Error deleting item:', err);
  }
}

// Load all items when the page loads
fetchItems();