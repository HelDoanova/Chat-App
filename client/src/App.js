import './App.css';
import { Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="chats" element={<ChatPage />} />
        {/*<Route path="/chats" component={Chatpage} />*/}
      </Routes>
    </div>
  );
}

export default App;
