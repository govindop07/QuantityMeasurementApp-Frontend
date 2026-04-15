import React, { useState, useEffect } from 'react';
import conversionService from '../../services/conversionService.js';

function extractFrom(resultString) {
  if (!resultString) return '';
  return resultString.split('→')[0]?.trim() || resultString;
}

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    conversionService.getHistory()
      .then(data => { setHistory(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      <div className="bg-indigo-500 py-7 px-10 text-center">
        <h2 className="text-white text-2xl font-medium">Conversion History</h2>
      </div>

      <div className="max-w-4xl mx-auto px-5 pt-10">
        {loading && (
          <div className="text-center p-10 text-gray-500 bg-white rounded-xl shadow-sm text-base">Loading history...</div>
        )}

        {!loading && history.length === 0 && (
          <div className="text-center p-10 text-gray-500 bg-white rounded-xl shadow-sm text-base">
            <p>No conversions yet. Start converting on the Home or Conversion page!</p>
          </div>
        )}

        {!loading && history.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">#</th>
                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">From</th>
                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">To Unit</th>
                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">Result</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 text-sm text-gray-700 border-b border-gray-100">{i + 1}</td>
                    <td className="px-5 py-4 text-sm text-gray-700 border-b border-gray-100">{extractFrom(item.resultString)}</td>
                    <td className="px-5 py-4 text-sm text-gray-700 border-b border-gray-100">{item.unit}</td>
                    <td className="px-5 py-4 text-sm font-bold text-indigo-600 border-b border-gray-100">{item.resultValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
