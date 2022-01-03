import React, { useState } from "react";
import TutorialDataService from "../services/TutorialService";
// import { useList } from "react-firebase-hooks/database";

const Tutorial = (props) => {
  const initialTutorialState = {
    key: null,
    title: "",
    description: "",
    published: false,
    author: "",
    bookCode: "",
  };

  // const [tutorials, loading] = useList(TutorialDataService.getAll());
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");
  // const [bookCodeNum, setBookCodeNum] = useState(0)
  // const [titleNum, setTitleNum] = useState(0)
  // const [bookCodeView, setBookCodeView] = useState(null)
  // const [titleView, setTitleView] = useState(null)


  const { tutorial } = props;
  if (currentTutorial?.key !== tutorial.key) {
    setCurrentTutorial(null)
    setCurrentTutorial(tutorial);
    setMessage("");
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
    // setSearchParam()
  };

  // const setSearchParam = () => {
  //   let inputVal = document.getElementById("bookCode").value
  //   let inputValTitle = document.getElementById("title").value
    
  //   const filteredData = tutorials.filter(tutorial => tutorial?.val().bookCode.toLowerCase().includes(inputVal.toLowerCase()))
  //   const filteredData2 = tutorials.filter(tutorial => tutorial?.val().title.toLowerCase().includes(inputValTitle.toLowerCase()))

  //   setBookCodeNum(filteredData.length)
  //   setBookCodeView(filteredData.map(data => data?.val().bookCode))

  //   setTitleNum(filteredData2.length)
  //   setTitleView(filteredData2.map(data => data?.val().title))
  // }


  const updateTutorial = () => {
    const data = {
      title: currentTutorial.title,
      description: currentTutorial.description,
      author: currentTutorial.author,
      bookCode: currentTutorial.bookCode,
    };

    TutorialDataService.update(currentTutorial.key, data)
      .then(() => {
        setMessage("The tutorial was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    var confirm = window.confirm("Really want to delete?")
    if (confirm){
      TutorialDataService.remove(currentTutorial.key)
      .then(() => {
        props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
    }
    else{
    }
  };

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Book Detail</h4>
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

          {/* {currentTutorial.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )} */}
          <div style={{"text-align" : "right"}}>
          <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
            Delete
          </button>
          <button
            type="submit"
            className="badge badge-success"
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
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
