import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';


function resolve(err) {

  switch (err) {
    case "offline":
      return {
        title: "Impossible to reach the server",
        messages: [
          "Failed to reach the server while trying to gather the latest data",
          "Please contact the system administrator, or try again in a few minutes"
        ]
      };

    default:
      return {
        title: "An unexpected error was detected",
        messages: [
          "You might just have found a bug with a bounty on it.",
          "Contact the local bounty center"
        ]
      };
  }
}

export function ErrorSection({err}) {
  const error = resolve(err);
  return (
    <section className="main-error">
      <div className="alert alert-danger">
        <h4>{error.title}</h4>
        {error.messages.map((message) => <p key={error.messages.indexOf(message)}>{message}</p>)}
      </div>
      <Link className="btn btn-default" to="/features">TRY AGAIN</Link>
    </section>
  );
}


export default connect(
  (state) => ({
    err: state.error
  }))(ErrorSection);
