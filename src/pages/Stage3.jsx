import { Component } from 'react';
import { Navigate } from 'react-router-dom';

export default class Stage3 extends Component {
  state = {
    email: '',
    agree: false,
    done: false,
  };
emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  submit = ()=>{
    if(!this.emailRegex.test(this.state.email)  || !this.state.agree){
      alert('Please enter a valid email and agree to the terms')
      return
    }
    this.props.setCompletedStage((p)=>({...p, stage3:true}))
    this.props.setProgress(100)
    this.props.setFormData((p)=> ({...p, email: this.state.email}))
    this.setState({done:true})
  }

  render() {
    if(this.state.done) return <Navigate to={'/register/success'} replace />
    const customRole = this.props.role
    return (
      <>
        <h2 className="font-semibold mb-4 capitalize">
          Stage 3 / 3: Additional Information ({customRole}){' '}
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded-md mb-3"
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <label className="flex gap-2 text-sm mb-4">
          <input
            type="checkbox"
            onChange={(e) => {
              this.setState({agree:e.target.value});
            }}
          />
          Agreement
        </label>
        <button
        disabled={!this.state.email || !this.state.agree}
        onClick={this.submit}
        className={`w-full py-2 rounded-md text-white ${this.state.email && this.state.agree ? "bg-blue-500 cursor-pointer" : "bg-gray-400 cursor-not-allowed"} `}
        >
          Submit
        </button>
      </>
    );
  }
}
