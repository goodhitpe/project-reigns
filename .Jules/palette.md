## 2026-08-17 - Accessibility: Mirror Hover States
**Learning:** Relying solely on hover states for dynamic game UI feedback (like showing resource preview hints) hides critical mechanics from keyboard-only or screen reader users. Interaction effects must be mirrored.
**Action:** Always map hover interactions (onMouseEnter/Leave) to focus events (onFocus/Blur) on interactive elements, and add `focus-visible` utility classes to visually distinct focus indicators for keyboard accessibility.
