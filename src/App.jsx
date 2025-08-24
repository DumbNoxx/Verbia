import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import { useRef } from 'react'

const url = "https://dummyjson.com/quotes"


function App() {
  const [text, setText] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [author, setAuthor] = useState(null);
  const refQuote = useRef(null);
  const refAuthor = useRef(null);
  const fetchQuote = async () => {
    return await fetch(url).then(res => res.json())
  }

  const getData = async (id) => {
    const data = await fetchQuote();
    setText(data.quotes[id].quote);
    setAuthor(data.quotes[id].author);
    refAuthor.current.classList.add("new-quote")
    refQuote.current.classList.add("new-quote")
  }

  const changeQuote = () => {
    const num = Math.floor(Math.random() * 30)
    getData(num)
    if (!(refQuote.current && refAuthor.current)) return;
    refAuthor.current.classList.remove("new-quote")
    refQuote.current.classList.remove("new-quote")
  };


  useEffect(() => {
    document.documentElement.setAttribute("theme", theme)
  }, [theme])

  useEffect(() => {
    changeQuote()
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  return (
    <>
      <main className='container'>
        <div id="quote-box">
          <p id="text" ref={refQuote}>"{text?.length > 150 ? text?.slice(0, 150) + '...' : text}"</p>
          <p id="author" ref={refAuthor}>- <span>{author}</span></p>
        </div>
        <div className="container-nav">
          <button onClick={changeQuote} id="new-quote">New Quote</button>
          <a href={`https://twitter.com/intent/tweet?text=${text}`} target='_blank' id="tweet-quote">Tweet Quote</a>
        </div>
        <button onClick={toggleTheme} className="toggle-button">{theme === "dark" ? "light" : "dark"}</button>
        <footer>
          <p>
            © 2025 Dylan. MIT license
          </p>
          <p>
            Designed and developed with ♥
          </p>
        </footer>
      </main>
    </>
  )
}

export default App
