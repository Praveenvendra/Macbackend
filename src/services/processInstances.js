import { fetchEntityData } from '../api/fetchEntityData.js';
import { updateEntities } from '../utils/updateEntities.js';
import { pushEntities } from '../api/pushEntities.js';
import { deleteEntity } from '../api/deleteEntity.js';
import { validateInteraction } from '../validations/validation.js';

export const processInstances = async (sourceId, destinationId, type, sourceAgentId, destinationAgentId) => {
    try {
        const [sourceEntities, destinationEntities] = await Promise.all([
            fetchEntityData(sourceId, sourceAgentId),
            fetchEntityData(destinationId, destinationAgentId)
        ]);

        const source = sourceEntities[0];
        const destination = destinationEntities[0];

        try {
            validateInteraction(source.artifactName, destination.artifactName);
        } catch (error) {
            console.warn(error.message);
            return {
                success: false,
                message: error.message,
            };
        }

        const updatedEntities = updateEntities(sourceEntities, destinationEntities);

        console.log("updatedEntities", updatedEntities);

        if (type === 'replace') {
            const id = sourceEntities[0].id;
            console.log(id);
            await deleteEntity(id);
        }

        await pushEntities(updatedEntities);

        console.log(`Successfully processed source: ${sourceId}, destination: ${destinationId}`);

        return {
            success: true,
            message: 'Workflow completed successfully.',
            updatedEntities,
        };

    } catch (error) {
        console.error(`Error processing source: ${sourceId}, destination: ${destinationId}`, error.message);
        return {
            success: false,
            message: 'Workflow failed.',
            error: error.message,
        };
    }
};