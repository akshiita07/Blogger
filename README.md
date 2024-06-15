# Blogger

### Brief Overview:
Blogger is a web-based blogging platform that allows users to create, edit, and manage blog posts seamlessly. It features a simple and intuitive user interface, robust backend API, and efficient handling of CRUD (Create, Read, Update, Delete) operations. The project is built using modern technologies like Express.js, EJS templating, and Axios for HTTP requests, providing a solid foundation for further development and enhancements.

### Implementation Details:

#### 1. **Backend API (Port 4000):**
   - **Technologies:** Node.js, Express.js, Body-Parser
   - **Functionality:** Provides RESTful API endpoints for managing blog posts.
   - **Endpoints:**
     - `GET /blogPosts`: Fetches all blog posts.
     - `GET /blogPosts/:id`: Fetches a specific blog post by ID.
     - `POST /blogPosts`: Creates a new blog post.
     - `PATCH /blogPosts/:id`: Updates a specific blog post by ID.
     - `DELETE /blogPosts/:id`: Deletes a specific blog post by ID.
   - **Data Storage:** Uses an in-memory array (`blogPosts`) for storing blog data.
   
   **Sample Code:**
   ```javascript
   import express from 'express';
   import bodyParser from 'body-parser';

   const app = express();
   const port = 4000;

   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(bodyParser.json());

   let blogPosts = [
       { id: 1, title: "The Rise of Decentralized Finance", content: "DeFi content...", author: "Alex Thompson", date: new Date() },
       { id: 2, title: "The Impact of AI on Businesses", content: "AI content...", author: "Mia Williams", date: new Date() },
       { id: 3, title: "Sustainable Living Tips", content: "Sustainability content...", author: "Samuel Green", date: new Date() }
   ];

   // Endpoint handlers here...

   app.listen(port, () => {
       console.log(`API server is running on port ${port}`)
   });
   ```

#### 2. **Frontend Web Server (Port 3000):**
   - **Technologies:** Express.js, EJS (Embedded JavaScript templating), Axios
   - **Functionality:** Renders web pages and interacts with the backend API.
   - **Pages:**
     - **Home Page (`/`):** Lists all blog posts with options to view, edit, or delete each post.
     - **New Post Page (`/new`):** Form for creating a new blog post.
     - **Edit Post Page (`/edit/:id`):** Form for editing an existing blog post.

   **Sample Code:**
   ```javascript
   import express from 'express';
   import axios from 'axios';
   import bodyParser from 'body-parser';
   import ejs from 'ejs';

   const app = express();
   const port = 3000;
   const APIurl = 'http://localhost:4000/blogPosts';

   app.set('view engine', 'ejs');
   app.use(express.static('public'));
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(bodyParser.json());

   // Route handlers here...

   app.listen(port, () => {
       console.log(`Backend server is running on port ${port}`)
   });
   ```

#### 3. **Static Files (CSS) and Templating:**
   - **CSS:** Provides styling for the blog platform, ensuring a clean and responsive design.
   - **EJS Templates:** Used to dynamically render HTML content based on data fetched from the backend.

   **Sample CSS:**
   ```css
   body {
       background-color: whitesmoke;
       font-family: "Arial", sans-serif;
   }

   .container {
       display: flex;
       flex-direction: column;
       background-color: white;
       border-radius: 10px;
       margin: 40px 100px;
       padding: 20px;
       box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
   }

   /* Additional CSS rules... */
   ```

   **Sample EJS Template:**
   ```html
   <!-- index.ejs -->
   <div class="container">
       <h1>My Blog</h1>
       <a href="/new" class="new-post">New Post</a>
       <ul class="post-list">
           <% blogPosts.forEach(function(post) { %>
               <li>
                   <h2><%= post.title %></h2>
                   <small><%= post.date.toDateString() %></small>
                   <p><%= post.content %></p>
                   <small>By: <%= post.author %></small>
                   <a href="/edit/<%= post.id %>" class="edit-button">Edit</a>
                   <form action="/delete/<%= post.id %>" method="post">
                       <button type="submit" class="delete-button">Delete</button>
                   </form>
               </li>
           <% }); %>
       </ul>
   </div>
   ```

### Running the Project:
1. **Setup:**
   - Initialize the project and install dependencies:
     ```bash
     npm init
     npm install express ejs body-parser axios
     ```

2. **Starting the Servers:**
   - Start the API server (Port 4000):
     ```bash
     node apiServer.js
     ```
   - Start the web server (Port 3000):
     ```bash
     node webServer.js
     ```

3. **Accessing the Application:**
   - Open a web browser and navigate to `http://localhost:3000` to interact with blogger.

### Future Enhancements:
- **Persistent Database:** Implement a database like MongoDB for permanent data storage.
- **User Authentication:** Add user login and registration features for personalized experiences.
- **Rich Text Editor:** Integrate a WYSIWYG editor for better post creation and editing.
- **Search and Filter:** Enable search and filter functionalities to easily find and organize posts.

Blogger serves as a flexible and extendable platform for blogging, making it easy for users to manage content while providing a strong base for further development.
