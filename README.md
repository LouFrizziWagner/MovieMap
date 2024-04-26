# MovieMap

## Project Overview

MovieMap is a movie information API built using Node.js and Express.js. It provides endpoints to fetch information about currently playing movies and reviews for specific movies. The data is sourced from The Movie Database (TMDb) API.

## Dependencies

- axios: Used for making HTTP requests to the TMDb API.
- cors: Enables Cross-Origin Resource Sharing (CORS) to allow requests from different origins.
- dotenv: Loads environment variables from a .env file to keep sensitive data secure.
- express: Web application framework for Node.js, used for handling API routes and requests.

## Folder Structure

- **app.js**: Main entry point of the application where the server is configured and routes are defined
- **routes**: Directory containing route handlers for endpoints
  - **moviesRouter.js**: Handles movie-related API endpoints such as fetching currently playing movies and movie reviews
- **public**: Directory containing static files served by server
  - **index.html**: document structure
  - **/css**: styling
  - **/scripts**: dom manipulation, event handling
  - **/assets**: contains placeholder, background image

## Setup

1. Make sure you are in the directory moviemap/moviemap

2. Install dependencies, run the following command in your terminal:

```bash
npm install axios cors dotenv express
``` 

3. Create a `.env` file in the root directory and add your TMDb API key as `MOVIEDB_API_KEY=<your_api_key>`.

4. Run the server from directory moviemap/moviemap:

```bash
node app.js
``` 

## Endpoints

- **GET /api/movies/now-playing**: Fetches a list of currently playing movies.
- **GET /api/movies/reviews/:movieId**: Fetches reviews for a specific movie identified by movieId.

## Running the Server

To start the server, run `node app.js` in the terminal. By default, the server runs on [http://localhost:3000](http://localhost:3000).

## Notes

- unfinished: bookmarking and displaying bookmarked
- The project aims to be as lean as possible while still providing clear project structure of separation of concerns, statelessness and modular, maintainable
- This projects UI needs to be redone in terms of user friendlyness (number of clicks and scrolls to get somewhere) and colorscheme, icons instead of so much text, comments need to be substrings and expand on click, close movie overview needs to be available at all times
- I would create html templates with custom params for components, for reusability
- I would clean up the css naming and follow thru with SMACCS convention
- I would provide a main.js handling the other front end scripts
- Better file documentation

## Contributors

This project was developed by [Your Name] and contributions are welcome.

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.

For any questions or issues, please contact me.
