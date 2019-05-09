import React from 'react';
import { withCookies } from 'react-cookie';
import styled from 'styled-components';
import 'video-react/dist/video-react.css';
import { Player } from 'video-react';
import { withRouter } from 'react-router-dom';
import tutorials from './tutorials/tutorials';

const Container = styled.div`
display: grid;
grid-template-rows: 10% 90%;
grid-template-areas: 
  "menu"
  "body";

@media only screen and (min-width: 768px) {
  grid-template-columns: 30% 70%;
  grid-template-rows: 100%;
  grid-template-areas: 
    "menu body";
}

@media only screen and (min-width: 1200px) {
  grid-template-columns: 20% 80%;
  grid-template-rows: 100%;
  grid-template-areas: 
    "menu body";
}
`;

const BodyContainer = styled.div`
  overflow: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;

@media only screen and (min-width: 768px) {
  padding-left: 10%;
  padding-right: 10%;
}
`;

const Title = styled.div`
  width: 100%;
  font-size: 48px;
  font-weight: 300;
  padding: 30px;
`;

const Subtitle = styled.div`
  width: 100%;
  font-size: 30px;
  font-weight: 300;
  padding: 0 30px;
`;

const TextBody = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 200;
  padding: 30px;
`;

const MenuContainer = styled.div`
grid-area: menu;
display: flex;
flex-direction: column;
background: #fafafa;
box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
overflow: auto;
`;

const MenuItemHeading = styled.div`
  width: 100%;
  height: 40px;
  line-height: 20px;
  font-weight: 600;
  padding: 10px;
  font-size: 16px;
`;

const VideoHolder = styled.div`
   margin: 30px;
`;

const MenuItem = styled.div`

  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-items: center;
  font-weight: 200;
  padding-left: 20px;
  position: relative;
  background: #fafafa;
  cursor: pointer;
  transition: 1s;
  padding-right: 40px;
  
  :hover {
    background: #dedede;
    transition: 1s;
  }

  :hover::after {
    right: 10px;
    color: #fafafa;
    transition: 1s;
  }

  ::after {
    content: 'keyboard_arrow_right';
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    position: absolute;
    right: 15px;
    color: #dedede;
    font-weight: 900;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
    transition: 1s;
  }
`;

function getTutorial(id) {
  return tutorials.find(tutorial => tutorial.id === id);
}

class SupportPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tutorialId: 1,
    };
  }

  setTutorial = (id) => {
    this.setState({
      tutorialId: id,
    });
  }

  getVideoHolder = (tutorial) => {
    if (tutorial.youtube) {
      return (
        <VideoHolder>
          {tutorial.iframe}
        </VideoHolder>
      );
    }
    return (
      <VideoHolder>
        <Player
          laysInline
          poster={tutorial.video.sample}
          src={tutorial.video.url}
        />
      </VideoHolder>
    );
  }

  render() {
    const { tutorialId } = this.state;
    const tutorial = getTutorial(tutorialId);

    return (
      <Container>
        <MenuContainer>
          <MenuItemHeading>Basics</MenuItemHeading>
          <MenuItem onClick={() => this.setTutorial(1)}>How to sign up</MenuItem>
          <MenuItem onClick={() => this.setTutorial(2)}>Creating a dealer</MenuItem>
          <MenuItem onClick={() => this.setTutorial(3)}>Adding/Removing a new card</MenuItem>
          <MenuItem onClick={() => this.setTutorial(4)}>Push notifications</MenuItem>
          <MenuItemHeading>Bids</MenuItemHeading>
          <MenuItem onClick={() => this.setTutorial(5)}>Placing a bid</MenuItem>
          <MenuItem>Viewing your current bids information</MenuItem>
          <MenuItemHeading>FAQs</MenuItemHeading>
          <MenuItem>View FAQs here</MenuItem>
        </MenuContainer>
        <BodyContainer>
          <Title>{tutorial.title}</Title>
          <hr style={{ margin: '0 30px' }} />
          {
            tutorial.video
              ? (
                this.getVideoHolder(tutorial.video)
              )
              : null
          }

          {tutorial.body.map((textBody, i) => (
            <div key={i} style={{ marginTop: '16px' }}>
              <Subtitle>{textBody.heading}</Subtitle>
              <TextBody>
                {textBody.content}
              </TextBody>
            </div>
          ))}
        </BodyContainer>
      </Container>
    );
  }
}

export default withCookies(withRouter(SupportPage));