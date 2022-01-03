import React, { useState } from "react";
import TutorialDataService from "../services/TutorialService";
import { useList } from "react-firebase-hooks/database";

const AddTutorial = () => {
  const initialTutorialState = {
    title: "",
    description: "",
    published: false,
    author: "",
    bookCode: "",
    lastUpdated: ""
  };
  const [tutorials, loading] = useList(TutorialDataService.getAll());
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);
  const [bookCodeNum, setBookCodeNum] = useState(0)
  const [titleNum, setTitleNum] = useState(0)
  const [bookCodeView, setBookCodeView] = useState(null)
  const [titleView, setTitleView] = useState(null)

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
    setSearchParam()
  };

  const setSearchParam = () => {
    let inputVal = document.getElementById("bookCode").value
    let inputValTitle = document.getElementById("title").value
    
    const filteredData = tutorials.filter(tutorial => tutorial?.val().bookCode.toLowerCase().includes(inputVal.toLowerCase()))
    const filteredData2 = tutorials.filter(tutorial => tutorial?.val().title.toLowerCase().includes(inputValTitle.toLowerCase()))

    setBookCodeNum(filteredData.length)
    setBookCodeView(filteredData.map(data => data?.val().bookCode))

    setTitleNum(filteredData2.length)
    setTitleView(filteredData2.map(data => data?.val().title))
  }

  const saveTutorial = () => {
    var curDate = new Date().toLocaleString() + ""
    var data = {
      title: tutorial.title,
      description: tutorial.description,
      published: false,
      author: tutorial.author,
      bookCode: tutorial.bookCode,
      lastUpdated: curDate
    };

    TutorialDataService.create(data)
      .then(() => {
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">

            <label htmlFor="title">Book Code</label>
            <input
              type="text"
              className="form-control"
              id="bookCode"
              required
              value={tutorial.bookCode}
              onChange={handleInputChange}
              name="bookCode"
            />
            <div>{tutorial.bookCode && !loading
              ? bookCodeNum === 0
                ? <>Data bisa digunakan <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="green" height={"20px"}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg></>
                : <>{bookCodeNum} data sudah ada<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red" height={"18px"}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg></>
              : <></>}</div>
            <div>{bookCodeNum < 6 && bookCodeNum ? " (" + bookCodeView + ")" : <></>}</div>
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
            <div>{loading?"loading..." : <></>}</div>
            <div>{tutorial.title && !loading
              ? titleNum === 0
                ? <>Data bisa digunakan <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="green" height={"20px"}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg></>
                :<>{titleNum} data sudah ada<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red" height={"18px"}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg></>
              : <></>}</div>
            <div>{titleNum < 6 && titleNum ? " (" + titleView + ")" : <></>}</div>
          </div>
          <div className="form-group">
            <label htmlFor="title">Author</label>
            <input
              type="text"
              className="form-control"
              id="author"
              required
              value={tutorial.author}
              onChange={handleInputChange}
              name="author"
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

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
