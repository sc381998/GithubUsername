import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import RepoDetails from "./components/RepoDetails";
import Repos from "./components/Repos";
import Followers from "./components/Followers";

function App() {
  return (
    <Switch>
      <Route exact path="/repos/:username" component={Repos} />
      <Route path="/repos/:username/:reponame" component={RepoDetails} />
      <Route path="/:username/followers" component={Followers} />
      <Route path="/" component={Home} />
    </Switch>
  );
}

export default App;
