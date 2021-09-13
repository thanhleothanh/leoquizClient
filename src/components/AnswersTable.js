import React from 'react';

const AnswersTable = ({ questions, fullWidth }) => {
  return (
    <div
      className={`container mx-auto flex justify-center w-full ${
        fullWidth ? '' : 'sm:w-5/6 lg:w-3/4'
      } bg-gray-100 dark:bg-backGroundColorDark`}
    >
      <table className='w-full table-fixed'>
        <thead>
          <tr>
            <th className='w-1/12 py-3 tableHead rounded-tl-3xl'>
              <i className='fas fa-list-ol' />
            </th>
            <th className='w-5/12 py-3 tableHead'>
              <i className='fas fa-images' />
            </th>
            <th className='w-3/12 py-3 tableHead'>
              <i className='fas fa-question' />
            </th>
            <th className='w-3/12 py-3 tableHead rounded-tr-3xl'>
              <i className='fas fa-check-circle' />
            </th>
          </tr>
        </thead>

        <tbody>
          {questions &&
            questions.map((question, i) => {
              return (
                <tr key={question.question + question.correct_answer + i}>
                  <td className='tableCell'>{i + 1}</td>
                  <td className='py-5 font-medium bg-gray-50 dark:bg-backGroundColorLight'>
                    {question.question_image ? (
                      <img
                        className='object-cover w-11/12 overflow-hidden rounded-2xl'
                        src={question.question_image}
                        alt='quiz-pic'
                      />
                    ) : (
                      <div className='flex items-center justify-center w-full h-full'>
                        <i className='fas fa-eye-slash' />
                      </div>
                    )}
                  </td>
                  <td className='py-5 tableCell'>{question.question}</td>
                  <td className='tableCell '>{question.correct_answer}</td>
                </tr>
              );
            })}
          <tr>
            <td className='py-2 bg-gray-50 dark:bg-backGroundColorLight rounded-bl-3xl'></td>
            <td className='py-2 bg-gray-50 dark:bg-backGroundColorLight'></td>
            <td className='py-2 bg-gray-50 dark:bg-backGroundColorLight'></td>
            <td className='py-2 bg-gray-50 dark:bg-backGroundColorLight rounded-br-3xl'></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AnswersTable;
