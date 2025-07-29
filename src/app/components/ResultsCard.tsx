'use client';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import Typography from '@mui/material/Typography';
import '../../app/globals.css';
import { IconButton } from '@mui/material';

export const ResultsCard = ({result, sendDataToParent}:{result: boolean[], sendDataToParent: (quizdata: {count: number, result: boolean[]}) => void}) => {
    const score = result.filter((el) => el === true).length;
    const quizdata = {count: 0, result: []};
    return (
      <div className='flex object-center place-self-center place-content-center items-center'>
        <Card className='flex flex-col absolute inset-0 place-self-center w-1/3 h-1/2 text-sm p-1em justify-items-center place-content-center items-center self-center'>
        <CardContent>
        <Typography gutterBottom variant="h4" component="div">
        Your score: {score}
        </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <Button className='overflow-auto justify-around items-center m-4 text-sm' size="medium" variant="outlined" onClick={() => sendDataToParent(quizdata)}>Restart Quiz</Button>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
        </CardActions>
        </Card>
      </div>
    )
};