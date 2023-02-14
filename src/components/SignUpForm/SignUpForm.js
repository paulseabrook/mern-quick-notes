// SignUpForm.jsx
import { Component } from 'react';
// Add this import
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {
  // this is the same as doing our constructor function
  // this state must be called "state"
  // State is just a POJO (Plain Ol JavaScript Object)
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: '',
  };

  // we use arrow syntax here and it means we DON'T have to use the bind method
  handleChange = (event) => {
    // The object passed to setState is merged with the current state object
    // NOTE, we don't have to spread in our initial state in this instance
    // This is because this is not an array
    this.setState({
      // this is why we specify name="name" below...
      // so that we can perform these normal POJO actions on this
      // name, email, password, confirm
      [event.target.name]: event.target.value,
      // set error message to just and empty string
      error: '',
    });
  };

  handleSubmit = async (event) => {
    // default behaviour for submit is to refresh page, we need to prevent this
    event.preventDefault();
    // JSON.stringify takes a JavaScript Value and converts it to a JSON string
    //alert(JSON.stringify(this.state));

    // try something, if it works, move on, else, catch and perform some code
    try {
      // We don't want to send the 'error' or 'confirm' property,
      //  so let's make a copy of the state object, then delete them
      // here we are spreading it in, there's also other ways to create this copy
      const formData = { ...this.state };
      // we delete these out so that when we send formData to the server, it will not include these
      delete formData.error;
      delete formData.confirm;

      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await signUp(formData);

      this.props.setUser(user);
    } catch (error) {
      console.error(error);
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  // we must have a render method for a class component
  render() {
    // if our password does not explicitly match our confirm, disable the button (make disable true) else, make disable false and they can submit
    // we must do this BECAUSE we are inside of a class component.
    // therefore, we are referring to THIS instance of the class component inside that state of that instance
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        {/* Add the className because we will want to add css later  */}
        <div className='form-container'>
          {/* autoComplete puts our previous information in, we want this off */}
          {/* onSubmit of this form, call the handleSubmit function */}
          <form autoComplete='off' onSubmit={this.handleSubmit}>
            {/* add a label of Name */}
            <label>Name</label>
            {/* name="name" is added below for our handleChange method. See above */}
            {/* we set the value to whatever the value of the name of state */}
            {/* on change of this input, handle that change */}

            <input
              type='text'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <label>Confirm</label>
            <input
              type='password'
              // Remember, name="confirm" is for our this.handleChange method
              name='confirm'
              value={this.state.confirm}
              onChange={this.handleChange}
              required
            />
            <button type='submit' disabled={disable}>
              SIGN UP
            </button>
          </form>
        </div>
        {/* if an error, give a paragraph with an error */}
        <p className='error-message'>&nbsp;{this.state.error}</p>
      </div>
    );
  }
}
