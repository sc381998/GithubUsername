import React from "react";

const Home = (props) => {
  const handleClick = () => {
    props.history.push("/repos/" + username);
  };

  const [username, setUsername] = React.useState("");
  return (
    <>
      <main>
        <section className="container">
          <div className="form">
            <input
              name="username"
              className="username"
              value={username}
              placeholder="Search for github username"
              onChange={(event) => setUsername(event.target.value)}
            />
            <button onClick={handleClick} className="btn-search">
              Search
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
