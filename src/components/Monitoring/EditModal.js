import React, { useState } from "react";
import TutorialDataService from "../../services/BookIOService";

const EditModal = (props) => {
  const initialTutorialState = {
    key: null,
    bookCode: "",
    complete: false,
    description: "",
    entryDate: "",
    entryTotal: "",
    title: "",
  };

  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");
  const { tutorial } = props;
  if (currentTutorial?.key !== tutorial.key) {
    setCurrentTutorial(null)
    setCurrentTutorial(tutorial);
    setMessage("");
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updateTutorial = () => {
    // var curDate = new Date().toLocaleString('id-ID', {
    //   weekday: 'short', // "Sat"
    //   day: '2-digit', // "01"
    //   month: 'short', // "Jun"
    //   year: 'numeric', // "2019"
    //   hour: 'numeric',
    //   minute: 'numeric'
    // })
    const data = {
      bookCode: tutorial.bookCode,
      complete: true,
      description: tutorial.description,
      entryDate: tutorial.entryDate,
      entryTotal: tutorial.entryTotal,
      title: tutorial.title,
    };

    TutorialDataService.update(currentTutorial.key, data)
      .then(() => {
        setMessage("Book entry was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTutorial ? (
        <div 
          class="flex flex-col w-full mx-auto p-4 border border-gray-200 bg-white shadow"
        >
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="bookCode"
                name="bookCode"
                value={currentTutorial.bookCode}
                onChange={handleInputChange}
                placeholder="Book Code"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTutorial.title}
                onChange={handleInputChange}
                placeholder="Title"
              />
            </div>
            <div className="form-group">
            <label htmlFor="entryDate">Entry Date</label>
            <input
              type="datetime-local"
              className="form-control"
              id="entryDate"
              required
              value={tutorial.entryDate}
              onChange={handleInputChange}
              name="entryDate"
            />
          </div>
          <div className="form-group">
            <label htmlFor="entryTotal">Entry Total</label>
            <input
              type="number"
              className="form-control"
              id="entryTotal"
              required
              value={tutorial.entryTotal}
              onChange={handleInputChange}
              name="entryTotal"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          </form>
          <div style={{ "text-align": "right" }}>  
            <button
              type="submit"
              class="px-3 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-green-500 hover:bg-green-600 active:bg-green-700 focus:ring-green-300"
              onClick={updateTutorial}
            >
              Update
            </button>
          </div>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Book...</p>
        </div>
      )}
    </div>
  );
};

export default EditModal;
