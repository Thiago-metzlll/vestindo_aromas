import React, { useState, useEffect, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Edit2 } from 'lucide-react';

const EditableText = ({ value, onSave, className, style, tagName = 'span' }) => {
    const { isAdmin } = useAdmin();
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const handleBlur = () => {
        setIsEditing(false);
        if (currentValue !== value) {
            onSave(currentValue);
        }
    };

    const Tag = tagName;

    if (!isAdmin) {
        return <Tag className={className} style={style}>{value}</Tag>;
    }

    if (isEditing) {
        return (
            <div className={`editable-container active ${className || ''}`} style={{ ...style, position: 'relative', width: '100%' }}>
                {tagName === 'textarea' ? (
                    <textarea
                        style={{
                            width: '100%',
                            minHeight: '100px',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid var(--secondary-accent)',
                            color: 'inherit',
                            padding: '10px',
                            borderRadius: '8px',
                            outline: 'none'
                        }}
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
                        onBlur={handleBlur}
                        autoFocus
                    />
                ) : (
                    <input
                        type="text"
                        style={{
                            width: '100%',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid var(--secondary-accent)',
                            color: 'inherit',
                            padding: '5px',
                            borderRadius: '4px',
                            outline: 'none'
                        }}
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
                        onBlur={handleBlur}
                        autoFocus
                    />
                )}
            </div>
        );
    }

    return (
        <div
            className={`editable-container ${className || ''}`}
            style={{ ...style, cursor: 'pointer', position: 'relative', display: 'inline-block' }}
            onClick={() => setIsEditing(true)}
        >
            <Tag>{value}</Tag>
            <div className="edit-icon-hover" style={{
                position: 'absolute',
                top: '-5px',
                right: '-20px',
                opacity: 0.3
            }}>
                <Edit2 size={12} />
            </div>
        </div>
    );
};

export default EditableText;
