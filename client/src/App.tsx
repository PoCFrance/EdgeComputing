import React from 'react';
import { PoseGroup } from 'react-pose';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Container from './Components/Container';
import Footer from './Components/Footer';
import NavBar from './Components/NavBar';
import Intro from './Pages/Intro';
import New from './Pages/New';
import NotFound from './Pages/NotFound';
import Render from './Pages/Render';
import Renders from './Pages/Renders';

const StyledApp = styled.div`
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  position: relative;
  overflow: hidden;

  @media (max-width: ${props => props.theme.devices.mobile}) {
    justify-content: start;
  }
`;

const AppContainer = withRouter(({ location }) => (
  <PoseGroup>
    <Container key={location.pathname}>
      <Switch location={location}>
        <Route path='/' exact component={Intro} />
        <Route path='/renders' exact component={Renders} />
        <Route path='/render/:id' exact component={Render} />
        <Route path='/new' exact component={New} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  </PoseGroup>
));

const App: React.FC = () => {
  return (
    <StyledApp>
      <Router>
        <NavBar />
        <AppContainer />
        <Footer />
      </Router>
    </StyledApp>
  );
};

export default App;
