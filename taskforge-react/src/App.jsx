function Hello(props){
return(

<h1>Hello...kesy ho,{props.name}</h1>

);
}

function App() {


  return (
    <div>
     <Hello name="asad"/>
     <Hello name="ali"/>
     <Hello name="zain"/>
    </div>
  );
}

export default App;