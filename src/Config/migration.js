// import { createDatabase } from "./createTable.command.js";
import { createUserTableQuery } from "./createTable.command.js";
import { createOrganizationTableQuery } from "./createTable.command.js";
import { createUser_OrgTableQuery } from "./createTable.command.js";
import { createTaskTableQuery } from "./createTable.command.js";
import db from "./pg.config.js";

const runDB = async () => {
    console.log("Begin DB Migration");
    // use single client for transaction
    const client = await db.connect();
    try {
        await client.query('BEGIN');    // BEGIN Transaction
        // await client.query(createDatabase);
        await client.query(createUserTableQuery);
        await client.query(createOrganizationTableQuery);
        await client.query(createUser_OrgTableQuery);
        await client.query(createTaskTableQuery);
        await client.query('COMMIT');   // Commit Transaction
        console.log("END DB Migration");
    }
    catch (err) {
        await client.query('ROLLBACK'); // Rollback transaction
        console.log("DB Migration Failed");
        throw err
    }
    finally {
        client.release();
    }
    
}

export default runDB;