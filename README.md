# UK Crime Visualiser

This a web app that allows users to visualise all the recent crimes commited in a certain area in the UK, (Not including Scotland or Northen Ireland), using the [Mapbox API](https://docs.mapbox.com/api/) and the [React Map GL](https://visgl.github.io/react-map-gl/).

---

This project also made use of the [UK Police DATA API](https://data.police.uk/docs/) which means that all the data coming back from this API is **UK ONLY** and does not include **SCOTLAND OR NORTHEN IRELAND**

---
License: [MIT](https://opensource.org/licenses/MIT)

## Future Plans

### Web App

I plan on making some minor inprovements to the web as it seems to be all mainly done. Some major issues that needs fixing are:

  1. Fix dropdown list not updating state on change
  2. Major lags issues especially on older machines or when there are more than 500 markers on the screen at once
  3. Some design improvements

### Mobile App

Once all the improvements have been made on the web app, I will start working on this app with [React Native](https://reactnative.dev/) so it can be developed for iOS and Andriod respectively.

---
## Prerequisites

You will need to create an `.env.local` file in the head of the directory. In the file put `REACT_APP_MAPBOX_TOKEN=` and add a Mapbox API token. You can do this by heading to [mapbox](https://mapbox.com) and signing up there.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment
