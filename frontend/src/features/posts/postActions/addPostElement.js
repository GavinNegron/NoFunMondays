export const addPostElement = (newElement) => {
    return {
        type: 'posts/addPostElement',
        payload: newElement,
    };
};