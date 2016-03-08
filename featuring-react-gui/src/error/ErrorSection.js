import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';


function resolve(err) {
  switch (err && err.reason) {
    case "offline":
      return {
        title: "Impossible to reach the server",
        messages: [
          "Failed to reach the server while trying to gather the latest data",
          "Please contact the system administrator, or try again in a few minutes"
        ]
      };
  }
  return {
    title: "An unexpected error was detected",
    messages: [
      "You might just have found a bug with a bounty on it.",
      "Contact the local bounty center"
    ]
  };
}

export function ErrorSection({errors}) {
  const origins = (errors && Object.keys(errors)) || [];
  const first = (origins.length || undefined) && errors[origins[0]];
  const error = resolve(first);
  return (
    <section className="main-error">
      <div className="alert alert-danger">
        <h4>{error && error.title}</h4>
        {
          error && error.messages.map((message) =>
            <p key={error && error.messages.indexOf(message)}>{message}</p>)
        }
      </div>
      <Link className="btn btn-default" to="/">TRY AGAIN</Link>
    </section>
  );
}


export default connect(
  (state) => ({
    errors: state.error
  }))(ErrorSection);
