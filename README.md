## Getting Started

### Prerequisites

- Node.js (version 21 or newer)
- Yarn

### Installation

1. Navigate to the project directory:

```bash
cd picsart-project
```

2. Install dependencies:

```bash
yarn
```

### Running

In the root directory, run the following command. It will start the application.

```bash
yarn dev
```

By default, the frontend is available locally at `http://localhost:5173/`.

#### Tests and Coverage

The following commands run all unit tests. The second one also provides the coverage of each test.

```bash
yarn test
```

```bash
yarn test:coverage
```

## Application Architecture Overview

The application is built with Vite, ensuring a smooth development experience. The architecture used in this project is designed to provide a smooth development experience, ensure reliable testing, and enable modular and scalable application growth.

### Core Technologies

- **Frontend**
  - **Vite**: Used for fast builds and Hot Module Replacement (HMR)
  - **Vitest**: Employed for unit testing
  - **Tailwindcss**: For rapid styling
  - **Zustand**: For state management

### Folder Structure and Key Components

#### `src/components`

- Other application-specific, and more complex components.

#### `src/pages`

Pages of the application, organized in views and associated logic.

#### `src/routes`

- `AppRoutes`: Configures React Router DOM for application navigation.
- `routes.ts`: Defines routes, aiming to consistent navigation and UI components like navbars.

#### `src/shared`

Utilities, contexts, and hooks shared throughout the app:

- `utils`: Utility functions for generic, reusable logic.

#### `src/store`

Manages global state. Store is divided in 3 slices:

- `CanvasCursorSlice`: responsible for handling cursor position coordinates
- `CanvasImageSlice`: responsible for handling the canvas image loaded through the CanvasManager
- `ColorPickerSlice`: responsible for handling selected and hovered colors

## Future Work Improvements

### Testing

Incorporate more unit tests coverage, specially when dealing with canvas actions, such as drawing the image, getting the cursor position, retrivieng the color of a pixel data, etc.

### Components

Although the components aims to be simple and scalable, the may not be able to serve all use cases and may need more generic behavior and/or extendable configuration as the project grows. In the same way as styling, some components or parts of them could be better abstracted in order to have better reuse of code.

### Styling

Although Tailwindcss comes with lots of advantages such as being `utility-first approach`, `easy customization and configuration`, `performance`, among others, it also brings important considerations, such as `learning curve`, `verbose classnames`, `overring styles` might be tricky sometimes, `design consistency` specially when using arbitrary values (e.g., `w-[123px]`).
