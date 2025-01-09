import e from "express";
import { Router } from "express";

import {processInstances} from "../services/processInstances.js";
import { buildArtifactHierarchy } from "../services/buildArtifactHierarchy.js";
import { generateChildTypeCounts } from "../services/generateChildTypeCounts.js";


const router = Router();
router.use(e.json());

router.post("/interaction", async (req, res) => {

    const {sourceId, destinationId, type, sourceAgentId, destinationAgentId} = req.body;

    if (!sourceId || !destinationId) {
      return res.status(400).json({ error: 'sourceId and destinationId are required.' });
    }

    try {
       const result = await processInstances(sourceId, destinationId,type,sourceAgentId,destinationAgentId);
        if (result.success){
           res.status(200).json({result});
    }
        else{
            res.status(500).json({result});
        }
      }
       catch (error) {
        res.status(500).json({
          error: 'Internal server error.',
          details: error.message,
        });
      }

});



router.get("/find-innerArtifacts", async(req,res) => {

    const {artifactId,innerCardDetails} = req.query;
    if(!artifactId){
      return res.status(400).json({ error: "Missing artifactId query parameter" });
    }

    console.log(artifactId);
    console.log(innerCardDetails);

   

    try {
      const includeInnerCardDetails = innerCardDetails === undefined || innerCardDetails !== "false"; // Default to true if undefined
      const result = await buildArtifactHierarchy(artifactId, includeInnerCardDetails);
      res.json(result);
  } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: error.message });
  }

})



router.get("/digital-footprint", async(req,res) => {
   
             const {artifactId} = req.query;

             if(!artifactId){
              return res.status(400).json({ error: "Missing artifactId query parameter" });
             }


             try{
                 const counts =  await generateChildTypeCounts(artifactId);
                 res.json(counts);
             }
             catch(error){
              console.error("Error:", error.message);
              res.status(500).json({ error: error.message });

             }


})

export default router;