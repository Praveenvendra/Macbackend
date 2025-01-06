import e from "express";
import { Router } from "express";

import {processInstances} from "../services/processInstances.js";



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

export default router;