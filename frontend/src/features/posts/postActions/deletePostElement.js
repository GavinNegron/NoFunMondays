export const deletePostElement = (elementId) => {
    return {
        type: 'posts/deletePostElement',
        payload: elementId,
    };
};