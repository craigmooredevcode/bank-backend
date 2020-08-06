import React, { Component } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "reactstrap";
import MessagesForm from "./MessageForm/MessageForm";
import MessagesList from "./MessagesList/MessagesList";
class Messages extends Component {
  render() {
    return (
      <MessagesWrapper className="mb-3">
        <div className="header-wrapper">
          <h6 className="header text-white">Messages</h6>
        </div>
        <Container>
          <Row className="my-5">
            <Col md="6">
              <MessagesForm />
            </Col>
            <Col md="6">
              <MessagesList />
            </Col>
          </Row>
        </Container>
      </MessagesWrapper>
    );
  }
}

const MessagesWrapper = styled.div`
  padding-left: 2rem;
  width: 85%;
  min-height: 100vh;
  background-color: #3a4149;
  border-left: 1px solid rgba(0, 0, 0, 0.4);

  .header {
    text-align: left;
    font-family: 'DM Sans', sans-serif;
    padding: 1.3rem 1rem 1rem 1rem;
  }
  .text-white {
    font-family: 'DM Sans', sans-serif;
  }
  .header-wrapper {
    background-color: #343b41;
    border-bottom: 1px solid #000;
  }
`;

export default Messages;
