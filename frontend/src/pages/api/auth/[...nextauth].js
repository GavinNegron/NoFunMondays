import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Login failed: ${errorText}`);
        }

        const data = await res.json();

        if (!data || !data.token) {
          throw new Error('Invalid credentials');
        }

        return { ...data.user, token: data.token };
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { 
    strategy: 'jwt', 
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 15
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role || null;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
        session.user = { 
            id: token.id, 
            email: token.email, 
            role: token.role ?? null 
          };
          session.token = token.token;
          return session;
      
    },
  },
};

export default NextAuth(authOptions);