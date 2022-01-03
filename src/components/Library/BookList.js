import React, { useMemo, useState } from "react";
import { useList } from "react-firebase-hooks/database";
import TutorialDataService from "../../services/TutorialService";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import Modali, { useModali } from 'modali'
import AddModal from "./AddModal";

const BookList = () => {
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [addModal, toggleAddModal] = useModali({
    animated: true,
    title: 'Add Book',
    message: 'Adding Book...',
  })
  const [editModal, toggleEditModal] = useModali({
    animated: true,
    title: 'Edit Book',
    message: 'Saving Book...',
  })
  const [delModal, toggleDelModal] = useModali({
    animated: true,
    title: 'Delete Book',
    message: 'Deleting this book will be permanent.',
  })
  const [tutorials, loading, error] = useList(TutorialDataService.getAll());
  const [dataSource, setDataSource] = useState(null)
  const refreshList = () => {
    setCurrentTutorial(null);
  };

  const editBook = (tutorial, index) => {
    const { title, description, published, bookCode, author, createdDate, updatedDate } = tutorial.val();
    setCurrentTutorial(null)
    setCurrentTutorial({
      key: tutorial.key,
      title,
      description,
      bookCode,
      author,
      published,
      createdDate,
      updatedDate,
    });
    toggleEditModal(tutorial, index)
  };

  const deleteBook = (tutorial, index) => {
    const { title, description, published, bookCode, author, createdDate, updatedDate } = tutorial.val();
    setCurrentTutorial(null)
    setCurrentTutorial({
      key: tutorial.key,
      title,
      description,
      bookCode,
      author,
      published,
      createdDate,
      updatedDate,
    });
    toggleDelModal(tutorial, index)
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
    <>
      <div class="overflow-x-auto">
        <div class="min-w-screen bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div class="w-full lg:w-5/6">
            <div style={{ "padding": "10px 0px 20px 0px" }}>
              
              <input
                id="searchInput"
                style={{ "float": "left", "width": "25%" }}
                class="w-full pl-2 pr-4 py-2 rounded-lg shadow focus:shadow-outline text-gray-600 font-medium"
                placeholder="Search Title or Book Code ..."
                onChange={setSearchParam}
                defaultValue={""}
              >
              </input>
              <button
               style={{ "float": "right", "width": "10%" }}
              class="w-full py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-green-500 hover:bg-green-600 active:bg-green-700 focus:ring-green-300"
              onClick={toggleAddModal}
            >
              + Add Book
              </button>
              {error && <strong> Error: {error}</strong>}
              {loading && <span> Loading...</span>}
            </div>
            <div class="bg-white shadow-md rounded my-6">
              <table class="min-w-max w-full table-auto">
                <thead>
                  <tr class="bg-gray-200 text-gray-600 text-sm leading-normal">
                    <th class="py-3 px-6 text-left">Book Code</th>
                    <th class="py-3 px-6 text-left">Title</th>
                    <th class="py-3 px-6 text-left">Author</th>
                    <th class="py-3 px-6 text-left">Desc</th>
                    <th class="py-3 px-6 text-left">Created</th>
                    <th class="py-3 px-6 text-left">Last Updated</th>
                    <th class="py-3 px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light">
                  {!loading && dataSource.length !== 0 ? (
                    dataSource.map((tutorial, index) => (
                      <tr
                        class="border-b border-gray-200 hover:bg-blue-100"
                        key={index}
                      >
                        <td class="py-3 px-6 text-left">
                          <div class="flex items-center">
                            <span class="font-medium">{tutorial.val().bookCode}</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-left">
                          <div class="flex items-center">
                            <span class="font-medium">{tutorial.val().title}</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-left">
                          <div class="flex items-center">
                            <span class="font-medium">{tutorial.val().author}</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-left">
                          <div class="flex items-center">
                            <span class="font-medium">{tutorial.val().description}</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-left">
                          <div class="flex items-center">
                            <span class="font-medium">{tutorial.val().createdDate}</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-left">
                          <div class="flex items-center">
                            <span class="font-medium">{tutorial.val().updatedDate}</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-center">
                          <div class="flex item-center justify-center">
                            <button class="w-5 mr-2 transform hover:text-green-500 hover:scale-110"
                              onClick={() => editBook(tutorial, index)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button class="w-5 mr-2 transform hover:text-red-500 hover:scale-110"
                              onClick={() => deleteBook(tutorial, index)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) :
                    <tr class="border-b border-gray-200">
                      <p class="py-3 px-6 text-start ">No Data Recorded 😥</p>
                    </tr>
                  }
                </tbody>
              </table>
              <Modali.Modal {...addModal}>
                <AddModal tutorial={currentTutorial} refreshList={refreshList} />
              </Modali.Modal>
              <Modali.Modal {...editModal}>
                <EditModal tutorial={currentTutorial} refreshList={refreshList} />
              </Modali.Modal>
              <Modali.Modal {...delModal}>
                <DeleteModal tutorial={currentTutorial} refreshList={refreshList} />
              </Modali.Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookList;
