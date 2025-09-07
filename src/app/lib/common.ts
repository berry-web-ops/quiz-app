import axios from 'axios';
import { Question } from '../types/types';

export const shareToSocialMedia = (platform: string, score: number, totalQuestions: number) => {
  const shareText = `I just scored ${score}/${totalQuestions} on this amazing quiz! 🎯 Can you beat my score?`;
  const shareUrl = window.location.href;
  
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);
  
  let shareLink = '';
  
  switch (platform.toLowerCase()) {
    case 'facebook':
      shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
      break;
    case 'x':
      shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
      break;
    case 'telegram':
      shareLink = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
      break;
    case 'linkedin':
      shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodedText}`;
      break;
    default:
      console.error('Unsupported social media platform:', platform);
      return;
  }

  window.open(shareLink, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
};

export const shareToFacebook = (score: number, totalQuestions: number) => 
  shareToSocialMedia('facebook', score, totalQuestions);

export const shareToX = (score: number, totalQuestions: number) => 
  shareToSocialMedia('x', score, totalQuestions);

export const shareToTelegram = (score: number, totalQuestions: number) => 
  shareToSocialMedia('telegram', score, totalQuestions);

export const shareToLinkedIn = (score: number, totalQuestions: number) => 
  shareToSocialMedia('linkedin', score, totalQuestions);

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