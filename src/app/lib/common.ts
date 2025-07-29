import axios from 'axios';
import { Question } from '../types/types';

export const generateToken = async (): Promise<string> => {
    const response = await axios.get(`${process.env.baseUrl}/api_token.php?command=request`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error);
        })
    return response?.token;
}

export const generateQuizQuestions = async (): Promise<Question[]> => {
    const token = await generateToken();
    const questions = await axios.get(`${process.env.baseUrl}/api.php?amount=10&category=18&type=multiple&token=${token}`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error);
        })
    return questions?.results;
}