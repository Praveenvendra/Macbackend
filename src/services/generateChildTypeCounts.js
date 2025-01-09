import { fetchArtifactData } from "../api/fetchEntityData.js";

function calculateChildArtifactTypeCounts(artifactId, artifactsMap) {
    const artifact = artifactsMap[artifactId];
    if (!artifact) return {};

   
    const childCounts = (artifact.childrenIds || []).reduce((counts, childId) => {
        const childArtifact = artifactsMap[childId];
        if (childArtifact) {
            const type = childArtifact.artifactType;
            counts[type] = (counts[type] || 0) + 1;

           
            const childDescendantCounts = calculateChildArtifactTypeCounts(childId, artifactsMap);
            for (const [descendantType, count] of Object.entries(childDescendantCounts)) {
                counts[descendantType] = (counts[descendantType] || 0) + count;
            }
        }
        return counts;
    }, {});

    return childCounts;
}

 export  async function generateChildTypeCounts(artifactId) {

     const inputData = await fetchArtifactData();

    const artifactsMap = inputData.reduce((map, artifact) => {
        map[artifact.artifactId] = artifact;
        return map;
    }, {});

    const rootArtifact = artifactsMap[artifactId];

    if (!rootArtifact) {
        console.error(`Artifact with ID: ${artifactId} not found`);
        return null;
    }

    return calculateChildArtifactTypeCounts(artifactId, artifactsMap);
}