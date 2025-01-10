// Api
import { v4 as uuidv4 } from "uuid";

// React properties
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import { useState } from "react";

// Components
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackData from "./data/FeedbackData";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";

import Card from "./components/shared/Card";
import Post from "./components/Post";

function App() {
  const [feedback, setFeedBack] = useState(FeedbackData);
  const addFeedBack = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedBack([newFeedback, ...feedback]);
  };
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedBack(feedback.filter((item) => item.id !== id));
    }
  };
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <FeedbackForm handleAdd={addFeedBack} />
                <FeedbackStats feedback={feedback} />
                <FeedbackList
                  feedback={feedback}
                  handleDelete={deleteFeedback}
                />
              </>
            }
          ></Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/post/*" element={<Post />} />
        </Routes>

        {/* <Card>
          <NavLink to="/" activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/about" activeClassName="active">
            HAbout
          </NavLink>
        </Card> */}
      </div>
      <AboutIconLink />
    </Router>
  );
}

export default App;

//learning things
// function App() {
//   const title = "Blog post";
//   const body = "This is my blog post";
//   const comments = [
//     { id: 1, text: "Comment one" },
//     { id: 2, text: "Comment two" },
//     { id: 3, text: "Comment three" },
//   ];

//   const loading = false;

//   const showComments = false;

//   if (loading) return <h1>Loading...</h1>;

//   const commentBlock = (
//     <div className="comments">
//       <h3>Comments ({comments.length})</h3>
//       <ul>
//         {comments.map((comment, index) => (
//           <li key={index}>{comment.text}</li>
//         ))}
//       </ul>
//     </div>
//   );

//   return (
//     //fragment <></>
//     <div className="container">
//       <h1>{title.toUpperCase()}</h1>
//       <p>{body}</p>

//       {showComments && commentBlock}
//     </div>
//   );
// }
