import axios from 'axios';

export const signInApi = async (data) => {
  try {
    const response = await axios.post("http://localhost:8090/api/auth/signIn", data);
    const result = response.data;
    return result;
  } catch (error) {
    console.error("로그인 API 오류:", error);
    throw error;
  }
};

export const signUpApi = async (data) => {
  try {
    const response = await axios.post("http://localhost:8090/api/auth/signUp", data);
    const result = response.data;
    return result;
  } catch (error) {
    console.error("가입 API 오류:", error);
    throw error;
  }
};