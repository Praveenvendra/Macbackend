import axios from "axios";
import { ADHOC, HEADERS } from "../config/constants.js";

export const fetchEntityData = async (artifactId, agentId) => {
    console.log("Agent ID:", agentId);

    const queryPayload = {
        type: "tidb",
        definition: `SELECT * FROM t_6773ba1902796d27852f6714_t WHERE \`entity.artifactId\` = '${artifactId}' AND \`entity.agentId\` = '${agentId}'`
    };

    try {  
        const response = await axios.post(
            `${ADHOC}`, 
            queryPayload,
            { headers: HEADERS() }
        );

        const entities = response.data?.model?.data?.map((item) => {
            const entity = { ...item.entity };
            entity.childrenIds = JSON.parse(entity.childrenIds || "[]");
            entity.parentId = JSON.parse(entity.parentId || "[]");
            entity.siblingIds = JSON.parse(entity.siblingIds || "[]")
            return entity;
        }) || [];
        console.log("entites" , entities);


        if (entities.length === 0) {
            throw new Error(`No entities found for artifactId: ${artifactId} and agentId: ${agentId}`);
        }


        return entities;
    } catch (error) {
        console.error("Error fetching entity data:", error);
        throw error;
    }
};
