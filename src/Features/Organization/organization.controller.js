import db from '../../Config/pg.config.js';

export default class OrganizationController {
    async createOrganization(req, res) {
        const { name, userId } = req.body;
        try {
            const newOrg = await db.query('INSERT INTO organizations (name, user_id) VALUES ($1, $2) RETURNING *', [name, userId]);
            res.status(201).json({ success: true, organization: newOrg.rows[0] });
        } 
        catch (error) {
            console.error('Error while creating organization:', error);
            res.status(500).json({ success: false, message: 'Error while creating organization' });
        }
    }

    async getUserOrganizations(req, res) {
        const { userId } = req.params;
        try {
            const organizations = await db.query('SELECT * FROM organizations WHERE user_id = $1', [userId]);
            res.status(200).json({ success: true, organizations: organizations.rows });
        } 
        catch (error) {
            console.error('Error while retrieving organizations:', error);
            res.status(500).json({ success: false, message: 'Error while retrieving organizations' });
        }
    }
}
