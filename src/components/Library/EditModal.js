import React, { useState } from "react";
import TutorialDataService from "../../services/TutorialService";

const EditModal = (props) => {
  const initialTutorialState = {
    key: null,
    title: "",
    description: "",
    published: false,
    author: "",
    bookCode: "",
    createdDate: "",
    updatedDate: "",
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
    var curDate = new Date().toLocaleString('id-ID', {
      weekday: 'short', // "Sat"
      day: '2-digit', // "01"
      month: 'short', // "Jun"
      year: 'numeric', // "2019"
      hour: 'numeric',
      minute: 'numeric'
    })
    const data = {
      title: currentTutorial.title,
      description: currentTutorial.description,
      author: currentTutorial.author,
      bookCode: currentTutorial.bookCode,
      createdDate: currentTutorial.createdDate,
      updatedDate: curDate,
    };

    TutorialDataService.update(currentTutorial.key, data)
      .then(() => {
        setMessage("The book was updated successfully!");
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
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={currentTutorial.author}
                onChange={handleInputChange}
                placeholder="Author"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTutorial.description}
                onChange={handleInputChange}
                placeholder="Description"
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
