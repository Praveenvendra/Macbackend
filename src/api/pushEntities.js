import axios from "axios"
import { API_ENDPOINT, HEADERS } from "../config/constants.js";

export const pushEntities = async (entities) => {
    try {
    await axios.post(
        `${API_ENDPOINT}/instances?upsert=true`,
        entities,
        { headers: HEADERS() }
    );
    console.log('Entities pushed successfully');
}
catch(error){
    console.error("Error pushing entities:", error.response?.data || error.message);
    throw new Error(`Failed to push entities: ${error.message}`);
}
};


