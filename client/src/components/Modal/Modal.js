import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Fade } from 'reactstrap';
import PropTypes from 'prop-types';
import {Form, FormGroup, Label, Input } from 'reactstrap';
import {connect} from 'react-redux';
import {addTransaction} from '../../actions/transactionsActions';
import { getUser } from '../../actions/authActions';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      accountNumber: null,
      name: '',
      reference: '',
      amount: null
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {

    if(prevProps.auth.destinationUser !== this.props.auth.destinationUser) {
      const nameField = document.getElementById('name');
      nameField.value = this.props.auth.destinationUser.name;
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})

  }

  onHandleConfirmRecipient = (e) => {

    console.log(this.state.accountNumber);
    this.props.getUser(this.state.accountNumber);
  }
  
  onHandleSubmit = e => {
     e.preventDefault();
    
     const nameInput = document.getElementById('name');
     this.setState({
       name: nameInput.value
     }, () => {
        let newTransaction = {
          source: this.props.auth.user.name,
          accountNumber: this.state.accountNumber,
          name: this.state.name,
          reference: this.state.reference,
          amount: this.state.amount
      }

      console.log(newTransaction);
      // Add transaction
      this.props.addTransaction(newTransaction);

      //Close modal
      this.toggle();
     })

  }
  render() {

    return (
      <div>
        <Button className="mb-3" style={{fontFamily: "'DM Sans', sans-serif", backgroundColor: "#008000", border: "none"}} size="lg" onClick={this.toggle}>New Transfer</Button>
        <Modal isOpen={this.state.modal} style={{fontFamily: "'DM Sans', sans-serif"}} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>New Transfer</ModalHeader>
          <ModalBody>
          <Form onSubmit={this.onHandleSubmit}>
        <FormGroup>
          <Label for="accountnumber">Recipient's account number</Label>
          <Input
            type="number"
            name="accountNumber"
            id="accountnumber"
            placeholder="Recipient's account number"
            onChange={this.onChange}
           />
        </FormGroup>
        <Button style={{backgroundColor: "#008000"}} className="btn-sm mb-3" onClick={this.onHandleConfirmRecipient}>Confirm Recipient</Button>
        <FormGroup>
          <Label for="name">Recipient's name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Recipient's name"
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="reference">Reference</Label>
          <Input
            type="text"
            name="reference"
            id="reference"
            placeholder="Reference..."
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="amount">Amount</Label>
          <Input
            type="number"
            name="amount"
            id="amount"
            placeholder="Amount..."
            onChange={this.onChange}
          />
        </FormGroup>
      </Form>
          </ModalBody>
          <ModalFooter>
            <Button style={{backgroundColor: "#008000"}} onClick={this.onHandleSubmit}>Confirm Transfer</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

Modal.propTypes = {
    isOpen:  PropTypes.bool,
    autoFocus: PropTypes.bool,
    centered: PropTypes.bool,
    size: PropTypes.string,
    toggle:  PropTypes.func,
    role: PropTypes.string, // defaults to "dialog"
    labelledBy: PropTypes.string,
    keyboard: PropTypes.bool,
    backdrop: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['static'])
    ]),
    onEnter: PropTypes.func,
    onExit: PropTypes.func,
    onOpened: PropTypes.func,
    onClosed: PropTypes.func,
    className: PropTypes.string,
    wrapClassName: PropTypes.string,
    modalClassName: PropTypes.string,
    backdropClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    fade: PropTypes.bool,
    cssModule: PropTypes.object,
    zIndex: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    backdropTransition: PropTypes.shape(Fade.propTypes),
    modalTransition: PropTypes.shape(Fade.propTypes),
    innerRef: PropTypes.object,
    unmountOnClose: PropTypes.bool // defaults to true
  }


const mapStateToProps = state => ({
  auth: state.auth,
  transaction: state.transactions
})


export default connect(mapStateToProps, {addTransaction, getUser})(ModalExample);