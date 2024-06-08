module.exports = function (app) {
    const { User, Role, Permission } = app.models;

    var Middleware = {
        name: "SequelizeGuard",
    };

    Middleware.authorize = (requiredPermission) => async (req, res, next) => {
        try {
            if (!req.userId) {
                return res.status(403).send({ message: "User ID not found in request. User may not be authenticated." });
            }
    
            const user = await User.findByPk(req.userId, {
                include: [{
                    model: Role,
                    as: 'Role',  // Make sure this matches the alias used in your User model's association
                    include: [{
                        model: Permission,
                        as: 'Permissions'  // And this matches the alias used in your Role model's association
                    }]
                }]
            });
    
            if (!user || !user.Role) {
                return res.status(403).send({ message: "Access denied. No role found." });
            }
    
            const permissions = user.Role.Permissions.map(permission => permission.name);
            if (permissions.includes(requiredPermission)) {
                next();  // Permission is found, continue to the next middleware
            } else {
                return res.status(403).send({ message: "Access denied. You do not have the required permission." });
            }
        } catch (error) {
            console.error("Permission Check Error:", error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    };    

    return Middleware;
};
