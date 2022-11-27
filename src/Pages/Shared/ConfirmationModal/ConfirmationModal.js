import React from 'react';

const ConfirmationModal = ({title, message, buttonName, closeModal, handleDelete, modalData}) => {
  return (
    <div>
      {/* The button to open modal */}
      

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <button className='btn btn-outline' onClick={closeModal}>Cancel</button>
            <label onClick={() => handleDelete(modalData)} htmlFor="my-modal" className="btn btn-error">{buttonName}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;