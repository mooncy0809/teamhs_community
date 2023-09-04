import axios from "axios";

export const signInApi = async (data: any) => {
    const response = await axios.post("http://localhost:8090/api/auth/signIn", data).catch((error) => null); // eslint-disable-line no-unused-vars
    if (!response) return null;

    const result = response.data;
    return result;
  
}

export const signUpApi = async (data: any) => {
    const response = await axios.post("http://localhost:8090/api/auth/signUp", data).catch((error) => null); // eslint-disable-line no-unused-vars
    if (!response) return null;

    const result = response.data;
    return result;

}