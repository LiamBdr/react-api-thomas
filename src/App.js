import './App.css';

export function RequireAuth({ children }) {
    // Get user from local storage
    const user = JSON.parse(localStorage.getItem('user'));

    if (user === null) {
        //redirect to login
    } else {
        return children;
    }
}

function App() {

//Navigation dans requireAuth
  return (
      //TODO ROUTER
      <div></div>
  );
}

export default App;
