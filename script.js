// Initialize Contentful client
const client = contentful.createClient({
    space: 'i9frj73mtwoy', // Replace with your Contentful space ID
    accessToken: CONTENTFUL_ACCESS_TOKEN // Use the environment variable
  });
  // Function to fetch menu items from Contentful
  async function fetchMenuItems() {
    try {
      const response = await client.getEntries({
        content_type: 'menu' // Ensure this matches your content type ID in Contentful
      });
      const menuItems = response.items.map(item => ({
        name: item.fields.name,
        description: item.fields.description,
        details: item.fields.details,
        category: item.fields.category
      }));
      console.log(menuItems);
      populateMenuItems(menuItems);
    } catch (error) {
      //console.error('Error fetching menu items:', error); // Log the error for debugging
    }
  }
  
  // Function to populate menu items on the webpage
  function populateMenuItems(menuItems) {
    const categories = ['Breakfast', 'Lunch', 'Dinner'];

    categories.forEach(category => {
        const menuSection = document.querySelector(`#${category.toLowerCase()} .list`);
        const beverageSection = document.querySelector(`#${category.toLowerCase()} .beverage-list`);

        const foodItems = menuItems.filter(item => item.category.includes(category) && !item.category.includes('Beverages'));
        const beverageItems = menuItems.filter(item => item.category.includes('Beverages'));

        // Check if food items are empty
        if (foodItems.length === 0) {
            menuSection.innerHTML = `
                <div style="text-align: center;">
                    <p>Our chefs are busy preparing ${category} options for you!</p>
                    <p>Please check back soon!</p>
                </div>
            `;
        } else {
            // Populate food items
            menuSection.innerHTML = foodItems.map(item => `
                <li>
                    <div>
                        <strong>${item.name}</strong>
                        <br>
                        <small>${item.description}</small>
                        <br>
                        <small style="color: gray;">${item.details}</small>
                    </div>
                </li>
            `).join('');
        }

        // Check if beverage items are empty
        if (beverageItems.length === 0) {
            beverageSection.innerHTML = `

                div style="text-align: center;">
                    <p>${category} is brewing! Our chefs are cooking up a storm, with yummy Beverages to match.</p>
                    <p>Coming soon!</p>
                </div>
            `;
        } else {
            // Populate beverage items
            beverageSection.innerHTML = beverageItems.map(item => `
                <li>
                    <div>
                        <strong>${item.name}</strong>
                        <br>
                        <small>${item.description}</small>
                        <br>
                        <small style="color: gray;">${item.details}</small>
                    </div>
                </li>
            `).join('');
        }
    });
  }
  
  // Call the function to fetch and populate menu items
  fetchMenuItems();
  
  // Function to switch between menu tabs
  function switchTab(event) {
    document.querySelectorAll('.btn-tabs').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.menu-section').forEach(section => section.classList.remove('active'));
  
    event.target.classList.add('active');
    const targetSection = document.querySelector(event.target.getAttribute('href'));
    targetSection.classList.add('active');
  
    event.preventDefault();
  }
  
  // Add event listeners to tab buttons
  document.querySelectorAll('.btn-tabs').forEach(tab => {
    tab.addEventListener('click', switchTab);
  });
  
  // Ordering functions
  function orderCall() {
    window.location.href = 'tel:+1234567890'; // Replace with your phone number
  }
  
  function orderWhatsApp() {
    let phoneNumber = 'yourphonenumber'; // Replace with your WhatsApp number
    window.open(`https://wa.me/${phoneNumber}?text=Hello, I would like to place an order.`);
  }
  
  function orderDoorDash() {
    window.open('https://www.doordash.com'); // Replace with your DoorDash link
  }
  
  function orderUberEats() {
    window.open('https://www.ubereats.com'); // Replace with your Uber Eats link
  }