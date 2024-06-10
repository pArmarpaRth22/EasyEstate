import React from "react";
import "./agentPage.scss";

function AgentsPage() {
  // Dummy agent data, replace this with your actual agent data
  const agents = [
    {
      id: 1,
      name: "John Doe",
      specialty: "Residential",
      image: "/image.png",
    },
    {
      id: 2,
      name: "Jane Smith",
      specialty: "Commercial",
      image: "/image.png",
    },
    // Add more agents as needed
  ];

  return (
    <div className="agentsPage">
      <h1>Our Agents</h1>
      <div className="agentList">
        {agents.map((agent) => (
          <div key={agent.id} className="agentCard">
            <img src={agent.image} alt={agent.name} />
            <div className="agentInfo">
              <h2>{agent.name}</h2>
              <p>Specialty: {agent.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AgentsPage;
