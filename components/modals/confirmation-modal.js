const ConfirmationModal = (props) => {
  const { showModal, setAnswer } = props;

  const onButtonsClickHandler = (answer) => {
    setAnswer(answer);
  };

  return showModal ? (
    <>
      <div className="bg-modalBackdrop flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-50">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="relative p-6 flex-auto">
              <div className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                Customer card will be delete. This action is irreversible and can not be undone. Delete customer card?
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => onButtonsClickHandler(false)}
              >
                NO
              </button>
              <button
                className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => onButtonsClickHandler(true)}
              >
                YES
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    ''
  );
};
export default ConfirmationModal;
