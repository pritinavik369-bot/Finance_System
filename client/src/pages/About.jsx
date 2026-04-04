import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header Section */}
      <div className="bg-purple-100 py-12 px-6">
        <h1 className="text-4xl font-bold text-purple-700">
          About FinanceApp
        </h1>
        <p className="text-gray-700 text-base sm:text-lg mt-4">
          FinanceApp is designed to make financial management simple, approachable, and efficient. Track income, manage expenses, and gain clear insights into your spending habits.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white py-12 px-6">
        <h2 className="text-2xl font-semibold text-purple-800 mb-4">Our Mission</h2>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          We aim to make financial management easy and accessible for everyone. Our tools help you track income, manage expenses, and understand spending patterns—all in one place without complexity.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-purple-50 py-12 px-6">
        <h2 className="text-2xl font-semibold text-purple-800 mb-6">Why Choose FinanceApp?</h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700 text-base sm:text-lg">
          <div className="flex items-start gap-3">
            <span className="text-pink-500 font-bold">✓</span>
            Easy to use interface
          </div>
          <div className="flex items-start gap-3">
            <span className="text-purple-500 font-bold">✓</span>
            Real-time financial insights
          </div>
          <div className="flex items-start gap-3">
            <span className="text-indigo-500 font-bold">✓</span>
            Secure and private data
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-500 font-bold">✓</span>
            Free to get started immediately
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-12 px-6">
        <h2 className="text-2xl font-semibold text-purple-800 mb-6">Features</h2>
        <div className="grid md:grid-cols-4 gap-6 text-sm sm:text-base">
          <div className="p-6 bg-pink-50 rounded-xl text-pink-800 text-center">
            <h3 className="font-bold mb-1">Track Records</h3>
            Easily log and monitor income & expenses
          </div>
          <div className="p-6 bg-purple-50 rounded-xl text-purple-800 text-center">
            <h3 className="font-bold mb-1">Categorized</h3>
            Organize transactions with categories
          </div>
          <div className="p-6 bg-indigo-50 rounded-xl text-indigo-800 text-center">
            <h3 className="font-bold mb-1">Smart Insights</h3>
            Get summaries of balances and trends instantly
          </div>
          <div className="p-6 bg-green-50 rounded-xl text-green-800 text-center">
            <h3 className="font-bold mb-1">Secure Storage</h3>
            Keep your data protected and private
          </div>
        </div>

        {/* Small Rounded Boxes Below Features */}
        <div className="flex flex-wrap gap-4 mt-8">
          <div className="px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">
            Free Forever
          </div>
          <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            Easy to Use
          </div>
          <div className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
            Secure & Private
          </div>
        </div>

      </div>
    </div>
  );
}