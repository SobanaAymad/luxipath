import { useState } from 'react';
// import { FiCalculator } from 'react-icons/fi';

export default function MathSolver() {
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [steps, setSteps] = useState([]);

  const solveProblem = () => {
    try {
      // Replace with actual mathjs solution later
      const result = eval(problem); // Temporary simple evaluator
      setSolution(`Answer: ${result}`);
      setSteps([
        `Input: ${problem}`,
        `Simplified: ${problem}`,
        `Result: ${result}`
      ]);
    } catch (error) {
      setSolution('Invalid expression');
      setSteps([]);
    }
  };

  return (
    <div className="page math-page">
      {/* <h1><FiCalculator /> Math Solver</h1> */}
      
      <div className="math-container">
        <div className="input-section">
          <input
            type="text"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Enter math problem (e.g., 2+3*(5-1))"
          />
          <button onClick={solveProblem}>Solve</button>
        </div>
        
        {solution && (
          <div className="solution-section">
            <h3>{solution}</h3>
            
            <div className="steps">
              <h4>Steps:</h4>
              <ul>
                {steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}