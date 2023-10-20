in order to make a request to the backend
follow the steps

### If Cloning this repository

`npm i`

`nodemon app.js`

now start making request as follows

```javascript
import axios from "axios";

const baseUrl = "http://localhost:8080/api/auth"; // Set the base URL

const token = "your-auth-token";

// Replace with actual data for the request body
const requestBody = {
    // Replace with the request body data for the specific endpoint
};

axios.post(`${baseUrl}/setKycVerified`, requestBody, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

axios.post(`${baseUrl}/acceptContract`, requestBody, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

axios.post(`${baseUrl}/confirmContract`, requestBody, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

axios.post(`${baseUrl}/endTalks`, requestBody, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

axios.post(`${baseUrl}/finalizeContract`, requestBody, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

axios.post(`${baseUrl}/getContract`, requestBody, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

axios.post(`${baseUrl}/proceedWithContract`, requestBody, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

axios.post(`${baseUrl}/contractor/login`, requestBody);

axios.post(`${baseUrl}/contractor/signup`, requestBody);

axios.post(`${baseUrl}/client/login`, requestBody);

axios.post(`${baseUrl}/client/signup`, requestBody);
```

## If using deployed app

then use the follwing baseURL

```javascript
const baseUrl = "http://localhost:8080/api/auth"; // Set the base URL
```
