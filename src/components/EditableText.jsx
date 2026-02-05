import React, { useState, useEffect, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Check, X, Edit3 } from 'lucide-react';

const EditableText = ({ value, onSave, style, className }) => {
    const { isAdmin } = useAdmin();
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);
    const inputRef = useRef(null);

    useEffect(() => {
        setTempValue(value);
    }, [value]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleSave = () => {
        onSave(tempValue);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempValue(value);
        setIsEditing(false);
    };

    if (!isAdmin) {
        return <span style={style} className={className}>{value}</span>;
    }

    if (isEditing) {
        return (
            <div className="editable-container" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', width: '100%' }}>
                <input
                    ref={inputRef}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSave();
                        if (e.key === 'Escape') handleCancel();
                    }}
                    style={{
                        ...style,
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid var(--secondary-accent)',
                        borderRadius: '4px',
                        color: 'inherit',
                        padding: '2px 5px',
                        outline: 'none',
                        width: '100%'
                    }}
                />
                <button onClick={handleSave} style={{ background: 'none', border: 'none', color: '#4ade80', cursor: 'pointer' }}><Check size={16} /></button>
                <button onClick={handleCancel} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}><X size={16} /></button>
            </div>
        );
    }

    return (
        <span
            className={`editable-text ${className || ''}`}
            style={{ ...style, cursor: 'pointer', borderBottom: '1px dashed rgba(255,255,255,0.3)' }}
            onClick={() => setIsEditing(true)}
            title="Clique para editar"
        >
            {value}
            <Edit3 size={12} style={{ marginLeft: '5px', opacity: 0.5 }} />
        </span>
    );
};

export default EditableText;
