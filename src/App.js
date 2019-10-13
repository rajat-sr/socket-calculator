import React from 'react';
import './App.scss';
class App extends React.Component {
  state = {
    expression: '',
    result: 0,
    lastOperator: '',
  };

  handleNumberInput(number) {
    const { expression } = this.state;
    this.setState({ expression: expression + number });
  }

  handleOperatorInput(operator) {
    let { expression } = this.state;

    if (expression.length === 0) {
      return;
    }

    if (Number.isNaN(expression.charAt(expression.length - 1))) {
      expression = expression.slice(0, -1);
    }

    let answer = this.evaluate();
    let pairSolution = answer;
    if (answer === null) {
      answer = 0;
      pairSolution = expression;
    }

    this.setState({
      lastOperator: operator,
      result: answer,
      expression: pairSolution + operator,
    });
  }

  setAnswer() {
    let answer = this.evaluate();
    if (!answer) {
      answer = 0;
    }
    this.setState({ expression: '', result: answer, lastOperator: '' });
  }

  evaluate() {
    const { expression, lastOperator } = this.state;
    const operands = expression.split(lastOperator);

    switch (lastOperator) {
      case '+':
        return +operands[0] + +operands[1];
      case '-':
        return +operands[0] - +operands[1];
      case '*':
        return +operands[0] * +operands[1];
      case '/':
        return +operands[0] / +operands[1];
      default:
        return null;
    }
  }

  clearConsole() {
    this.setState({ expression: '', result: 0, lastOperator: '' });
  }

  render() {
    const { expression, result } = this.state;

    return (
      <div>
        <p className="expression">{expression}</p>
        <p className="result">{result}</p>
        <div className="row">
          <div className="button" onClick={() => this.handleNumberInput('7')}>
            7
          </div>
          <div className="button" onClick={() => this.handleNumberInput('8')}>
            8
          </div>
          <div className="button" onClick={() => this.handleNumberInput('9')}>
            9
          </div>
          <div className="button" onClick={() => this.handleOperatorInput('/')}>
            /
          </div>
        </div>
        <div className="row">
          <div className="button" onClick={() => this.handleNumberInput('4')}>
            4
          </div>
          <div className="button" onClick={() => this.handleNumberInput('5')}>
            5
          </div>
          <div className="button" onClick={() => this.handleNumberInput('6')}>
            6
          </div>
          <div className="button" onClick={() => this.handleOperatorInput('*')}>
            *
          </div>
        </div>
        <div className="row">
          <div className="button" onClick={() => this.handleNumberInput('1')}>
            1
          </div>
          <div className="button" onClick={() => this.handleNumberInput('2')}>
            2
          </div>
          <div className="button" onClick={() => this.handleNumberInput('3')}>
            3
          </div>
          <div className="button" onClick={() => this.handleOperatorInput('-')}>
            -
          </div>
        </div>
        <div className="row">
          <div className="triple-button" onClick={() => this.handleNumberInput('0')}>
            0
          </div>
          <div className="button" onClick={() => this.handleOperatorInput('+')}>
            +
          </div>
        </div>
        <div className="row">
          <div className="double-button" onClick={() => this.clearConsole()}>
            Clear
          </div>
          <div className="double-button" onClick={() => this.setAnswer()}>
            =
          </div>
        </div>
      </div>
    );
  }
}

export default App;
