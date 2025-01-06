import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import router from "./src/routes/router.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


console.log('PORT:', process.env.PORT); // Should log 3000
console.log('API_TOKEN:', process.env.API_TOKEN); 

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use("/", router); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
