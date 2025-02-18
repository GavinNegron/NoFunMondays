import './_checkbox.sass'

function Checkbox() {
    return (
        <label class="ios-checkbox blue">
            <input type="checkbox" />
            <div class="checkbox-wrapper">
            <div class="checkbox-bg"></div>
            <svg fill="none" viewBox="0 0 24 24" class="checkbox-icon">
                <path
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="3"
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