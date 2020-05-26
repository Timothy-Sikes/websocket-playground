import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import io from 'socket.io-client';

function Square(props) {
	return (
		<button
			className="square"
			onClick={props.onClick}
		>
			{props.value}
		</button>
		);
}

class Board extends React.Component {
	  renderSquare(i) {
		      return (
			  <Square
				  value={this.props.squares[i]}
				  onClick={() => this.props.onClick(i)}
			  />
			  );
		    }

	  render() {
		return (
			<div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
		}
}

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber: 0,
			xIsNext: true,
		}

		this.socket = io("http://192.168.4.57:8080");

		this.socket.on('open', function open() {
			console.log("Connecting...");
		});

		const game = this;

		this.socket.on('message', function incoming(data) {
			console.log("Recieved: " + data)
			console.log(data);
		
			var parsed = JSON.parse(data);

			if (!!parsed) {

				var response = ""

				switch(parsed.action)
				{
					case "play":
						response = game.play(parsed);
						break;
					case "updateState":
						response = game.updateState(parsed);
						break;
					case "OnStart":
						response = game.onStart(parsed);
						break;
					default:
						console.log("Unknown action");
				}
			}
		});

		}

	render() {
		  const history = this.state.history;
		  console.log("Step Number: " + this.state.stepNumber);
		  const current = history[this.state.stepNumber];
		  console.log(current);
		  const winner = calculateWinner(current.squares);

		  const moves = history.map((step, move) => {
			  const desc = move ?
				  'Go to move #' + move :
				  'Go to game start';
			 return (
				 <li key={move}>
					 <button onClick={() => this.handleHistory(move)}>{desc}</button>
				 </li>
			 )
		  });

		  let status;
		  if (winner) {
			status = 'Winner: ' + winner;
		  } else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		  }
		      return (
			            <div className="game">
			              <div className="game-board">
			                <Board 
								squares={current.squares}
								onClick={(i) => this.handleClick(i)}/>
			              </div>
			              <div className="game-info">
			                <div>{status}</div>
			                <ol>{moves}</ol>
			              </div>
			            </div>
			          );
			}
	
	handleClick(i) {
		const currentAction = {"action" : "play"};
		currentAction["location"] = i;
		console.log(currentAction);
		this.socket.send(JSON.stringify(currentAction));
	}

	handleClickCore(i)
	{
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				squares: squares,
			}]),
			squares: squares,
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
		});
	}

	handleHistory(move)
	{
		console.log("Jumping to move: " + move);
		this.jumpTo(move, this.emitState);
	}

	play(data)
	{
		console.log("Got a play event.");
		this.handleClickCore(data.location);
	}

	emitState()
	{
		console.log("emitting the state!");
		console.log(this.state);

		this.socket.send(JSON.stringify(
			{
				action: "updateState",
				state: this.state
			}
		));
	}

	pullState()
	{
		this.socket.send(JSON.stringify(
			{
				action: "pullState",
			}
		))
	}

	updateState(data)
	{
		console.log("Updating the state!");
		console.log(data.state);
		this.setState(data.state, this.updateStateCallback);
	}

	updateStateCallback()
	{
		this.jumpTo(this.state.stepNumber, () => {})
	}

	onStart(data)
	{
		this.pullState();
	}

	jumpTo(step, callback) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		}, callback);
	}
}

//========================================

ReactDOM.render(
  <Game />,
    document.getElementById('root')
    );

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
		return squares[a];
		}
	}
	return null;
	}