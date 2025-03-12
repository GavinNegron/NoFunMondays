import { getSession } from 'next-auth/react';

export const getAuthToken = async () => {
    const session = await getSession();
    if (!session || !session.token) throw new Error('Not authorized to perform task');
    return session.token;
};