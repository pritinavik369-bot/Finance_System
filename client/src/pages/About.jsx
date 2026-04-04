import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About FinanceApp</h1>
        
        <div className="bg-white rounded-lg shadow p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              At FinanceApp, we're committed to helping individuals and businesses take control of their financial health. 
              Our platform provides simple yet powerful tools to track income and expenses, categorize transactions, and 
              gain meaningful insights into spending patterns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose FinanceApp?</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Easy to Use:</strong> Intuitive interface makes financial tracking effortless</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Real-Time Insights:</strong> Get instant summaries of your balance and trends</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Secure:</strong> Your data is protected with industry-standard encryption</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Free:</strong> Get started tracking your finances at no cost</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-bold text-blue-900 mb-2">Record Tracking</h3>
                <p className="text-sm text-blue-800">Add and manage income and expense records easily</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-bold text-green-900 mb-2">Categorization</h3>
                <p className="text-sm text-green-800">Organize transactions with custom categories</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-bold text-purple-900 mb-2">Smart Summaries</h3>
                <p className="text-sm text-purple-800">Get real-time balance and income/expense totals</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-bold text-orange-900 mb-2">Secure Storage</h3>
                <p className="text-sm text-orange-800">Your data is safe with secure authentication</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
