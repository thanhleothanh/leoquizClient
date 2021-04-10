import React from 'react';

const AnswersTable = ({ questions }) => {
  return (
    <div className='container mx-auto flex justify-center w-full sm:w-5/6 lg:w-3/4 bg-gray-100 dark:bg-backGroundColorDark'>
      <table className='table-fixed w-full'>
        <thead>
          <tr>
            <th className='py-3 w-1/12 tableHead rounded-tl-3xl'>
              <i className='fas fa-list-ol' />
            </th>
            <th className='py-3 w-5/12  tableHead'>
              <i className='fas fa-images' />
            </th>
            <th className='py-3 w-3/12  tableHead'>
              <i className='fas fa-question' />
            </th>
            <th className='py-3 w-3/12  tableHead rounded-tr-3xl'>
              <i className='fas fa-check-circle' />
            </th>
          </tr>
        </thead>

        <tbody>
          {questions.map((question, i) => {
            return (
              <tr key={question.question + question.correct_answer}>
                <td className='tableCell  '>{i + 1}</td>
                <td className='md:h-48 h-32 flex justify-center font-medium py-2 bg-gray-50 dark:bg-backGroundColorLight '>
                  {question.question_image ? (
                    <img
                      className='w-11/12 sm:w-5/6 lg:w-2/3 object-cover overflow-hidden rounded-2xl '
                      src={question.question_image}
                      alt='quiz-pic'
                    />
                  ) : (
                    <div className='py-16'>
                      <i className='fas fa-eye-slash' />
                    </div>
                  )}
                </td>
                <td className='tableCell  '>{question.question}</td>
                <td className='tableCell  '>{question.correct_answer}</td>
              </tr>
            );
          })}
          <tr>
            <td className=' py-2  bg-gray-50 dark:bg-backGroundColorLight rounded-bl-3xl'></td>
            <td className=' py-2  bg-gray-50 dark:bg-backGroundColorLight '></td>
            <td className=' py-2  bg-gray-50 dark:bg-backGroundColorLight '></td>
            <td className=' py-2  bg-gray-50 dark:bg-backGroundColorLight rounded-br-3xl'></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AnswersTable;
