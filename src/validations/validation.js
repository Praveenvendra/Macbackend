
const VALIDATION_RULES = {
    "IngestJob" : ["BigQuery","ModelSuite","Listeners","Tasks","Packages","CMS","FlowModel", "Visualisation", "Library", "Campaigns", "Engagement", "SocialMediaGateway", "NativePlatformGateway", "Alliance", "ExperienceProvider", "AccelerationPartner"],
    "Cohorts": ["Context", "MLModel", "ModelSuite", "FlowModel", "Visualisation", "Library", "Campaigns", "Engagement", "IngestJob", "Listeners", "Tasks", "Packages", "Experiences", "CMS", "Alliance", "ExperienceProvider", "AccelerationPartner", "SocialMediaGateway", "NativePlatformGateway"],
    "Context": ["BigQuery", "MLModel", "ModelSuite", "FlowModel", "Visualisation", "Library", "Campaigns", "Engagement", "Listeners", "Tasks", "Packages", "Experiences", "CMS", "Alliance", "ExperienceProvider", "AccelerationPartner", "SocialMediaGateway", "NativePlatformGateway"],
    "Entity": ["BigQuery", "MLModel", "ModelSuite", "FlowModel", "Visualisation", "Library", "Campaigns", "Engagement", "Listeners", "Tasks", "Packages", "Experiences", "CMS", "Alliance", "ExperienceProvider", "AccelerationPartner", "SocialMediaGateway", "NativePlatformGateway"],
    "BigQuery": ["MLModel", "ModelSuite", "FlowModel", "Visualisation", "Library", "Campaigns", "Engagement", "Listeners", "Tasks", "Packages", "Experiences", "CMS", "Alliance", "ExperienceProvider", "AccelerationPartner", "SocialMediaGateway", "NativePlatformGateway"],
    "MLModel": ["ModelSuite", "FlowModel", "Visualisation", "Library", "Campaigns", "Engagement", "Listeners", "Tasks", "Packages", "Experiences", "CMS", "Alliance", "ExperienceProvider", "AccelerationPartner", "SocialMediaGateway", "NativePlatformGateway"],
    "ModelSuite": ["FlowModel", "Visualisation", "Library", "Campaigns", "Engagement", "Listeners", "Tasks", "Packages", "Experiences", "CMS", "Alliance", "ExperienceProvider", "AccelerationPartner", "SocialMediaGateway", "NativePlatformGateway"],
    "Listeners": ["MLModel", "FlowModel", "Visualisation", "Library", "Campaigns", "Engagement", "Tasks", "Packages", "Experiences", "CMS", "Alliance", "ExperienceProvider", "AccelerationPartner", "SocialMediaGateway", "NativePlatformGateway"],
    "Tasks": ["MLModel", "FlowModel", "Visualisation", "Library", "Campaigns", "Engagement", "Packages", "CMS", "Alliance", "ExperienceProvider", "AccelerationPartner", "SocialMediaGateway", "NativePlatformGateway"],
    "Packages": ["MLModel", "FlowModel", "Visualisation", "Library", "Campaigns", "Engagement", "CMS", "Alliance", "ExperienceProvider", "AccelerationPartner", "SocialMediaGateway", "NativePlatformGateway"],
    "CMS": ["MLModel", "FlowModel", "Visualisation", "Library", "Campaigns", "Engagement", "Alliance", "ExperienceProvider", "AccelerationPartner", "SocialMediaGateway", "NativePlatformGateway"],
    "FlowModel": ["MLModel", "Visualisation", "Library", "Campaigns", "Engagement", "Alliance", "ExperienceProvider", "AccelerationPartner", "SocialMediaGateway", "NativePlatformGateway"],
    "Visualisation": ["MLModel", "Library", "Campaigns", "Engagement", "Alliance", "ExperienceProvider", "AccelerationPartner", "SocialMediaGateway", "NativePlatformGateway"],
    "Library": ["MLModel", "Campaigns", "Engagement", "Alliance", "ExperienceProvider", "AccelerationPartner", "SocialMediaGateway", "NativePlatformGateway"],
    "Campaigns": ["MLModel", "Engagement", "Alliance", "ExperienceProvider", "AccelerationPartner", "SocialMediaGateway", "NativePlatformGateway"],
    "Engagement": ["MLModel", "Alliance", "ExperienceProvider", "AccelerationPartner", "SocialMediaGateway", "NativePlatformGateway"],
    "SocialMediaGateway": ["MLModel", "Alliance", "ExperienceProvider", "AccelerationPartner", "NativePlatformGateway"],
    "NativePlatformGateway": ["MLModel", "Alliance", "ExperienceProvider", "AccelerationPartner"],
    "Alliance": ["MLModel", "ExperienceProvider", "AccelerationPartner"],
    "ExperienceProvider": ["MLModel", "AccelerationPartner"],
    "AccelerationPartner": ["MLModel"]
  };
  
 
  export const validateInteraction = (sourceType, destinationType) => {
    const normalizedSourceType = sourceType.toLowerCase();
    const normalizedRules = Object.keys(VALIDATION_RULES).reduce((acc, key) => {
        acc[key.toLowerCase()] = VALIDATION_RULES[key];
        return acc;
    }, {});

   
    if (!normalizedRules[normalizedSourceType]) {
        throw new Error(`Invalid source type: "${sourceType}" does not exist in validation rules.`);
    }

    // Check if the destination type is valid for the source type
    if (normalizedRules[normalizedSourceType].map((type) => type.toLowerCase()).includes(destinationType.toLowerCase())) {
        throw new Error(`Interaction not possible: Source "${sourceType}" cannot interact with destination "${destinationType}".`);
    }
};


