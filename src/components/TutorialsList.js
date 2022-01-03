import React, { useMemo, useState } from "react";
import { useList } from "react-firebase-hooks/database";
import TutorialDataService from "../services/TutorialService";
import Tutorial from "./Tutorial";
import Modali, { useModali } from 'modali'

const TutorialsList = () => {
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [exampleModal, toggleExampleModal] = useModali()
  const [tutorials, loading, error] = useList(TutorialDataService.getAll());
  const [dataSource, setDataSource] = useState(null)
  const refreshList = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    const { title, description, published, bookCode, author, lastUpdated } = tutorial.val();
    setCurrentTutorial(null)
    setCurrentTutorial({
      key: tutorial.key,
      title,
      description,
      bookCode,
      author,
      published,
      lastUpdated
    });
    setCurrentIndex(index);
    toggleExampleModal(tutorial, index)
  };

  const setSearchParam = () => {
    let inputVal = document.getElementById("searchInput").value
    const filteredData = tutorials.filter(tutorial => tutorial?.val().title.toLowerCase().includes(inputVal.toLowerCase())
  || tutorial?.val().bookCode.toLowerCase().includes(inputVal.toLowerCase()))
    setDataSource(filteredData)
  }

  useMemo(() => {
    setDataSource(tutorials)
  }, [tutorials])


  return (
    <div className="list row">
      <div className="col-md-12">
        <div style={{ "display": "flex", "padding": "10px 10px 10px 0px" }}>
          <input
            id="searchInput"
            style={{ "float": "right", "width":"30%"}}
            placeholder="Search Title or Book Code ..."
            onChange={setSearchParam}
            defaultValue={""}
          >
          </input>
          {error && <strong> Error: {error}</strong>}
          {loading && <span> Loading...</span>}
        </div>

        <table style={{ "border": "1px solid black", "width": "100%" }}>
          <thead>
            <tr style={{ "border": "1px solid black" }}>
              <th>Book Code</th>
              <th style={{ "border": "1px solid black" }}>Title</th>
              <th>Author</th>
              <th style={{ "border": "1px solid black" }}>Desc</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {!loading && tutorials && dataSource ? (
              dataSource.map((tutorial, index) => (
                <tr
                  style={{ "border": "1px solid black", "cursor": "pointer" }}
                  className={+ (index === currentIndex ? "active" : "")}
                  onClick={() => setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  <td style={{ "border": "1px solid black" }}>
                    {tutorial.val().bookCode}
                  </td>
                  <td style={{ "border": "1px solid black" }}>
                    {tutorial.val().title}
                  </td>
                  <td style={{ "border": "1px solid black" }}>
                    {tutorial.val().author}
                  </td>
                  <td style={{ "border": "1px solid black" }}>
                    {tutorial.val().description}
                  </td>
                  <td style={{ "border": "1px solid black" }}>
                    {tutorial.val().lastUpdated}
                  </td>
                </tr>
              ))
            ) : ("No Data Recorded")
            }
          </tbody>
        </table>

        {/* <button 
          className="button-default m-3 btn btn-sm"
          onClick={toggleExampleModal}
        >
          open modal
        </button> */}
        <Modali.Modal {...exampleModal}>
          {/* <div>
          <p>Book Detail</p>
          <p>Book Code : {JSON.stringify(currentTutorial?.bookCode)}</p>
          <p>Title : {JSON.stringify(currentTutorial?.title)}</p>
          <p>Author : {JSON.stringify(currentTutorial?.author)}</p>
          <p>Description : {JSON.stringify(currentTutorial?.description)}</p>
        </div> */}
          <Tutorial tutorial={currentTutorial} refreshList={refreshList} />
        </Modali.Modal>
        {/* <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button> */}
        {/* <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button> */}
      </div>
      {/* <div className="col-md-6">
        {currentTutorial ? (
          <Tutorial tutorial={currentTutorial} refreshList={refreshList} />
        ) : (
          <div>
            <br />
            <p>Please click on a Book...</p>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default TutorialsList;
