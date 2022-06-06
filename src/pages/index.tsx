import { Button } from '@chakra-ui/react';
import _ from 'lodash';
import { useEffect, useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import questions from '../data.json';

const Index = () => {
  console.log(questions);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showPause, setShowPause] = useState(-1);
  const [score, setScore] = useState(0);
  let questionKey = Object.keys(questions);
  useEffect(() => {
    questionKey = _.shuffle(Object.keys(questions));
  }, []);
  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    setShowPause(-1);
    if (nextQuestion < questionKey.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  const handleAnswerOptionClick = (isCorrect: boolean, order: number) => {
    setShowPause(order);
    if (isCorrect) {
      setScore(score + 1);
    }
  };
  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      {showScore ? (
        <div>
          You scored {score} out of {questionKey.length}
        </div>
      ) : (
        <>
          <div>
            You scored {score} out of {questionKey.length}
          </div>
          <button
            className="m-3 w-full rounded bg-yellow-500 py-2 px-4 font-bold text-white hover:bg-yellow-700"
            onClick={handleNext}
          >
            Next
          </button>
          <div>
            <div className="m-3 font-bold">
              <span>Pertanyaan {currentQuestion + 1}/</span>
              {questionKey.length}
            </div>
            <div className="mx-3">{questionKey[currentQuestion]}</div>
          </div>
          {showPause === -1 ? (
            <div className="flex flex-col">
              {questions[questionKey[currentQuestion]].map((answerOption) => (
                <Button
                  key={answerOption}
                  height="80px"
                  colorScheme="blue"
                  className="m-3"
                  style={{
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                  }}
                  onClick={() =>
                    handleAnswerOptionClick(answerOption[1], currentQuestion)
                  }
                >
                  {answerOption[0]}
                </Button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              {questions[questionKey[currentQuestion]].map((answerOption) => (
                <Button
                  key={answerOption}
                  height="80px"
                  colorScheme={answerOption[1] ? 'green' : 'red'}
                  className="m-3"
                  disabled
                  style={{
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                  }}
                  onClick={() =>
                    handleAnswerOptionClick(answerOption[1], currentQuestion)
                  }
                >
                  {answerOption[0]}
                </Button>
              ))}
            </div>
          )}
        </>
      )}
    </Main>
  );
};

export default Index;
