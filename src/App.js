import React from 'react';
import './App.scss';
class App extends React.Component {
  state = {
    expression: '',
    result: 0,
  };

  handleNumberInput(number) {
    const { expression } = this.state;
    this.setState({ expression: expression + number });
  }

  handleOperatorInput(operator) {
    const { expression } = this.state;

    if (expression.length === 0) {
      return;
    }

    const answer = this.evaluate();

    this.setState({
      result: answer,
      expression: expression + operator,
    });
  }

  setAnswer() {
    const answer = this.evaluate();
    this.setState({ expression: '', result: answer });
  }

  evaluate() {
    const { expression } = this.state;

    let answer = 0;
    try {
      // eslint-disable-next-line
      answer = eval(expression);
      if (!answer) {
        answer = 'INVALID INPUT';
      }
    } catch {
      answer = 'INVALID INPUT';
    }

    return answer;
  }

  clearConsole() {
    this.setState({ expression: '', result: 0 });
  }

  clearLastCharacter() {
    const { expression } = this.state;
    this.setState({ expression: expression.slice(0, -1) });
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
          <div className="button double-button" onClick={() => this.handleNumberInput('0')}>
            0
          </div>
          <div className="button" onClick={() => this.handleNumberInput('.')}>
            .
          </div>
          <div className="button" onClick={() => this.handleOperatorInput('+')}>
            +
          </div>
        </div>
        <div className="row">
          <div className="button orange-button" onClick={() => this.clearConsole()}>
            CLR
          </div>
          <div className="button orange-button" onClick={() => this.clearLastCharacter()}>
            DEL
          </div>
          <div className="button double-button orange-button" onClick={() => this.setAnswer()}>
            =
          </div>
        </div>
      </div>
    );
  }
}

export default App;
