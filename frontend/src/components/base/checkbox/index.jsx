import './_checkbox.sass'

function Checkbox({ checked, onChange }) {
    return (
        <label class="ios-checkbox blue">
            <input type="checkbox" checked={checked} onChange={onChange}  />
            <div class="checkbox-wrapper">
            <div class="checkbox-bg"></div>
            <svg fill="none" viewBox="0 0 24 24" class="checkbox-icon">
                <path
                stroke="currentColor"
                d="M4 12L10 18L20 6"
                class="check-path"
                ></path>
            </svg>
            </div>
        </label>
    );
  }
  
  export default Checkbox;