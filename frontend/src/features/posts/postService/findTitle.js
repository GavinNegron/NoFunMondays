import axios from "axios";

const findTitle = async (title) => {
    try {
        const response = await axios.get('/api/posts/title', {
            params: { title },
        });
        return response.data.available;
    } catch (error) {
        throw new Error('Failed to check title availability');
    }
};

export default findTitle;