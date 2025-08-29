import { CircleX, Terminal, X } from 'lucide-react';
import React, { useState } from 'react';
import { FaRegWindowMaximize } from 'react-icons/fa';
import { BsDashLg } from "react-icons/bs";

export const Coding = () => {
  const [output, setOutput] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  // Function to execute the C++ script using Piston API
  const executeCppScript = async () => {
    const cppCode = `
      #include <iostream>
      using namespace std;
      int main() {
          cout << "Execution successful!" <<endl;
          
          return 0;
      }
    `;

    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: 'cpp',
          version: '10.2.0', // Specify the C++ version
          files: [{ content: cppCode }],
        }),
      });

      const result = await response.json();
      setOutput(result.run.output); // Set the output of the script
      setShowProfile(true); // Show LeetCode profile on success
    } catch (error) {
      setOutput('Error executing the script.');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Code Editor */}
      <div className="dark:bg-monacoBg text-monacoText dark:text-white rounded-lg dark:shadow-lg p-4">
        <span className="text-xl flex px-2 font-bold mb-4">C++ Code Editor</span> 
        <textarea
          className="w-full h-56 dark:bg-gray-800 mt-1 shadow-xl px-8 dark:text-monacoFunction text-black/60 p-4 rounded-lg font-mono text-md  resize-none"
          value={`#include <iostream>
using namespace std;
int main() {
    cout << ">  Run the Code to see my Leetcode Profile summary <" <<endl;
    
    return 0;
}`}
          readOnly
        ></textarea>
        <button
          onClick={executeCppScript}
          className="btn btn-primary mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
        >
          Run Code
        </button>
      </div>

      {/* Output Section */}
      <div className="mt-6 dark:bg-gray-800 dark:text-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-semibold">Output:</h3>
        <pre className="dark:bg-gray-900 p-4 rounded-lg mt-2 flex">  {showProfile && output && (
        <div className="px-8 flex">
          <h3 className="text-xl font-bold px-4 -py-2">LeetCode Profile</h3>
          <a
            href="https://www.leetcode.com/sjx_subham"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://leetcard.jacoblin.cool/Sjx_Subham?theme=dark&font=Arial&ext=heatmap"
              alt="LeetCode Profile"
              className="rounded-lg shadow-lg px-16 "
            />
          </a>
        </div>
      )}
      <Terminal className='text-emerald-300'/>{output}</pre>
      </div>

      {/* LeetCode Profile */}
      {/* <div className='flex ml-auto gap-0'><div className='rounded-sm h-4 w-4 '><BsDashLg className='h-4 w-3'/></div><div className='h-4 w-4 rounded-sm border px-0.5 dark:border-gray-800'><FaRegWindowMaximize className='dark:bg-gray-900 bg-transparent gap-4 w-3 h-3'/></div><div className='h-3 w-3 px-0.5'> <X className="rounded-sm gap-4 w-3.5 h-3.5" /></div></div> */}
    </div>
  );
};