'use client';
import { Question } from '../types/types';
import { shuffle } from 'lodash';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import '../../app/globals.css';

export const QuestionsCard = ({data, sendDataToParent}: {data: Question[], sendDataToParent: (quizdata: {count: number, result: boolean[]}) => void }) => {
    const [quizdata, setQuizData] = useState<{count: number, result: boolean[]}>({count: 0, result: []});
    function handleClick(event: { currentTarget: { innerText: string; }; }) {
        console.log(data[quizdata.count].correct_answer.toLowerCase());
        
        quizdata.result.push(event.currentTarget.innerText.toLowerCase() === data[quizdata.count].correct_answer.toLowerCase());
        setQuizData({count: quizdata.count+1, result: quizdata.result});
        sendDataToParent(quizdata);
    }

    return (
        <div className='flow-root object-center place-self-center place-content-center items-center max-w-400 h-300'>
        {data.slice(quizdata.count, quizdata.count+1).map((el, index) => {   
        const answersArr = [el.correct_answer, ...el.incorrect_answers];
        const shuffledArr = shuffle(answersArr);
        return (
            <Card sx={{ maxWidth: 550 }} className='flow-root absolute inset-0 place-self-center text-sm p-1em justify-items-center place-content-center items-center self-center' key={index}>
            <CardContent>
            <Typography gutterBottom variant="h5" className='m-4 p-2em place-content-center text-center items-center self-center text-ellipsis' component="div">
            Question {quizdata.count+1}/10
            </Typography>
            <Typography variant="body2" className='place-content-center text-center items-center self-center text-balance' sx={{ color: 'text.secondary' }} component="div">
                <div key={index}>{el.question}</div>
            </Typography>
            </CardContent>
            <CardActions>
                    <Button variant="outlined" className='text-ellipsis text-wrap w-70 h-20 m-2 p-1 text-xs justify-around items-center' onClick={handleClick}>{shuffledArr[0]}</Button>
                    <Button variant="outlined" className='text-ellipsis text-wrap w-70 h-20 m-2 p-1 text-xs justify-around items-center' onClick={handleClick}>{shuffledArr[1]}</Button>
                    <Button variant="outlined" className='text-ellipsis text-wrap w-70 h-20 m-2 p-1 text-xs justify-around items-center' onClick={handleClick}>{shuffledArr[2]}</Button>
                    <Button variant="outlined" className='text-ellipsis text-wrap w-70 h-20 m-2 p-1 text-xs justify-around items-center' onClick={handleClick}>{shuffledArr[3]}</Button>
            </CardActions>
            </Card>
         )}
        )}
        </div>
    )
};