import React from 'react';
import { Tooltip } from 'react-tooltip';  // Corrected import
import 'react-tooltip/dist/react-tooltip.css';

const CustomTooltip = ({ id, header, description, place, fontWeight }) => {
  return (
    <>
      <Tooltip 
        id={id} 
        place={place}
        opacity={1}
        effect="solid"
        className="custom-tooltip"
        style={{
          backgroundColor: '#121212',
          color: '#ddd',
          fontSize: '14px',
          fontFamily: 'Poppins',
          borderRadius: '5px',
          padding: '12px',
          marginTop: '70px',
          maxWidth: '200px', 
        }}
        offset={[-10, 10]}  
        boundary="viewport" 
      >
        <div>
          <strong 
            className="tooltip-header" 
            style={{
              fontWeight: fontWeight || '700',
              color: '#fff',
              fontSize: '16px'
            }}
          >
            {header}
          </strong>

          <p 
            className="tooltip-description" 
            style={{
              fontWeight: fontWeight || '400',
              color: '#ccc'
            }}
          >
            {description}
          </p>
        </div>
      </Tooltip>
    </>
  );
};

export default CustomTooltip;
