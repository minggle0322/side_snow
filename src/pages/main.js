import React, {useEffect, useState} from 'react';
import axios from 'axios';  

function Home() {
  const [hello, setHello] = useState('')

   useEffect(() => {
       axios.get('http://3.39.173.116:8080/main')
       .then(response => setHello(response.data))
       .catch(error => console.log(error))
   }, []);

   return (
    <div>
      <h1>메인 페이지입니다! 🏠</h1>
      <p>React 앱의 첫 화면입니다.</p>
      백엔드에서 가져온 데이터입니다 : {hello}
    </div>
  );
};

export default Home;