const { generateHash, verifypassword } = require('../utils/bcrypt');

class AuthService {

    constructor(authDao) {
        this.authDao = authDao;
    }

    async register(req) {
        const { username, password } = req.body;
        const hashedPassword = await generateHash(password);
        await this.authDao.createUser(username, hashedPassword);
        return { status: 201, message: 'Successful' };
    }

    async login(req) {
        const { username, password } = req.body;
        const user = await this.authDao.getUser(username);

        if(!user) {
            return { status: 404, message: 'User not found' };
        }

        const isMatch = await verifypassword(password, user.password);

        if(!isMatch) {
            return { status: 401, message: 'Invalid credentials' };
        }

        req.session.user = user;
        return { status: 200, message: 'Logged in' };
    }

    async logout(req) {
        req.session.destroy();
        return { status: 200, message: 'Logged out' };
    }
}

module.exports = AuthService;