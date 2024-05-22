import { useEffect, useState } from 'react';
import axios from 'axios';
import Books from './Books/Books';
import ModalHint from './ModalHint/ModalHint';
import "./SavedBooks.css";
function SavedBooks() {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching saved books:', error);
      });
  }, []);

  return (
    <>
        <button className="hint" onClick={()=> setIsModalOpen(true)}>?</button>
      {isModalOpen && <ModalHint closeModal={() => setIsModalOpen(false)} >
        <div>
        <p>Це - ваш список книг</p>
        <p>Щоб видалити книгу, натисніть "Delete"</p>
        <p>Можна змінювати кількість прочитаних вами сторінок,</p>
        <p>Для цього натисніть на Pages, введіть у поле сторінки, та натисніть на Pages ще раз</p>
        </div>
        </ModalHint>}
      <h1>YOUR READING LIST</h1>
      <section className='books-panel'>
        <Books books={books} typeOfListSearch={false} setBooks={setBooks} className="list-books"/>
      </section>
    </>
  );
}

export default SavedBooks;
