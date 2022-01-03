import React, { useState } from "react";
import TutorialDataService from "../../services/BookIOService";

const DeleteModal = (props) => {
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

    const deleteTutorial = () => {
        var confirm = window.confirm("Really want to delete?")
        if (confirm) {
            TutorialDataService.remove(currentTutorial.key)
                .then(() => {
                    window.location.reload()
                    props.refreshList();
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        else {
        }
    };

    return (
        <div>
            {/* <h1 class=" p-1 absolute">Book Detail</h1> */}
            {currentTutorial ? (
                
                <div
                    class="flex flex-col w-full mx-auto p-4 border border-gray-200 bg-white shadow"
                >
                    <p class="flex flex-col justify-center items-center pb-3 font-semibold">Really want to delete?</p>
                    
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
                readOnly
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
                readOnly
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={currentTutorial.entryDate}
                onChange={handleInputChange}
                placeholder="Author"
                readOnly
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={currentTutorial.entryTotal}
                onChange={handleInputChange}
                placeholder="Author"
                readOnly
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
                readOnly
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTutorial.complete? "Complete" : "Incomplete"}
                onChange={handleInputChange}
                placeholder="Description"
                readOnly
              />
            </div>
          </form>
                    <div style={{ "text-align": "right" }}>

                        <button
                            class="px-3 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-red-300"
                            onClick={deleteTutorial}>
                            Delete
                        </button>
                        {` `}
                    </div>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Tutorial...</p>
                </div>
            )}
        </div>
    );
};

export default DeleteModal;
