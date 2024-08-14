**Requirements:**
- Install MongoDB Compass
- Install Postman API

**Mistakes Corrected:**

1. The backend server no longer crashes after applying multiple queries on the login page.

2. I used a single API for closed projects, closure-delayed projects, canceled projects, and total projects, and displayed them on the dashboard.

3. I updated only the status value and stored it in the database on the Project List page.

4. I commented out `<React.StrictMode>` in `index.js` to prevent the single API from appearing multiple times in the network tab.

5. I aligned my UI with the requirements mentioned in the assessment.