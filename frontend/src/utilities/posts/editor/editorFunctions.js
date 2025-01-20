import elements from '../../../data/elements'

export const handleDoubleClick = (event) => {
    const element = event.currentTarget;
    const textClasses = elements.text.classes.map(item => item.class);
    const listClasses = elements.lists.classes.map(item => item.class);

    const editableClasses = [...textClasses, ...listClasses];

    if (editableClasses.some(cls => element.classList.contains(cls))) {
        element.contentEditable = true;
        element.style.outline = "none";
        element.spellcheck = false;
        element.focus

        const handleClickOutside = (e) => {
            if (!element.contains(e.target)) {
                element.contentEditable = false;
                document.removeEventListener('mousedown', handleClickOutside);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' || e.key === 'Delete') {
                e.stopPropagation();
            }
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); 
                element.contentEditable = false;
                document.removeEventListener('mousedown', handleClickOutside);
            }
        });
    }
};

export const handleMouseDown = (e, setIsDragging, setPosition) => {
    const element = e.target.closest('.edit-styles');
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setIsDragging(true);
    setPosition(prev => ({
        ...prev,
        offsetX,
        offsetY,
    }));
}

export const handleMouseMove = (isDragging, position, setPosition, elementRef) => {
    return (e) => {
        if (isDragging && elementRef.current) {
            const newX = e.clientX - position.offsetX;
            const newY = e.clientY - position.offsetY;
            const elementHeight = elementRef.current.offsetHeight;
            const elementWidth = elementRef.current.offsetWidth;
            const boundedX = Math.max(20, Math.min(window.innerWidth - elementWidth - 20, newX));
            const boundedY = Math.max(20, Math.min(window.innerHeight - elementHeight - 20, newY));
            setPosition(prev => ({ ...prev, x: boundedX, y: boundedY }));
        }
    }
}

export const handleMouseUp = (setIsDragging) => {
    setIsDragging(false);
}