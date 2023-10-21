in order to make a request to the backend
follow the steps

### If Cloning this repository

`npm i`

`nodemon app.js`

now start making request as follows

```javascript
import axios from "axios";

const baseUrlAuth = "http://localhost:8080/api/auth"; // Set the base URL
const baseUrlContract = "http://localhost:8080/api/contract"; // Set the base URL

const token = "your-auth-token";

// Replace with actual data for the request body
const requestBody = {
    // Replace with the request body data for the specific endpoint
};

axios.post(`${baseUrlContract}/setKycVerified`, requestBody, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

axios.post(`${baseUrlContract}/acceptContract`, requestBody, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

axios.post(`${baseUrlContract}/confirmContract`, requestBody, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

axios.post(`${baseUrlContract}/endTalks`, requestBody, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

axios.post(`${baseUrlContract}/finalizeContract`, requestBody, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

axios.post(`${baseUrlContract}/getContract`, requestBody, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

axios.post(`${baseUrlContract}/proceedWithContract`, requestBody, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

axios.post(`${baseUrlAuth}/contractor/login`, requestBody);

axios.post(`${baseUrlAuth}/contractor/signup`, requestBody);

axios.post(`${baseUrlAuth}/client/login`, requestBody);

axios.post(`${baseUrlAuth}/client/signup`, requestBody);
```

## If using deployed app

then use the follwing baseURL

```javascript
const baseUrlAuth = "https://back-end-ty14.vercel.app/auth";
const baseUrlContractor = "https://back-end-ty14.vercel.app/contractor";
K;
```
