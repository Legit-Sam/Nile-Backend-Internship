const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const swaggerSpec = require('./swagger');
const swaggerUi = require('swagger-ui-express');
const cookieParser = require('cookie-parser');


require('@dotenvx/dotenvx').config()

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/vendors', require('./routes/authRoutes'));

//Swagger Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//Connect to DB and start Server

async function startServer() {
  await connectDB();
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    });
}

startServer();