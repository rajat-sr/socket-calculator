import React from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './App.scss';
class App extends React.Component {
  state = {
    expression: '',
    displayExpression: '',
    result: 0,
    logs: [],
  };

  componentDidMount() {
    this.socket = io('http://socketcalculator.herokuapp.com');

    // On a free tier, Heroku shuts down the server after certain time of inactivity
    // We need to make this GET call to wake up Heroku server.
    axios
      .get('http://socketcalculator.herokuapp.com')
      .then(res => {
        console.log(res.data);
        this.socket = io('http://socketcalculator.herokuapp.com');
        this.socket.on('logs', data => this.setState({ logs: data.calculations }));
      })
      .catch(e => console.error('Server seems to be shut off.'));
  }

  handleNumberInput(number) {
    const { expression, displayExpression } = this.state;
    const updatedState = {
      expression: expression + number,
      displayExpression: displayExpression + number,
    };
    if (expression.length === 0) {
      updatedState.result = 0
    }
    this.setState(updatedState);
  }

  handleOperatorInput(operator) {
    const { expression, displayExpression } = this.state;

    if (expression.length === 0) {
      return;
    }

    let displayOperator = operator;
    if (operator === '*') {
      displayOperator = '×';
    } else if (operator === '/') {
      displayOperator = '÷';
    }

    this.setState({
      expression: expression + operator,
      displayExpression: displayExpression + displayOperator,
    });
  }

  setAnswer() {
    const answer = this.evaluate();
    if (this.socket) {
      this.socket.emit('new calculation', {
        expression: this.state.displayExpression,
        result: answer.toString(),
      });
    }
    this.setState({
      result: answer.toString(),
    });
  }

  evaluate() {
    const { expression } = this.state;

    let answer = 0;
    try {
      // eslint-disable-next-line
      answer = eval(expression);
      if (answer === undefined || answer === null) {
        answer = 'INVALID INPUT';
      }
    } catch {
      answer = 'INVALID INPUT';
    }

    return answer;
  }

  clearConsole() {
    this.setState({
      expression: '',
      displayExpression: '',
      result: 0,
    });
  }

  clearLastCharacter() {
    const { expression, displayExpression } = this.state;
    this.setState({
      expression: expression.slice(0, -1),
      displayExpression: displayExpression.slice(0, -1),
    });
  }

  render() {
    const { displayExpression, result, logs } = this.state;

    return (
      <div className="app">
        <div className="calculator">
          <p className="expression">{displayExpression}</p>
          <p className="result">{result}</p>
          <div className="row">
            <div className="button colored-button" onClick={() => this.clearConsole()}>
              CLR
            </div>
            <div className="button colored-button" onClick={() => this.clearLastCharacter()}>
              DEL
            </div>
            <div className="button colored-button" onClick={() => this.handleNumberInput('(')}>
              (
            </div>
            <div className="button colored-button" onClick={() => this.handleNumberInput(')')}>
              )
            </div>
          </div>
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
            <div className="button colored-button" onClick={() => this.handleOperatorInput('/')}>
              ÷
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
            <div className="button colored-button" onClick={() => this.handleOperatorInput('*')}>
              ×
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
            <div className="button colored-button" onClick={() => this.handleOperatorInput('-')}>
              -
            </div>
          </div>
          <div className="row bottom-row">
            <div className="button bottom-left-button" onClick={() => this.handleNumberInput('.')}>
              .
            </div>
            <div className="button" onClick={() => this.handleNumberInput('0')}>
              0
            </div>
            <div className="button colored-button" onClick={() => this.setAnswer()}>
              =
            </div>
            <div
              className="button colored-button bottom-right-button"
              onClick={() => this.handleOperatorInput('+')}
            >
              +
            </div>
          </div>
        </div>
        <div className="logs">
          {logs.length === 0 ? (
            <p>No history data available. Make some calculations.</p>
          ) : (
            <div>
              {logs.map((calculations, index) => (
                <div key={index}>
                  <hr></hr>
                  <p>
                    <span className="history-expression">{calculations.expression}</span> ={' '}
                    <span className="history-result">{calculations.result}</span>
                  </p>
                </div>
              ))}
              <p className="latest">Latest</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
