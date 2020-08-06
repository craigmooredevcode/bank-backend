import React, { Component } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Container, Row, Col, Modal, ModalBody, ModalHeader } from "reactstrap";
import ModalExample from "../../components/Modal/Modal";
import { connect } from "react-redux";
import TransactionsList from "../Transactions/TransactionsList/TransactionsList";
import styled from "styled-components";

class Transactions extends Component {
  state = {
    transactionStatus: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.transactions.transactionStatus !== this.props.transactions.transactionStatus) {
      this.setState({
        transactionStatus: !this.props.transactions.transactionStatus
      })
    }
  }

  toggle = (e) => {
    this.setState(prevState => ({
      transactionStatus: !prevState.transactionStatus
    }))
  }

  render() {
    return (
      <TransactionsWrapper>
        <div className="header-wrapper">
          <h6 className="header text-white">Transactions</h6>
        </div>
        <Container>
          <Row>
            <Col md="4" className="my-5">
              <ModalExample />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Form className="mx-auto">
                <FormGroup>
                  <Input
                    className="form-control"
                    type="text"
                    name="search"
                    placeholder="Search for transaction by Payee..."
                    id="search"
                  />
                </FormGroup>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <h4 className="text-white my-3 text-center">
                History of your transactions
              </h4>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md="12">
              <TransactionsList />
            </Col>
          </Row>
        </Container>
        <Modal isOpen={this.state.transactionStatus} style={{fontFamily: "'DM Sans', sans-serif"}} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Transfer Failed</ModalHeader>
          <ModalBody>
            Transfer failed
          </ModalBody>
        </Modal>
      </TransactionsWrapper>
    );
  }
}

const TransactionsWrapper = styled.div`
  font-family: 'DM Sans', sans-serif;
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
  .horizontal-line {
    border-bottom: 1px solid #fff;
    width: 100%;
  }
`;

const mapStateToProps = state => ({
  auth: state.auth,
  transactions: state.transactions
});

export default connect(mapStateToProps)(Transactions);
