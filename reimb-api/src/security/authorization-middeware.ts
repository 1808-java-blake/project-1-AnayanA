// checks whether a a netizen can access a page or not
export function authMiddleware(...roles: string[]) {
    return (req, resp, next) => {

        // checks to see if the netizen is a user of the site, reject entry if not
        const user = req.session.user;
        if (!user) {
            resp.sendStatus(401);
            return;
        }

        // sets up permissions
        const hasPermission = roles.some(role => {
            if (user.role === role) {
                return true;
            } else {
                return false;
            }
        })

        //checks to see if the user has the correct permissions
        if (hasPermission) {
            next();
        } else {
            resp.sendStatus(403);
        }
    }
}