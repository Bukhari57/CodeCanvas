function Greeting({ name, age }) {
  return (
    <div>
      <h2>Hi, {name}!</h2>
      <p>You are {age} years old.</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Greeting name="Ali" age={25} />
      <Greeting name="Sara" age={30} />
      <Greeting name="Ahmed" age={22} />
    </div>
  );
}

export default App;