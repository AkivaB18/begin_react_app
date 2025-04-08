import { useState } from 'react';
import TabButton from './TabButton.jsx';

export default function Examples() {
  const [selectedBenefit, setSelectedBenefit] = useState();

  function handleClick(selectedButton) {
    setSelectedBenefit(selectedButton);
  }

  const BENEFITS = {
    organization: {
      title: 'Stay Organized',
      description: 'Keep track of all your pantry items in one place, so you never forget what you have.',
    },
    efficiency: {
      title: 'Save Time',
      description: 'Quickly update your pantry inventory and avoid unnecessary trips to the store.',
    },
    wasteReduction: {
      title: 'Reduce Waste',
      description: 'Know what you have and use it before it expires, reducing food waste.',
    },
    convenience: {
      title: 'Convenience',
      description: 'Access your pantry inventory anytime, anywhere, from any device.',
    },
  };

  return (
    <section id="examples">
      <h2>Why Use Pantry Management?</h2>
      <menu>
        <TabButton isSelected={selectedBenefit === 'organization'} onClick={() => handleClick('organization')}>
          Stay Organized
        </TabButton>
        <TabButton isSelected={selectedBenefit === 'efficiency'} onClick={() => handleClick('efficiency')}>
          Save Time
        </TabButton>
        <TabButton isSelected={selectedBenefit === 'wasteReduction'} onClick={() => handleClick('wasteReduction')}>
          Reduce Waste
        </TabButton>
        <TabButton isSelected={selectedBenefit === 'convenience'} onClick={() => handleClick('convenience')}>
          Convenience
        </TabButton>
      </menu>

      {!selectedBenefit ? (
        <p>Please Select a Benefit</p>
      ) : (
        <div id="tab-content">
          <h3>{BENEFITS[selectedBenefit].title}</h3>
          <p>{BENEFITS[selectedBenefit].description}</p>
        </div>
      )}
    </section>
  );
}