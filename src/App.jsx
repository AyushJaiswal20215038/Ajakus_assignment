import "./App.css";
import UserList from "./components/UserList";

function App() {
  return (
    <>
      <div className="container">
        <UserList />
      </div>
      <p style={{ color: "orange" }}>
        Warning : Do not try to update data that was not previously present,
        since adding new data does not update the data in API database.
      </p>
    </>
  );
}

export default App;
