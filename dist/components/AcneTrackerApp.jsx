
import React from "react";

export default function AcneTrackerApp() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-white shadow p-4 text-center text-3xl font-bold text-blue-600">
        Acne Tracker
      </header>

      {/* Daily Entry Form */}
      <main className="p-4 max-w-2xl mx-auto space-y-6">
        <section className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold">Log Today’s Acne</h2>

          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input type="date" className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Severity (1-10)</label>
            <input type="range" min="1" max="10" className="w-full" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Areas Affected</label>
            <div className="flex flex-wrap gap-2">
              {["Face", "Back", "Chest", "Neck", "Other"].map((area) => (
                <label key={area} className="inline-flex items-center gap-1">
                  <input type="checkbox" className="accent-blue-600" />
                  {area}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Notes</label>
            <textarea className="w-full border rounded p-2" rows="3" placeholder="Any notes..." />
          </div>

          <div>
            <label className="block mb-1 font-medium">Upload Image</label>
            <input type="file" className="block" />
          </div>

          <button className="bg-blue-600 text-white rounded-xl px-4 py-2 hover:bg-blue-700">
            Save Entry
          </button>
        </section>

        {/* Progress Tracker */}
        <section className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Your Acne History</h2>
          <p className="text-gray-500">(Entries will appear here...)</p>
        </section>

        {/* Export / Footer */}
        <section className="text-center">
          <button className="bg-green-600 text-white rounded-xl px-4 py-2 hover:bg-green-700">
            Export as PDF
          </button>
        </section>
      </main>

      <footer className="text-center text-sm text-gray-500 py-4">
        © 2025 Acne Tracker — This is not a medical tool.
      </footer>
    </div>
  );
}
