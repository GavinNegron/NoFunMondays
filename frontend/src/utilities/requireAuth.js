import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]"; 

export const requireAuth = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  if (!session) {
    return { 
      redirect: { 
        destination: '/login', 
        permanent: false 
      } 
    };
  }
  
  return { props: { session } };
};