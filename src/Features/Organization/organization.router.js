// 1. Import express.
import express from 'express';
import OrganizationController from './organization.controller.js';

// 2. Initialize Express router.
const organizationRouter = express.Router();
const organizationController = new OrganizationController();

organizationRouter.post('/', (req, res)=>{
    organizationController.createOrganization(req, res);
});
organizationRouter.get('/:userId', (req, res)=>{
    organizationController.getUserOrganizations(req, res);
});

export default organizationRouter;
