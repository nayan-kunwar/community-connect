import { UserDocument } from '../../interfaces/user.interface.ts';

declare global {
    namespace Express {
        interface Request {
            user?: Pick<UserDocument, '_id' | 'email' | 'username'> & {};
        }
    }
}