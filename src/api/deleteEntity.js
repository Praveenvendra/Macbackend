import axios from "axios";
import { API_ENDPOINT, HEADERS } from "../config/constants.js";

export const deleteEntity = async (entity) => {
    console.log(HEADERS());

    try {
        await axios.delete(`${API_ENDPOINT}/instances`, {
            headers: HEADERS(),
            data: { id: entity }, 
        });
        console.log("Entity deleted successfully");
    } catch (error) {
        console.error("Error deleting entity:", error.response?.data || error.message);
        throw error;
    }
};
