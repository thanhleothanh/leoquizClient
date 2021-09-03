import ReactDOM from 'react-dom';

export default function Modal({ show, onClose, title, children }) {
  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };
  const modalContent = show ? (
    <div className='fixed top-0 z-20 flex items-center justify-center w-full h-full overflow-hidden bg-black bg-opacity-40 '>
      <div className='flex flex-col justify-between w-11/12 h-auto max-w-2xl bg-white max-h-96'>
        <div className='flex justify-between px-6 py-2 bg-white'>
          <div className='font-semibold xl:text-lg'>{title && title}</div>
          <button onClick={handleClose}>
            <i className='fas fa-times fa-lg' />
          </button>
        </div>
        <div className='px-2 overflow-auto lg:px-7'>{children}</div>
      </div>
    </div>
  ) : null;

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById('modal-root')
  );
}
