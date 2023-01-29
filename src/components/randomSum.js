import React, { Component } from 'react'
import styles from './randomStyles.module.css'

class RandomSum extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         operand1: Math.floor(Math.random() * 90 + 10),
         operator: '+',
         operand2: Math.floor(Math.random() * 90 + 10),
         answer: 0,
         userAnswer: '',
         prevUserAnswer: '',
         showVerdict: false,
         correctAnswer: false,
         message: ''
      }
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    
    generateRandNum() {
        this.setState({
            operand1:  Math.floor(Math.random() * 90 + 10),
            operand2:  Math.floor(Math.random() * 90 + 10),
            //showVerdict: false

        }, () => {
          this.setState({
            answer: this.state.operand1 + this.state.operand2
          })
        })
        document.getElementById('inputField').focus()
    }

    handleUserAnswerChange = (event) => {
        this.setState({
          userAnswer: event.target.value
        })
    }

    handleProcessSubmit = (event) => {
      const isCorrect = this.state.userAnswer == this.state.answer
      if (isCorrect) {
        //alert('correct!')
        this.setState({ 
          correctAnswer: true,
          message: <div className={styles.message}>{`Correct! ${this.state.operand1} ${this.state.operator} ${this.state.operand2} = ${this.state.answer}`}</div>
 

        })
      } else {
        this.setState({ 
          correctAnswer: false,
          message: <div className={styles.message}>{`${this.state.userAnswer} is incorrect. Try again, or press Generate to move on.`}</div>
        })
      }
      event.preventDefault()
      if (!this.isNumeric(this.state.userAnswer)) alert('Please inpuit a number!');
      this.setState({
        prevUserAnswer: this.state.userAnswer,
        userAnswer: '',
        showVerdict: this.isNumeric(this.state.userAnswer)
      })
      if (isCorrect) this.generateRandNum();
      const elem = document.getElementById('inputField')
      elem.focus()
      //this.generateRandNum()

    }

    handleSubmit = (event) => {
      this.setState({ answer: this.state.operand1 + this.state.operand2}, () => this.handleProcessSubmit(event))
      
    }

  render() {
    //const numStyle = {fontSize: '7rem', color: 'orangered'}
    /*
    let message; 
    message = this.state.correctAnswer ? (
    <div>Correct! {`${this.state.operand1} ${this.state.operator} ${this.state.operand2} = ${this.state.answer}`}</div>
    ) : (
      <div>{`${this.state.prevUserAnswer} is incorrect. Try again, or press Generate to move on.`}</div>
    )
      */
    return (
      <div className={styles.container}>
        <h1 className={styles.header}>Mental Math Practice</h1>
        <div className={styles.numbers}>
            {this.state.operand1} {this.state.operator} {this.state.operand2}
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input id='inputField' type='text' value={this.state.userAnswer}
            onChange={this.handleUserAnswerChange}
            className={styles.inputBox}
            />
            <div>            
            <button className={styles.button} type='submit'>Check</button>
            <button className={styles.button} 
            onClick={() => this.generateRandNum()}>Generate</button>
            {this.state.showVerdict ? this.state.message : ' '}
            </div>
          </form>
        </div>
        
      </div>
    )
  }
}

export default RandomSum