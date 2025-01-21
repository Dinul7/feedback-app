import { createContext, useState, useEffect } from "react";

// Api
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  // state
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedBack] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch("/feedback?_sort=id&_order=desc");
    const data = await response.json();
    setFeedBack(data);
    setIsLoading(false);
  };

  //Update feedback item
  const updateFeedback = (id, updItem) => {
    setFeedBack(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };

  //Add feedback
  const addFeedBack = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedBack([newFeedback, ...feedback]);
  };

  //Delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedBack(feedback.filter((item) => item.id !== id));
    }
  };

  //Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedBack,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
