import React from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "../../components/Avatar/Avatar";
import { deleteAnswer } from "../../actions/question"

const DisplayAnswer = ({ question, handlShare }) => {
  const User = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const { id } = useParams();


  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswers-1))
  }
  return (
    <div>
      {question.answer.map((ans) => (
        <div className="question-actions-user" key={ans._id}>
          <div>
            <p>{ans.answerBody}</p>
            <div className="display-anss">
              <button type="button" onClick={handlShare}>
                Share
              </button>

              {User?.result?._id === ans?.userId && (
                
                <button type="button" onClick={()=> {
                  handleDelete(ans._id, question.noOfAnswers)
                }}>
                  Delete
                </button>
              )}
            </div>
          </div>
          <div>
            <p>Answered {moment(ans.userAnsweredOn).fromNow()} </p>
            <Link
              to={`/Users/${ans.userId}`}
              className="user-link"
              style={{ color: "#00086d8" }}
            >
              <Avatar backgroundColor="green" px="8px" py="8px">
                {ans.userAnswered.charAt(0).toUpperCase()}
              </Avatar>

              <div>{ans.userAnswered}</div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAnswer;
