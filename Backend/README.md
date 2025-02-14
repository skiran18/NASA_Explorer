NASA Explorer Backend

This is a Node.js and Express application that provides NASA-related data through various API endpoints. The application is deployed on Render and can be accessed via, Base URL: https://nasa-explorer-1-juom.onrender.com


## Features

  * Astronomy Picture of the Day (APOD)
    Endpoint: /api/apod
    Fetches NASA's Astronomy Picture of the Day.
    Example Request:GET https://nasa-explorer-1-juom.onrender.com/api/apod

  * Mars Rover Photos
    Endpoint: /api/mars
    Retrieves images from NASA's Mars Rover API.
    Example Request:GET https://nasa-explorer-1-juom.onrender.com/api/mars

  * Near-Earth Objects (NEO)
    Endpoint: /api/neo
    Provides information about asteroids and near-earth objects from NASA's database.
    Example Request:GET https://nasa-explorer-1-juom.onrender.com/api/neo



## To run the application locally:

  To get start with application, shown below:
```bash
git clone https://github.com/skiran18/NASA_Explorer.git
```

```bash
cd Backend
```

  Install dependencies:

```bash
npm install
```

  Environment variable: create a file named ".env" and add below variable with your own API key

```bash
NASA_API_KEY="<your-nasa-api-key>"
```

  Start the server:

```bash
npm start
```

  Service will be up at: http://localhost:3000


### Running Tests

To run the test suite, first install the dependencies:

```bash
npm install
```

Then run `npm test`, make sure to start backend services in order to test integration test file:

```bash
npm test
```
