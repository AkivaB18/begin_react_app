import React from 'react';
import "./pantryitem.css";

export default function PantryItem({ item, onIncrement, onDecrement }) {
  return (
    <div className="pantryItem">
      <span id="itemName">{item.name}</span>
      <span id="editAmount">
        <button onClick={() => onDecrement(item.id)}>-</button>
        <span>{item.count}</span>
        <button onClick={() => onIncrement(item.id)}>+</button>
      </span>
    </div>
  );
}
