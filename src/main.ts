import { API_URL } from './constants'
import './style.css'


// STEP 1: Define your item type
type Item = {
  id: number
  name: string
}

// STEP 2: API endpoint

// STEP 3: Get and type DOM elements
const itemForm = document.getElementById('item-form') as HTMLFormElement
const itemList = document.getElementById('item-list') as HTMLUListElement
const nameInput = document.getElementById('name') as HTMLInputElement

// STEP 4: Fetch items from the server
async function fetchItems(): Promise<void> {
  try {
    const res = await fetch(API_URL)
    const items: Item[] = await res.json()
    renderItems(items)
  } catch (err) {
    console.error('Error fetching items:', err)
  }
}

// STEP 5: Render items in the DOM
function renderItems(items: Item[]): void {
  itemList.innerHTML = '' // Clear existing list

  items.forEach(item => {
    const li = document.createElement('li')
    li.textContent = item.name

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    deleteBtn.classList.add('delete-btn')
    deleteBtn.onclick = () => deleteItem(item.id)

    li.appendChild(deleteBtn)
    itemList.appendChild(li)
  })
}

// STEP 6: Handle form submission (create item)
itemForm.addEventListener('submit', async (e: Event) => {
  e.preventDefault()

  const name = nameInput.value.trim()
  if (!name) return

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })

    if (res.ok) {
      nameInput.value = ''
      fetchItems() // Refresh list
    }
  } catch (err) {
    console.error('Error adding item:', err)
  }
})


// STEP 8: Initial load
fetchItems()


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