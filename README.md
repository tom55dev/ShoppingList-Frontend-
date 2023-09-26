# Shopping List App Frontend

Welcome to the README for the Shopping List App Frontend! This frontend application is built to provide a user-friendly interface for managing your shopping lists. It is designed with a clean and intuitive user interface using MaterialUI and Tailwind CSS, and it communicates with a GraphQL backend powered by Go. This README will guide you through the setup, features, and usage of this application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm (Node Package Manager) installed on your development machine.
- Access to a GraphQL backend server using Go (ensure it's up and running).

## Getting Started

Follow these steps to get the Shopping List App Frontend up and running:

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   cd shopping-list-frontend
   ```

2. Install the project dependencies using npm:

   ```bash
   yarn install
   ```

3. Configure the GraphQL backend URL:

   Open the `.env` file and set the `REACT_APP_GRAPHQL_URL` variable to the URL of your GraphQL backend.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your web browser and navigate to `http://localhost:3000` to access the application.

## Features

The Shopping List App Frontend offers the following key features:

- **Add Items**: Easily add new items to your shopping list with a name, quantity, and other details.

- **Edit Items**: Edit existing items on your shopping list, updating their names, quantities, and other attributes as needed.

- **Delete Items**: Remove unwanted items from your shopping list with a simple delete action.

- **Mark as Purchased**: Keep track of purchased items by marking them as purchased.

## Technologies Used

This frontend application is built using the following technologies:

- **React**: The core of the frontend application.
- **Material-UI**: Provides a set of pre-built UI components and styles for a modern and responsive design.
- **Tailwind CSS**: Used for additional styling and customization.
- **Apollo Client**: Manages GraphQL queries and mutations to interact with the backend.
- **GraphQL**: Communicates with the Go backend to retrieve and update shopping list data.

## Scripts

Here are some useful npm scripts included in the `package.json` file:

- `npm run dev`: Start the development server.
- `npm run build`: Build the production-ready application.
- `npm run serve`: Serve the production build locally.
- `npm run lint`: Run ESLint to lint your TypeScript and JavaScript code.
- `npm run lint:fix`: Automatically fix ESLint issues.
- `npm test`: Run tests using Vitest.

## Contributing

Contributions to this project are welcome! If you'd like to contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure that tests pass.
4. Submit a pull request with a clear description of your changes.

```
Happy shopping with your new Shopping List App Frontend! If you have any questions or encounter any issues, please feel free to reach out to us.
