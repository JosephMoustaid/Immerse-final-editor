import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function EnvironmentSelection() {
  const navigate = useNavigate();
  const [selectedEnv, setSelectedEnv] = useState(null);

  // Define available environments
  const environments = [
    { id: 'forest', name: 'Forest', preset: 'forest' },
    { id: 'starry', name: 'Starry Night', preset: 'starry' },
    { id: 'yavapai', name: 'Yavapai', preset: 'yavapai' },
    { id: 'volcano', name: 'Volcano', preset: 'volcano' },
    { id: 'threetowers', name: 'Three Towers', preset: 'threetowers' },
    { id: 'contact', name: 'Contact', preset: 'contact' },
    { id: 'tron', name: 'Tron', preset: 'tron' },
    { id: 'arches', name: 'Arches', preset: 'arches' },
    { id: 'dream', name: 'Dream', preset: 'dream' },
    { id: 'poison', name: 'Poison', preset: 'poison' },
    { id: 'japan', name: 'Japan', preset: 'japan' },
  ];

  const handleEnvSelect = (env) => {
    setSelectedEnv(env);
  };

  const handleProceed = () => {
    if (selectedEnv) {
      // Store the selected environment and navigate to the editor
      localStorage.setItem('selectedEnv', selectedEnv.preset);
      navigate('/editor');
    } else {
      alert('Please select an environment.');
    }
  };

  return (
    <div className="environment-selection-page">
      <h2>Select Your Environment</h2>
      <div className="environment-options">
        {environments.map((env) => (
          <div
            key={env.id}
            className={`environment-option ${selectedEnv?.id === env.id ? 'selected' : ''}`}
            onClick={() => handleEnvSelect(env)}
          >
            {env.name}
          </div>
        ))}
      </div>
      <button className="btn btn-primary mt-3" onClick={handleProceed}>
        Proceed to Editor
      </button>
    </div>
  );
}

export default EnvironmentSelection;
