import React, { useState, useEffect } from 'react';

const RulesDisplay = () => {
  const [rules, setRules] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/rules/fetch_rules');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message);
      }
      
      console.log('Fetched rules:', result.data);
      setRules(result.data);
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading rules...</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Rules</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {rules.length === 0 ? (
        <div className="text-gray-500">No rules found</div>
      ) : (
        <div className="space-y-4">
          {rules.map((rule) => (
            <div 
              key={rule._id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white"
            >
              <div className="text-sm text-gray-500 mb-2">
                Rule ID: {rule._id}
              </div>
              <div className="font-mono bg-gray-50 p-2 rounded">
                {rule.ruleString}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RulesDisplay;