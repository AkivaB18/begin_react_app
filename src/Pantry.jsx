import './pantry.css';
import PantryItem from './components/PantryItem';
import { useState, useEffect } from 'react';
import { getUserProfile, updatePantryItems } from './services/authService';

function Pantry({ user, onBackClick }) {
    const [items, setItems] = useState([]);
    const [newName, setNewName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Load user's pantry items
    useEffect(() => {
        const fetchPantryItems = async () => {
            try {
                setLoading(true);
                const userData = await getUserProfile();
                setItems(userData.pantryItems || []);
                setError('');
            } catch (err) {
                setError('Failed to load pantry items. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPantryItems();
    }, []);

    // Save pantry items when they change
    const savePantryItems = async (updatedItems) => {
        try {
            await updatePantryItems(updatedItems);
        } catch (err) {
            setError('Failed to save changes. Please try again.');
            console.error(err);
        }
    };

    const addItem = async () => {
        if (newName.trim() === "") return;
        
        const newItem = { 
            name: newName.trim(), 
            count: 0 
        };
        
        const updatedItems = [...items, newItem];
        setItems(updatedItems);
        setNewName("");
        
        // Save to server
        await savePantryItems(updatedItems);
    };

    const increment = async (index) => {
        const updatedItems = [...items];
        updatedItems[index].count += 1;
        
        setItems(updatedItems);
        
        // Save to server
        await savePantryItems(updatedItems);
    };

    const decrement = async (index) => {
        const updatedItems = [...items];
        if (updatedItems[index].count > 0) {
            updatedItems[index].count -= 1;
            
            setItems(updatedItems);
            
            // Save to server
            await savePantryItems(updatedItems);
        }
    };

    const deleteItem = async (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
        
        // Save to server
        await savePantryItems(updatedItems);
    };

    if (loading) {
        return <div className="loading">Loading pantry items...</div>;
    }

    return (
        <>
            <header>
                <h1>My Pantry</h1>
                <p className="user-info">Logged in as: {user?.username}</p>
                <button className="back-button" onClick={onBackClick}>Back to Home</button>
            </header>
            <div className="pantry-container">
                {error && <p className="error-message">{error}</p>}
                <div id="addItemContainer">
                    <input
                        id="itemInput"
                        type="text"
                        value={newName}
                        placeholder="Enter item name"
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <button id="addItemButton" onClick={addItem}>
                        Add
                    </button>
                </div>
                <div className="items-container">
                    {items.length === 0 ? (
                        <p className="empty-pantry">Your pantry is empty. Add some items!</p>
                    ) : (
                        items.map((item, index) => (
                            <div key={index} className="pantry-item-container">
                                <PantryItem
                                    item={item}
                                    onIncrement={() => increment(index)}
                                    onDecrement={() => decrement(index)}
                                />
                                <button 
                                    className="delete-item-button"
                                    onClick={() => deleteItem(index)}
                                >
                                    ×
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default Pantry;