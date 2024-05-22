import axios from "axios";
import { useState } from "react";
import "./books.css"
export default function Books({ books, setBooks, typeOfListSearch, className }) {
  const [clicked, setClicked] = useState(false);
  const [isEditing, setIsEditing] = useState({});
  const [pageValue, setPageValue] = useState({});
  
  function onCreate(book) {
    axios
      .get("http://localhost:3001/books?key=" + book.key)
      .then((response) => {
        if (response.data.length > 0) {
          alert("Дана книга вже є у списку");
        } else {
          setClicked((prevState) => ({ ...prevState, [book.key]: true }));
          axios
            .post("http://localhost:3001/books", book)
            .catch((error) => {
              console.error("Error adding book:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking book:", error);
      });
  }

  function onDelete(book) {
    try {
      axios.delete("http://localhost:3001/books/" + book.id);
      let newBooks = books.filter((item) => item !== book);
      console.log(newBooks);
      setBooks(newBooks);
      console.log("Книга успішно видалена.");
    } catch (error) {
      console.error("Помилка видалення книги:", error);
    }
  }

  function onPress(bookKey) {
    setIsEditing((prevIsEditing) => ({
      ...prevIsEditing,
      [bookKey]: !prevIsEditing[bookKey],
    }));
    
  }

  function onPageChange(event, bookKey) {
    const newPageValue = event.target.value;
    if(Number.isFinite(Number(newPageValue))){
      setPageValue((prevPageValue) => ({
        ...prevPageValue,
        [bookKey]: newPageValue,
      }));  
      const bookToUpdate = books.find((book) => book.key === bookKey);
      bookToUpdate.pages_read = newPageValue;
      try {
        axios.put(`http://localhost:3001/books/${bookToUpdate.id}`, bookToUpdate);
        console.log('Book updated successfully');
      } catch (error) {
        console.error('Error updating book:', error);
      }
    }else{
      alert("Enter a number")
    }
    
  }
  return (
    <>
      <ul className={className}>
        {books.map((book) => (
          <li key={book.key}>
            <div>
              <img src={book.cover_image} alt={book.title} />
              <p className="title-name">{book.title ?? ""}</p>
              {typeOfListSearch ? (
                <div>
                  <p className="subjectText">
                    Subject: {book.subject === undefined ? "" : book.subject[0]}
                  </p>
                  <p>
                    Language:{" "}
                    {book.language
                      ? book.language
                          .slice(0, 4)
                          .map((elem) => <span key={elem}> {elem} </span>) ?? ""
                      : " "}{" "}
                  </p>
                  <p>
                    {book.ratings_average
                      ? "Rating: " + book.ratings_average
                      : "Rating: no info"}
                  </p>
                </div>
              ) : null}
              <p>Author: {book.author_name[0] ?? ""}</p>
              <p>Publish Date: {book.publish_year[0] ?? ""}</p>
              {typeOfListSearch ? (
                <p>Pages: {book.number_of_pages_median}</p>
              ) : (
                <p>
                  <span onClick={() => onPress(book.key)}>Pages:</span>{" "}
                  {isEditing[book.key] ? (
                    <input className="pagesField"
                      type="text"
                      placeholder="?"
                      onChange={(event)=>onPageChange(event, book.key)}
                      value={pageValue[book.key] || ""}
                      size={2}
                    ></input>
                  ) : null}{" "}
                  <span onClick={() => onPress(book.key)}>
                  {isEditing[book.key] ? "" : book.pages_read/*pageValue[book.key]*/} / {" "}
                {book.number_of_pages_median ?? "No info"}
                  </span>
                </p>
              )}
              <p></p>
              {typeOfListSearch ? (
                <button
                  className="buttonCaseAdd"
                  onClick={() => onCreate(book)}
                  disabled={clicked[book.key]}
                >
                  Add
                </button>
              ) : (
                
                <button
                  className="buttonCaseDelete"
                  onClick={() => onDelete(book)}
                >
                  DELETE
                </button>
                
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
