import React from "react";

export default function Card({ title, description, bgColor }) {
  return (
    <div className={`p-4 rounded-lg shadow ${bgColor}`}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
