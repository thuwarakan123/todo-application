// const app = require('./app');
// const { syncDatabase } = require('./models');

// const PORT = process.env.PORT || 3000;

// syncDatabase().then(() => {
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });

// const app = require('./app');
// const { syncDatabase } = require('./models');

// const PORT = process.env.PORT || 3000;

// const startServer = async () => {
//   try {
//     console.log("Attempting to connect to the database...");
//     await syncDatabase();
//     console.log("Database connected and synchronized.");

//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   } catch (error) {
//     console.error("Database connection failed. Retrying in 5 seconds...", error);
//     setTimeout(startServer, 5000); // Retry connection in 5 seconds
//   }
// };

// startServer();

const app = require('./app');
const { syncDatabase } = require('./models');

const PORT = process.env.PORT || 3000;

const startServer = async (retries = 5, delay = 5000) => {
  try {
    console.log("Attempting to connect to the database...");
    await syncDatabase();
    console.log("Database connected and synchronized.");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(`Database connection failed. Retries left: ${retries}`, error);
    if (retries > 0) {
      setTimeout(() => startServer(retries - 1), delay);
    } else {
      console.error("Could not connect to the database. Exiting.");
      process.exit(1);
    }
  }
};

startServer();
