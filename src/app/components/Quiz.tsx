'use client';
import { QuestionsCard } from '../components/QuestionsCard';
import { ResultsCard } from '../components/ResultsCard';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import { generateQuizQuestions } from '../lib/common';
import { useQuery } from '@tanstack/react-query';
import '../../app/globals.css';

export const Quiz = () => {
    const [count, setCount] = useState(0);
    const [result, setResult] = useState<boolean[]>([]);
    const { data, isLoading, isError, refetch } = useQuery({ queryKey: ['quiz'], queryFn: generateQuizQuestions });

    if(isLoading){
        return <LoadingButton fullWidth={true} variant="text" size='medium' loadingIndicator="Loading" loadingPosition="start">Question is loading...</LoadingButton>
    }

    if(isError){
        return <p>Error loading question. Try again</p>
    }

    const handleDataFromQuestionCard = (quizdata: {count: number, result: boolean[]}) => {
        setCount(quizdata.count);
        setResult(quizdata.result);
        if (count === 0 || !data){
           refetch();
        }
    };

    return (
        <div>
        <div>{count === 9 ? <ResultsCard result={result} sendDataToParent={handleDataFromQuestionCard}/> 
                          : <QuestionsCard data={data!} sendDataToParent={handleDataFromQuestionCard} />}
        </div>
        </div>
    )
}