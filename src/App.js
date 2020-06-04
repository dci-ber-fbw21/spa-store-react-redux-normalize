import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Pages
import BlogOverview from './pages/blog-overview';
import BlogDetails from './pages/blog-details';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/blog/:id" component={BlogDetails} />

          <Route exact path="/" component={BlogOverview} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
