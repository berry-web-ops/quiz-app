'use client';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../../app/globals.css';
import { IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useState } from 'react';
import { shareToFacebook, shareToX, shareToTelegram, shareToLinkedIn } from '../lib/common';

export const ResultsCard = ({result, sendDataToParent}:{result: boolean[], sendDataToParent: (quizdata: {count: number, result: boolean[]}) => void}) => {
    const score = result.filter((el) => el === true).length;
    const totalQuestions = result.length;
    const quizdata = {count: 0, result: []};
    const [open, setOpen] = useState(false);
    
    function handleOpen() {
      setOpen(!open);
    }

    // Share functions for each platform
    const handleFacebookShare = () => shareToFacebook(score, totalQuestions);
    const handleTwitterShare = () => shareToX(score, totalQuestions);
    const handleTelegramShare = () => shareToTelegram(score, totalQuestions);
    const handleLinkedInShare = () => shareToLinkedIn(score, totalQuestions);

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
            <IconButton aria-label="share" onClick={handleOpen}>
              <ShareIcon />
            </IconButton>
        </CardActions>
        {open && (
          <div className="flex flex-wrap justify-center gap-2 p-4 border-t">
            <Typography variant="body2" className="w-full text-center mb-2">
              Share your results:
            </Typography>
            <IconButton onClick={handleFacebookShare} aria-label="facebook" color="primary">
              <FacebookIcon />
            </IconButton>
            <IconButton onClick={handleTwitterShare} aria-label="twitter" color="primary">
              <XIcon />
            </IconButton>
            <IconButton onClick={handleTelegramShare} aria-label="telegram" color="primary">
              <TelegramIcon />
            </IconButton>
            <IconButton onClick={handleLinkedInShare} aria-label="linkedin" color="primary">
              <LinkedInIcon />
            </IconButton>
          </div>
        )}
        </Card>
      </div>
    )
};