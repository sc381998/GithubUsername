import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { useHistory, Link } from "react-router-dom";

const Followers = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  let history = useHistory();
  const handleFollowers = async () => {
    setLoading(true);
    const urlFollower = `https://api.github.com/users${props.match.url}`;
    const res = await fetch(urlFollower);
    const result = await res.json();
    setLoading(false);
    setData(result);
  };
  console.log(data);
  useEffect(() => {
    handleFollowers();
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
  if (data.length === 0) {
    return (
      <main>
        <h1>{props.match.params.username} don’t have any followers yet.</h1>
        <button className="btn-light" onClick={() => history.goBack()}>
          Back
        </button>
      </main>
    );
  }

  return (
    <>
      <main>
        <section className="container">
          <div className="title">
            <h2>{props.match.params.username} Followers</h2>
            <div className="underline"></div>
          </div>

          <button className="btn-light" onClick={() => history.goBack()}>
            Back
          </button>
          <Link to="/">
            <button className="btn"> Go to HomePage</button>
          </Link>
          <section className="review">
            {data.map((ele) => (
              <article className="repo" key={ele.id}>
                <img src={ele.avatar_url} alt={ele.login} />
                <div>
                  <h4>{ele.login}</h4>
                  <p>{ele.type}</p>
                </div>
              </article>
            ))}
          </section>
        </section>
      </main>
    </>
  );
};

export default Followers;
