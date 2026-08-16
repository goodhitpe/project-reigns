## 2025-08-16 - Add Focus States to Interactive Choice Buttons
**Learning:** Found that the main interactive choice buttons were only revealing helpful "influence gauge" hints on mouse hover (`onMouseEnter`/`onMouseLeave`). Keyboard users completely missed these important gameplay hints because focus events weren't tied to the same state.
**Action:** When working with custom hover-based tooltips or interaction hints, always bind `onFocus` and `onBlur` to mirror the mouse enter/leave handlers, and ensure buttons have proper `focus-visible` styling using Tailwind.
