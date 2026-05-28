🧪 Add tests for useCart hook

🎯 What:
The `useCart` hook lacked tests, making it risky to refactor or update its logic. This PR adds a comprehensive test suite for `useCart` using Vitest and React Testing Library.

📊 Coverage:
* Throws error if used outside `CartProvider`
* Initializes with empty cart when `localStorage` is empty or invalid
* Initializes with items from `localStorage`
* Adds new items
* Increments quantity if adding an existing item
* Sets quantity of an item and prevents setting it below 1
* Removes an item by id
* Clears the cart
* Toggles the cart open state
* Generates correct WhatsApp checkout URL with/without notes and project info

✨ Result:
Significantly improved test coverage. The core state management for the application's cart is now well-tested and protected against regressions.
