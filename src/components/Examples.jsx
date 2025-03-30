import {useState} from 'react'

import TabButton from './TabButton.jsx';
import { EXAMPLES } from "../data";


export default function Examples() { 
    const [selectedTopic, setSelectedTopic] = useState();
    
    function handleClick(selectedButton) {
        setSelectedTopic(selectedButton)
    }
    
    return (<section id="examples">
          <h2>React Features Involved</h2>
          <menu>
            <TabButton isSelected={selectedTopic === 'components'} onClick={() => handleClick('components')}>Components</TabButton>
            <TabButton isSelected={selectedTopic === 'jsx'} onClick={() => handleClick('jsx')}>JSX</TabButton>
            <TabButton isSelected={selectedTopic === 'props'} onClick={() => handleClick('props')}>Props</TabButton>
            <TabButton isSelected={selectedTopic === 'state'} onClick={() => handleClick('state')}>State</TabButton>
          </menu>

            {!selectedTopic ? <p>Please Select A Topic</p> : (<div id="tab-content">
            <h3>{EXAMPLES[selectedTopic].title}</h3>
            <p>{EXAMPLES[selectedTopic].description}</p>
            <code>{EXAMPLES[selectedTopic].code}</code>
          </div>)}
        </section>);
}