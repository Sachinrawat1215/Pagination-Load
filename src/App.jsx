import React, { useEffect, useState, useRef } from 'react';
import './app.css';

const App = () => {
  const scrollContainer = useRef();
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const pageNo = 1;
  const limit = 30;

  const handleScroll = (event) => {
    const scrollTop = event.currentTarget.scrollTop;
    const totalScrollHeight = event.currentTarget.scrollHeight;
    const divHeight = scrollContainer.current.clientHeight;

    if (scrollTop + divHeight + 5 > totalScrollHeight && !loading) {
      (async () => {
        const pageNo = Number(window.localStorage.getItem('pageNo')) + 1;

        window.localStorage.setItem('pageNo', pageNo);

        setLoading(true)
        const data = await fetch(`/get?limit=${limit}&page=${pageNo}`);
        const { cardData } = await data.json();
        setAllData([...allData, ...cardData]);
        setLoading(false);
      })();
    }
  }

  useEffect(() => {
    (async () => {
      window.localStorage.setItem('pageNo', pageNo);
      window.localStorage.setItem('cardLimit', limit);

      const data = await fetch(`/get?limit=${limit}&page=${pageNo}`);
      const jsonData = await data.json();
      setAllData(jsonData.cardData);
    })();
  }, []);

  return (
    <div>
      <div className='container' onScroll={handleScroll} ref={scrollContainer} id="myDiv">
        {allData && allData.map((element, index) => {
          return (
            <div key={index} className='card-container'>
              <img src={element.url} alt="title" loading='lazy' />
              <p><span>{element.id}</span> {element.title}</p>
            </div>
          )
        })}
      </div>
      <h2>Loading..</h2>
    </div>
  )
}

export default App;