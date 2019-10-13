import React from 'react';

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
    const answer = this.evaluate();
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
        <p>{expression}</p>
        <p>{result}</p>
        <div>
        <div>
          <div onClick={() => this.handleNumberInput('7')}>
            7
          </div>
          <div onClick={() => this.handleNumberInput('8')}>
            8
          </div>
          <div onClick={() => this.handleNumberInput('9')}>
            9
          </div>
          <div onClick={() => this.handleOperatorInput('/')}>
            /
          </div>
        </div>
          <div onClick={() => this.handleNumberInput('4')}>
            4
          </div>
          <div onClick={() => this.handleNumberInput('5')}>
            5
          </div>
          <div onClick={() => this.handleNumberInput('6')}>
            6
          </div>
          <div onClick={() => this.handleOperatorInput('*')}>
            *
          </div>
        </div>
        <div>
          <div onClick={() => this.handleNumberInput('1')}>
            1
          </div>
          <div onClick={() => this.handleNumberInput('2')}>
            2
          </div>
          <div onClick={() => this.handleNumberInput('3')}>
            3
          </div>
          <div onClick={() => this.handleOperatorInput('-')}>
            -
          </div>
        </div>
        <div>
          <div onClick={() => this.handleNumberInput('0')}>
            0
          </div>
          <div onClick={() => this.handleOperatorInput('+')}>
            +
          </div>
        </div>
        <div>
          <div onClick={() => this.setAnswer()}>
            =
          </div>
          <div onClick={() => this.clearConsole()}>
            Clear
          </div>
        </div>
      </div>
    );
  }
}

export default App;
