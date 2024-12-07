import React from 'react';
import { Tooltip } from 'react-tooltip';  // Corrected import
import 'react-tooltip/dist/react-tooltip.css';

const CustomTooltip = ({ id, header, description, place, fontWeight }) => {
  let offset = [0, 0];  
  let margin;
  let weight;
  
  if (place === 'bottom') {
    offset = [-10, 10];  
    margin = '70px 0 0 0'
  }

  if (place === 'right') {
    margin = '0 0 0 90px'
  }

  if (!fontWeight) {
    if(!description) {
      weight = '500'
    }
  } else {
    weight = fontWeight
  }
  return (
    <>
      <Tooltip 
        id={id} 
        place={place}
        effect="solid"
        className="custom-tooltip"
        style={{
          backgroundColor: '#121212',
          color: '#ddd',
          fontSize: '14px',
          fontFamily: 'Poppins',
          borderRadius: '5px',
          padding: '12px',
          margin: margin,
          maxWidth: '200px', 
          zIndex: 2000
        }}
        offset={offset}  
        boundary="viewport" 
        >
        <div>
          <strong 
            className="tooltip-header" 
            style={{
              fontWeight: weight || '700',
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
