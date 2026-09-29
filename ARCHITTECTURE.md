# Ticket QR Code Generator Worker

## 1. Project Overview

The Ticket QR Code Generator Worker is a web application intended for floor staff who need a simple and reliable interface for generating ticket QR codes.

The application should prioritize:

- Clear task-focused UI
- Fast interaction
- Consistent data handling
- Reliable behavior on slow connections
- Proper handling of empty states
- Proper handling of invalid input
- Accessibility
- Input security
- Responsive design

No unnecessary decorative functionality should be introduced.

---

## 2. Primary User

### Floor Staff

The primary user needs to access the Ticket QR Code Generator Worker interface and complete the primary ticket QR generation task without unnecessary complexity.

---

## 3. Secondary User

### Manager

The manager needs the generated data to remain structured and consistent so that the resulting outputs can be relied upon.

---

## 4. Core Requirements

The application must provide:

1. A clear Ticket QR Code Generator Worker interface.
2. Immediate feedback when users interact with the interface.
3. Structured handling of ticket data.
4. Validation for malformed or missing input.
5. Loading feedback during asynchronous operations.
6. User-friendly empty states.
7. Responsive behavior across screen sizes.
8. Keyboard-accessible interactive elements.
9. Appropriate ARIA labels.
10. Sanitization of text input before storing it in application state.

---

## 5. Happy Path

The primary flow should allow a user to:

1. Open the Ticket QR Code Generator Worker.
2. Understand what information is required.
3. Enter valid ticket information.
4. Submit the information.
5. Receive appropriate feedback.
6. Generate the required QR output.
7. Continue using the interface without unnecessary navigation.

The exact ticket fields and QR payload format must follow the final application specification and must not be invented.

---

## 6. Unhappy Path

The application must handle failure states explicitly.

### Empty State

If there is no data to display:

- Do not show a blank screen.
- Display a clear "No data found" message.
- Provide useful context to the user.

### Bad Connectivity

The application must assume that a user may have a slow 3G connection.

During asynchronous operations:

- Display a visible loading indicator.
- Prevent confusing duplicate interactions where appropriate.
- Preserve useful user context.

### Invalid Input

If the submitted information is:

- Missing
- Malformed
- Invalid

the application must:

- Prevent submission.
- Identify the problematic field.
- Provide a clear validation message.
- Visually identify invalid fields.

---

## 7. Accessibility

The application must be designed for keyboard navigation.

Interactive elements must:

- Have accessible names.
- Have appropriate ARIA labels where necessary.
- Be reachable using the keyboard.
- Provide visible focus states.
- Use semantic HTML where possible.

The implementation should target a 100% Lighthouse accessibility score.

---

## 8. Security

All text inputs must be treated as untrusted input.

Before storing user-provided text in application state:

- Sanitize the input.
- Prevent unsafe HTML/script injection.
- Avoid rendering untrusted HTML directly.

No real API keys or sensitive credentials may be hardcoded into source files.

---

## 9. Telemetry Simulation

The application must simulate an analytics event whenever the primary action is successfully completed.

The console message should follow this format:

[Analytics] User interacted with Ticket QR Code Generator Worker

This is only a simulation. No external analytics service is required unless separately specified.

---

## 10. Responsive Design

The interface must work across:

- Mobile
- Tablet
- Desktop

The design system should maintain consistent spacing.

Preferred spacing values should use a consistent scale such as:

- 8px
- 16px
- 24px
- 32px

---

## 11. Design System

The visual design must remain:

- Clean
- Monochromatic
- Corporate
- Structured
- Minimal

Do not introduce:

- Purple gradients
- Decorative gradients
- Random colors
- Excessive animations
- Fake statistics
- Fake testimonials
- Fake customer counts
- Artificial marketing claims

Spacing, typography, borders and component behavior should remain consistent.

---

## 12. Architecture Direction

The application should be separated into:

### Presentation Layer

Responsible for:

- UI
- Forms
- Validation feedback
- Loading states
- Empty states
- Error states

### Application Logic

Responsible for:

- Ticket data handling
- QR generation workflow
- Input validation
- Sanitization
- State transitions

### Data Layer

Responsible for:

- Data structures
- API communication
- Persistence contracts where required

The exact implementation should remain modular so that individual responsibilities can be tested independently.

---

## 13. Testing Strategy

The project follows a test-driven development workflow.

The intended sequence is:

1. Define acceptance criteria.
2. Write tests.
3. Run tests and observe failures.
4. Implement the minimum required functionality.
5. Run tests again.
6. Fix failures.
7. Refactor without breaking tests.
8. Manually verify the unhappy paths.

Tests should cover both successful and failure scenarios.

---

## 14. Definition of Done

Before deployment:

- Application runs successfully.
- No fatal runtime errors exist.
- ESLint reports zero warnings.
- No unused imports remain.
- Happy-path requirements work.
- Unhappy-path requirements work.
- Accessibility requirements are satisfied.
- PROMPTS.md exists in the repository root.
- No real API keys are committed.
- No sensitive personal information is hardcoded.
- Responsive behavior is verified.
- Production build succeeds.
