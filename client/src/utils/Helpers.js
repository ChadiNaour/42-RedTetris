import axios from "axios";
export const getAvatar = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const avatar = Math.floor(Math.random() * 50 + 1);

            // const result = await axios.get(`https://api.adorable.io/avatars/285/${avatar}`);
            const result = await axios.get(
                `https://api.multiavatar.com/${avatar}`
            );
            resolve(result.data);
        } catch (err) {
            reject(err);
        }
    });
};
