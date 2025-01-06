import axios from "axios"
import { API_ENDPOINT, HEADERS } from "../config/constants.js";

export const pushEntities = async (entities) => {
    await axios.post(
        `${API_ENDPOINT}/instances?upsert=true`,
        entities,
        { headers: HEADERS() }
    );
    console.log('Entities pushed successfully');
};


