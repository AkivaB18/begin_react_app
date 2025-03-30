import './pantry.css';
import PantryItem from './components/PantryItem';
import { useState } from 'react';

function Pantry({}) {
    const [items, setItems] = useState([]);
    const [newName, setNewName] = useState("");

    const addItem = () => {
        if (newName.trim() === "") return;
        const newItem = { id: Date.now(), name: newName.trim(), count: 0 };
        setItems([...items, newItem]);
        setNewName("");
    };

    const increment = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, count: item.count + 1 } : item
        ));
    };

    const decrement = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, count: Math.max(0, item.count - 1) } : item
        ));
    };

    const deleteItem = () => {
        if (newName.trim() === "") return;
        const newItems = items.filter((item) => item.name !== newName);
        setItems(newItems);
        setNewName("");
    }

    return (
        <>
            <header><h1>Pantry Management</h1></header>
            <div style={{ padding: '2rem' }}>
                <div id="addItemContainer">
                    <input
                        id="itemInput"
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <button id="addItemButton" onClick={addItem}>
                        Add
                    </button>
                    <button id="addItemButton" onClick={() => deleteItem()}>
                        Delete
                    </button>
                </div>
                <div>
                    {items.map(item => (
                        <PantryItem
                            key={item.id}
                            item={item}
                            onIncrement={increment}
                            onDecrement={decrement}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Pantry;
