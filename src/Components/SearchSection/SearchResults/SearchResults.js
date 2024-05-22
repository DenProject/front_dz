import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { EnteredFieldsContext } from "../../../Contexts/EnteredFieldsContext";
import "./SearchResults.css";
import Books from "../../Books/Books";
const SearchResults = () => {
  const [books, setBooks] = useState([]);
  const [messageOnEntry, setMessageOnEntry] = useState("Perform Search");
  const {
    enteredTitle,
    enteredAuthor,
    searched,
    setSearched,
    rateValue,
    subjectValue,
    setSubjectValue,
    setEnteredAuthor,
    setEnteredTitle,
    showValue
  } = useContext(EnteredFieldsContext);

  async function getBooks() {
    let params =
      `"&limit=${showValue}&fields=cover_i,isbn,key,cover_image,title,subject,author_name,ratings_average,language,number_of_pages_median,publish_year`;
    let url =
      `https://openlibrary.org/search.json?title="${enteredTitle ?? ""}"&author="${enteredAuthor ?? ""}"&subject="${subjectValue ?? ""}` + params;
    try {
      const response = await axios.get(url);
      const data = response.data;
      const books = data.docs.map((book) => ({
        ...book,
        cover_image: book.isbn
          ? `http://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`
          : `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
        pages_read: 0
      }));
      const filteredBooks = books.filter(
        (book) =>
          parseFloat(book.ratings_average) >= rateValue || !book.ratings_average
      );
      setBooks(filteredBooks);
      if (books.length === 0) {
        setMessageOnEntry("Книг не знайдено");
      }
      console.log(url);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }
  useEffect(() => {
    if (searched) {
      getBooks();
      if (enteredTitle) setEnteredTitle(null);
      if (enteredAuthor) setEnteredAuthor(null);
      if (subjectValue) setSubjectValue(null);
      setSearched(searched => !searched);
    }
  });
  return (
    <section className="list-search">
      {books.length > 0 ? (
        <Books books={books} typeOfListSearch={true} setBooks={setBooks} className="list-books listtwo"/>
      ) : (
        <p className="messageOnEntry">{messageOnEntry}</p>
      )}
    </section>
  );
};

export default SearchResults;
