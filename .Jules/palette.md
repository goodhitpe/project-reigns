## 2024-03-01 - Keyboard Accessibility for Game Tooltips and Setup
**Learning:** Custom hover interactions that reveal vital game state (like which stats change based on a choice) leave keyboard users guessing. Similarly, visual selection lists need semantic HTML or ARIA roles for screen readers.
**Action:** Always mirror `onMouseEnter`/`onMouseLeave` state changes to `onFocus`/`onBlur` for interactive elements. When rendering custom selection lists, add `role="radiogroup"` to the container and `role="radio"`, `aria-checked` to the buttons.

## 2025-02-27 - Consistent Visual Weight for Keyboard Focus
**Learning:** Standard outline `focus-visible` styles alone (like a ring) are not enough if they do not match the visual weight of mouse hover states. Users navigating via keyboard need the same level of visual feedback (e.g., background color, shadow changes) as mouse users to understand interactable elements clearly.
**Action:** When defining focus states, especially for complex UI elements like cards or large buttons, explicitly mirror the `hover:` utility classes to `focus-visible:` states (e.g., matching `hover:bg-teal-950/40` with `focus-visible:bg-teal-950/40`).

## 2024-03-02 - ARIA Roles for Game Progress and End States
**Learning:** Resource bars and critical game states like "GAMEOVER" or "VICTORY" need explicit ARIA roles to be accessible to screen readers.
**Action:** Use `role="progressbar"` with `aria-valuenow` for resource bars, and `role="alert"` with `aria-live="assertive"` for critical game state announcements.

## 2025-02-28 - Native Keyboard Navigation & ARIA Localization in Choice Games
**Learning:** In choice-based game mechanics (like swipe or dual-button games), mouse-only UI forces keyboard users to tab excessively. Furthermore, hidden ARIA attributes like `title` and `aria-label` are often forgotten during i18n/localization passes, leading to screen reader mismatch.
**Action:** Bind native keyboard keys (e.g. `ArrowLeft`, `ArrowRight`) to primary interactions to bypass UI traversal. Ensure all ARIA strings map strictly to the application's primary local language, and add `aria-live="polite"` on event logs to narrate the game loop smoothly.

## 2025-02-28 - Dual-Extreme Dangers in Balance Mechanics
**Learning:** In choice/balance-based game mechanics (like Reigns), standard progress bars mislead users by implicitly suggesting 100% is a "good" or "max" state. Since both 0% and 100% cause failure, relying purely on fill length fails to communicate the true risk of overflowing a stat.
**Action:** When working with dual-extreme stats, always add conditional "danger zone" styling (e.g. `<= 20` and `>= 80`) using urgent colors (`bg-rose-500`, `animate-pulse`), and explicitly append `<span className="sr-only">(위험)</span>` for screen readers so the critical state is clear to all users.

## 2025-02-28 - Screen-Reader Parity for Reigns-style Choices
**Learning:** In Reigns-style choice interfaces, visualizing expected consequences via hover effects on resource indicators is great for sighted users. However, screen reader users miss this crucial predictive information completely if it relies purely on visual hover feedback.
**Action:** Always inject visually hidden (`sr-only`) summaries of anticipated interactive effects into choice buttons, ensuring screen readers announce expected consequences on focus, mirroring visual hover feedback.
