const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;
const HOST = 'localhost';

// #3: TODO:
app.use(express.static(path.join(process.cwd(), 'public')));

app.get("/photos", (request, response) => {
  // #1 TODO:
  fetch('https://jsonplaceholder.typicode.com/photos')
  .then(res => res.json())
  .then(data => {
    console.log('Fetched first 20 photos');
    response.status(200).json(data.slice(0, 20));
  })
  .catch(error => {
    console.error('Error fetching photos:', error.message);
    response.status(500).json({ error: error.message });
  });
});

app.get("/photos/:id", (request, response) => {
  // #2 TODO:
  const photoId = request.params.id;
 
  fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
    .then(res => res.json())
    .then(data => {
      console.log(`Fetched photo with id: ${photoId}`);
      response.status(200).json(data);
    })
    .catch(error => {
      console.error('Error fetching photo by ID:', error.message);
      response.status(500).json({ error: error.message });
    });
});

// Handle 404 for unknown routes
app.use((request, response) => {
  response.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log('Working directory:', process.cwd());
  console.log(`Server running at http://${HOST}:${PORT}`);
});
