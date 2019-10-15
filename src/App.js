import React from 'react';
import io from 'socket.io-client';
import './App.scss';
class App extends React.Component {
  state = {
    expression: '',
    result: 0,
    logs: [],
  };

  componentDidMount() {
    this.socket = io('http://localhost:8000');
    this.socket.on('logs', data => this.setState({ logs: data.calculations }));
  }

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
    this.socket.emit('new calculation', { expression: this.state.expression, result: answer });
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
    const { expression, result, logs } = this.state;

    return (
      <div className="app">
        <div className="calculator">
          <p className="expression">{expression}</p>
          <p className="result">{result}</p>
          <div className="row">
            <div className="button colored-button" onClick={() => this.clearConsole()}>
              CLR
            </div>
            <div className="button colored-button" onClick={() => this.clearLastCharacter()}>
              DEL
            </div>
            <div className="button"> </div>
            <div className="button colored-button" onClick={() => this.handleOperatorInput('/')}>
              /
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

            <div className="button colored-button" onClick={() => this.handleOperatorInput('*')}>
              *
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

            <div className="button colored-button" onClick={() => this.handleOperatorInput('-')}>
              -
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

            <div className="button colored-button" onClick={() => this.handleOperatorInput('+')}>
              +
            </div>
          </div>
          <div className="row">
            <div className="button bottom-left-button" onClick={() => this.handleNumberInput('0')}>
              {' '}
            </div>
            <div className="button" onClick={() => this.handleNumberInput('0')}>
              0
            </div>
            <div className="button" onClick={() => this.handleNumberInput('.')}>
              .
            </div>

            <div
              className="button colored-button bottom-right-button"
              onClick={() => this.setAnswer()}
            >
              =
            </div>
          </div>
        </div>
        <div className="logs">
          {logs.length === 0 ? (
            <p>No history data available. Make some calculations.</p>
          ) : (
            logs.map((calculations, index) => (
              <div key={index}>
                <p>
                  <span className="history-expression">{calculations.expression}</span> ={' '}
                  <span className="history-result">{calculations.result}</span>
                </p>
                <hr></hr>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default App;
