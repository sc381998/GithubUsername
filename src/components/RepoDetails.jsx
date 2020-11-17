import axios from "axios";
import React, { useEffect } from "react";
import { markdown } from "markdown";
import { useHistory, Link } from "react-router-dom";

const RepoDetails = (props) => {
  const [data, setData] = React.useState({});
  let history = useHistory();

  useEffect(() => {
    async function getData() {
      const { username, reponame } = props.match.params;
      const { data } = await axios.get(
        `https://api.github.com/repos/${username}/${reponame}/readme`
      );
      console.log(data);
      setData(data);
    }

    getData();
  }, []);

  return (
    <main>
      {data.content ? (
        <div
          dangerouslySetInnerHTML={{
            __html: markdown.toHTML(window.atob(data.content))
          }}
        ></div>
      ) : (
        <h3>No content Found! </h3>
      )}

      <button className="btn-light" onClick={() => history.goBack()}>
        Back
      </button>
      <Link to="/">
        <button className="btn"> Go to HomePage</button>
      </Link>
    </main>
  );
};

export default RepoDetails;
