## 2024-05-18 - Added Keyboard Accessibility to Interactive Elements
**Learning:** Keyboard users were missing out on the tooltip hint for the game choices. Relying only on hover state made the game harder to play for non-mouse users.
**Action:** When creating custom interactive components like cards or choices, ensure that hover events (`onMouseEnter`, `onMouseLeave`) are paired with equivalent focus events (`onFocus`, `onBlur`) to provide equal feedback to all users.
