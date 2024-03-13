const jwt = require('jsonwebtoken');
const { BlackListModel } = require('../models/blacklist.model');
const { UserModel } = require('../models/users.model'); // Assuming you have a User model

const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (await BlackListModel.findOne({ access_token })) {
        return res.json({ msg: "You have been logged out" });
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, "masai");
            if (decoded) {
                const user = await UserModel.findById(decoded.userId); // Fetch user from database based on userId
                if (!user) {
                    return res.status(401).json({ msg: "User not found" });
                }
                req.user = user; // Store user details in request for further middleware/routes
                
                // Role-based authorization
                if (user.role === 'admin') {
                    // Perform admin-specific actions here
                    console.log('Admin logged in');
                    req.isAdmin = true; // Set isAdmin flag for admin users
                } else if (user.role === 'student') {
                    // Perform student-specific actions here
                    console.log('Student logged in');
                    req.isAdmin = false; // Set isAdmin flag for student users
                }
                next();
            } else {
                res.json({ msg: "Not Authorized" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    } else {
        res.json({ msg: "Please Login" });
    }
}

module.exports = { auth };
