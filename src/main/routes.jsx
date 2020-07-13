import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Todo from '../todo/todo'
import About from '../about/about'


export default function App() {
  return (
    <Router>
      <div>
        <Menu/>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <div className='container'>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Todo />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function Menu() {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark' >
        <div className='container'>
            <div className='navbar-header'>
                <a className='navbar-brand' href='/todos'>
                    <svg width="1em" height=".8em" viewBox="0 0 16 16" className="bi bi-calendar" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm1-3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z"/>
                        <path fillRule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5z"/>
                    </svg> TodoApp
                </a>
            </div>

            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to='/todos'>Tarefas <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/about'>Sobre</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);
}

