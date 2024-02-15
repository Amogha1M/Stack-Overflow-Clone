import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import moment from "moment";
import copy from "copy-to-clipboard";


import upvotes from "../../assets/sort-up.svg";
import downvotes from "../../assets/sort-down.svg";
import "./Question.css";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";
import { postAnswer, deleteQuestion, voteQuestion } from "../../actions/question";

const QuestionsDetails = () => {
  const { id } = useParams();
  console.log(id);

  // The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>. Child routes inherit all params from their parent routes.
  const questionList = useSelector((state) => state.questionReducer);

  //two below const will messup with our database
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const [Answer, setAnswer] = useState("");

  const handlePostAns = (e, answerLength) => {
    e.preventDefault();

    if (User === null) {
      alert("Login or signup to answer a question...");
      Navigate("/Auth");
    } else {
      if (Answer === "") alert("Enter an asnwer before submitting...");
      else {
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength + 1,
            answerBody: Answer,
            userAnswered: User.result.name,
            userId: User.result._id,
          })
        );
        // console.log(postAnswer, "it's post answer")
        setAnswer("");
      }
    }
  };

  const location = useLocation();

  const url = "http://localhost:3000";

  const handlShare = () => {
    copy(url + location.pathname);
    alert("Copied url: ", +url + location.pathname);
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id, Navigate));
  };

  const handleUpvote = () => {
    dispatch(voteQuestion(id, 'upVote', User.result._id))
  }

  const handleDownvote = () => {
    dispatch(voteQuestion(id, 'downVote', User.result._id))
  }

  return (
    <div className="question-details-page">
      {questionList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        src={upvotes}
                        alt=""
                        width="18"
                        className="votes-icon" onClick={handleUpvote}
                      />
                      <p>{question.upVotes.length - question.downVotes.length}</p>
                      <img
                        src={downvotes}
                        alt=""
                        width="18"
                        className="votes-icon" onClick={handleDownvote}
                      />
                    </div>

                    
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question.questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>


                      <div className="question-actions-user">
                        <div>
                          <button type="button" onClick={handlShare}>
                            Share
                          </button>

                          {User.result._id === question.userId && (
                            <button type="button" onClick={handleDelete}>
                              Delete
                            </button>
                          )}
                        </div>

                        <div>
                          <p>asked on {moment(question.askedOn).fromNow()} </p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                            style={{ color: "#00086d8" }}
                          >
                            <Avatar
                              backgroundColor="orange"
                              px="8px"
                              py="8px"
                              border-borderRadius="4px"
                            >
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>

                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.answer.length !== 0 && (
                  <section>
                    <h3>{question.answer.length} Answers</h3>
                    <DisplayAnswer
                      key={question._id}
                      question={question}
                      handlShare={handlShare}
                    />
                  </section>
                )}
                <section className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handlePostAns(e, question.answer.length);
                    }}
                  >
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <br />
                    <input
                      type="submit"
                      value="Post Your Answer"
                      className="post-ans-btn"
                    />
                  </form>
                  <p>
                    Browse other question tages
                    {question.questionTags.map((tag) => (
                      <Link to="/Tags" key={tag} className="ans-tags">
                        {tag}
                      </Link>
                    ))}
                    or
                    <Link
                      to="/AskQuestions"
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      ask your own question.
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default QuestionsDetails;
