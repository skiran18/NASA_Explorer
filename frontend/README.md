

NASA Explorer Frontend

This is a react application that provides NASA-related data through various API endpoints. The application is deployed on Render and can be accessed via https://nasa-explorer-fe.onrender.com/

## Features

  * Astronomy Picture of the Day (APOD)
    Fetches NASA's Astronomy Picture of the Day.

  * Mars Rover Photos
    Retrieves images from NASA's Mars Rover API.

  * Near-Earth Objects (NEO)
    Provides information about asteroids and near-earth objects from NASA's database.



## To run the application locally:

  To get start with application, shown below:
```bash
git clone https://github.com/skiran18/NASA_Explorer.git
```

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run start
```


## Environment variable:

Create a file ".env" and add following variable,

```REACT_APP_API_BASE_URL="<backend-service-base-URL>/api"```