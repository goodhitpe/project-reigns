## 2024-03-01 - Keyboard Accessibility for Game Tooltips and Setup
**Learning:** Custom hover interactions that reveal vital game state (like which stats change based on a choice) leave keyboard users guessing. Similarly, visual selection lists need semantic HTML or ARIA roles for screen readers.
**Action:** Always mirror `onMouseEnter`/`onMouseLeave` state changes to `onFocus`/`onBlur` for interactive elements. When rendering custom selection lists, add `role="radiogroup"` to the container and `role="radio"`, `aria-checked` to the buttons.
