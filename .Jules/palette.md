## 2024-03-01 - Keyboard Accessibility for Game Tooltips and Setup
**Learning:** Custom hover interactions that reveal vital game state (like which stats change based on a choice) leave keyboard users guessing. Similarly, visual selection lists need semantic HTML or ARIA roles for screen readers.
**Action:** Always mirror `onMouseEnter`/`onMouseLeave` state changes to `onFocus`/`onBlur` for interactive elements. When rendering custom selection lists, add `role="radiogroup"` to the container and `role="radio"`, `aria-checked` to the buttons.

## 2024-03-02 - Arrow Key Shortcuts for Repetitive Interactions
**Learning:** For Reigns-style repetitive choice games on desktop, relying solely on Tab and Enter/Space causes high interaction fatigue. Keyboard-only users shouldn't have to tab repeatedly through UI elements for the core game loop.
**Action:** Add explicit Left/Right arrow key shortcuts (via `useEffect` keydown listeners) with clear visual `<kbd>` hints on the corresponding UI elements to drastically reduce interaction fatigue.
