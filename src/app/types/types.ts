export type Question = {
    type: string,
    difficulty: string,
    category: string,
    question: string,
    correct_answer: string,
    incorrect_answers: [string, string, string]
}

export type Result = {
    score: number | undefined
}