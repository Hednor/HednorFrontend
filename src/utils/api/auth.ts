import axios from "axios";

export const loginAuth = async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
    return response.data;
};

export const signupAuth = async ({name,email, password}: { name: string; email: string; password: string }) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {displayName:name,email,password});
    return response.data;
};