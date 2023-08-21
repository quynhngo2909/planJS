import { User } from "../orm/entities/User";
import { config } from "../orm/configs/ormconfig";

const userRepository = config.getRepository(User);

const getUserByEmail = async (userEMail) => {
    return await userRepository.findOne({
        relations: {
            role: true,
        },
        where: {
            email: userEMail,
        },
    });
};

const getUserById = async (userId) => {
    return await userRepository.findOne({
        relations: {
            role: true,
        },
         where: {
            id: userId,
        },
    });
};

const saveUser = async (newUser) => {
    await userRepository.save(newUser);
};

export {
    getUserById,
    getUserByEmail,
    saveUser,
}