import './App.css';
import React from "react"
import Slider from "./Components/Slider";

function App() {
    const [state, setState] = React.useState([]);

    React.useEffect(()=>{
        fetch('https://api.github.com/search/repositories?q=created:%3E2023-08-22&sort=stars&order=desc&page=1')
            .then((res)=>res.json())
            .then(data =>{
                let arr = data?.items?.map((item)=> item.owner.avatar_url);
                setState(arr);
            })
    }, []);

  return (
    <div className="App">
        <Slider images={state} width={700} focusCenter={true}/>
    </div>
  );
}

export default App;
