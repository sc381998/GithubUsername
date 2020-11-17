import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { useHistory, Link } from "react-router-dom";

function Repos(props) {
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);
  let history = useHistory();

  const fetchRepos = async () => {
    setLoading(true);

    const url = `https://api.github.com/users/${props.match.params.username}/repos`;
    const response = await fetch(url);
    const repositories = await response.json();

    setLoading(false);
    setRepos(repositories);
  };

  const handleClick = (name) => {
    props.history.push(`/repos/${props.match.params.username}/${name}`);
  };

  const handleFollowers = async () => {
    const urlFollower = `https://api.github.com/users/${props.match.params.username}/followers`;
    const res = await fetch(urlFollower);
    const follower = await res.json();
    setFollowers(follower);
    console.log(follower);
    // props.history.push(``);
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  if (loading) {
    return (
      <>
        <main>
          <Loading />
        </main>
      </>
    );
  }
  if (repos.length === 0) {
    return (
      <main>
        <h1>Error 404! Not Found</h1>
        <button className="btn-light" onClick={() => history.goBack()}>
          Back
        </button>
      </main>
    );
  }
  console.log(props);
  return (
    <>
      <main>
        <section className="container">
          <div className="title">
            <h2>{props.match.params.username} Repositories</h2>
            <div className="underline"></div>
          </div>

          <button className="btn-light" onClick={() => history.goBack()}>
            Back
          </button>
          <button className="btn" onClick={handleFollowers} disabled>
            Followers
          </button>
          <section className="review">
            {repos.map((repo) => (
              <article
                className="repo"
                key={repo.id}
                onClick={() => handleClick(repo.name)}
              >
                <img src={repo.owner.avatar_url} alt={repo.name} />
                <div>
                  <h4>{repo.name}</h4>
                  <p>{repo.description}</p>
                </div>
              </article>
            ))}
          </section>
        </section>
      </main>
    </>
  );
}

export default Repos;
