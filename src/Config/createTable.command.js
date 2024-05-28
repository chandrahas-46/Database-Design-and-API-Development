// Create the database if it doesn't exist
export const createDatabase = `
    CREATE DATABASE IF NOT EXISTS api_database;
`;

// User table
export const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL
      )
`;

// Organizations table
export const createOrganizationTableQuery = `
    CREATE TABLE IF NOT EXISTS organizations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        user_id INT REFERENCES users(id) ON DELETE CASCADE
      )
`;

// user_organizations table
export const createUser_OrgTableQuery = `
    CREATE TABLE IF NOT EXISTS user_organizations (
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        organization_id INT REFERENCES organizations(id) ON DELETE CASCADE,
        PRIMARY KEY (user_id, organization_id)
      )
`;

// Task table
export const createTaskTableQuery = `
    CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        organization_id INT REFERENCES organizations(id) ON DELETE CASCADE,
        user_id INT REFERENCES users(id) ON DELETE CASCADE
      )
`;

