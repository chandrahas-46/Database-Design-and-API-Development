import db from "../../Config/pg.config.js";
import jwt from 'jsonwebtoken';
// Hash password
import bcrypt from 'bcrypt';

export default class UserController {
    async signUp(req, res){
        const { username, password, role } = req.body;
        try {
            // 1. Create Hash password
            const hashedPassword = await bcrypt.hash(password, 3);

            // Store user information in the database
            const newUser = await db.query('INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *', [username, hashedPassword, role]);
            
            res.status(201).json({
                success: true,
                user: newUser.rows[0]
            });
        } 
        catch (error) {
            console.error('Error while signing up:', error);
            res.status(500).json({
                success: false,
                message: 'Error while signing up'
            });
        }
    }

    async signIn(req, res) {
        const { username, password } = req.body;

        try {
            // Retrieve user from the database
            const result = await db.query('SELECT * FROM users WHERE email = $1', [username]);
            const user = result.rows[0];
            
            // Check if user exists and password is correct
            if(!user){
                return res.status(400).send("Invalid Email!!");
            }
            else {
                // 2. Compare password with Hashed password
                console.log("******bcrypt result *****");
                const result = await bcrypt.compare(password, user.password);
                console.log("bcrypt result ", result);  //true/false

                if(result){
                    // a. create token.
                    const token = jwt.sign({
                        userID: user.id,
                        username: user.username,
                        role: user.role
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '1h',
                        }
                    );
        
                    // b. send token.
                    return res.status(200).send(token);
                }
                else{
                    return res.status(400).send("Invalid Password!!");
                }
            }
        } 
        catch (error) {
            console.error('Error while signing in:', error);
            res.status(500).json({
                success: false,
                message: 'Error while signing in'
            });
        }
    }
}
