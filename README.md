# MyBlogApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

You can find the deployed App here: https://bootcamp-fs07.github.io/Practica_Final-Mauricio_Huayta/

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version 20.x or higher)
- [Angular CLI](https://angular.io/cli) (version 19.0.6 or higher)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Bootcamp-FS07/Practica_Final-Mauricio_Huayta.git
    cd Practica_Final-Mauricio_Huayta
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Development server

To start a local development server, run:

```bash
ng serve
```

Or you can also run the command:
```bash
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Project Structure

Here is a brief overview of the project structure:

- `src/`: This is the main folder containing the source code of the application.
  - `app/`: Contains the main application files.
    - `core/`: Contains core services used across the application (e.g. guards, interceptors).
    - `features/`: Contains feature components and pages specific to different parts of the application (e.g., auth, posts, comments).
    - `shared/`: Contains shared components that are used across multiple feature modules.
  - `environments/`: Contains environment-specific configuration files.
- `angular.json`: Configuration file for Angular CLI.
- `package.json`: Contains project metadata and dependencies.
