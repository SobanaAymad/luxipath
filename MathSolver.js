import { useState } from 'react';
import * as math from 'mathjs';
import './MathSolver.css';

function MathSolver() {
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [steps, setSteps] = useState([]);
  const [showSteps, setShowSteps] = useState(false);
  const [history, setHistory] = useState([]);

  const solveProblem = () => {
    try {
      const cleanProblem = problem.replace(/π/g, 'pi').replace(/e/g, 'e');
      const node = math.parse(cleanProblem);
      const result = math.evaluate(cleanProblem);

      setSolution(result.toString());

      const newSteps = [];
      node.traverse((node) => {
        if (node.isOperatorNode || node.isFunctionNode) {
          newSteps.push({
            expression: node.toString(),
            result: math.evaluate(node.toString())
          });
        }
      });
      setSteps(newSteps);
      setHistory([{ problem, solution: result.toString() }, ...history.slice(0, 4)]);
    } catch (error) {
      console.error(error);
      setSolution('Invalid expression');
      setSteps([]);
    }
  };

  const handleExample = (example) => {
    setProblem(example);
    setSolution('');
    setSteps([]);
  };

  return (
    <div className="math-solver">
      <h2>🧮 Pro Math Solver</h2>

      <div className="math-input-group">
        <input
          type="text"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="Enter expression (e.g., log(100), 5!, sqrt(16), sin(pi/2))"
          onKeyDown={(e) => e.key === 'Enter' && solveProblem()}
        />
        <button onClick={solveProblem}>Solve</button>
      </div>

      <div className="examples">
        <p><strong>Try examples:</strong></p>
        <div className="example-buttons">
          {[
            '5!',
            'log(100)',
            'sqrt(49)',
            'sin(pi / 2)',
            'cos(0)',
            '(2 + 3)^3',
            'ln(e)',
            '10^3'
          ].map((ex) => (
            <button key={ex} onClick={() => handleExample(ex)}>{ex}</button>
          ))}
        </div>
      </div>

      {solution && (
        <div className="solution">
          <h3>Solution: <span className="result">{solution}</span></h3>

          {steps.length > 0 && (
            <>
              <button
                className="steps-toggle"
                onClick={() => setShowSteps(!showSteps)}
              >
                {showSteps ? 'Hide Steps' : 'Show Steps'}
              </button>

              {showSteps && (
                <div className="steps">
                  <h4>Steps:</h4>
                  <ul>
                    {steps.map((step, i) => (
                      <li key={i}>
                        <span className="step-expression">{step.expression}</span>
                        <span className="step-arrow">→</span>
                        <span className="step-result">{step.result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {history.length > 0 && (
        <div className="history">
          <h4>Recent Problems:</h4>
          <ul>
            {history.map((item, i) => (
              <li key={i} onClick={() => handleExample(item.problem)}>
                {item.problem} = {item.solution}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MathSolver;
