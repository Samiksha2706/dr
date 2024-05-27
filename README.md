# dr
I have engineered a mock server with conditional API functionality for a simple Django-React to-do application. This setup allows for routing between the original and mock servers based on the 'USE_MOCK' variable. Additionally, it includes a fallback mechanism to the original API if needed. The project seamlessly integrates these features, providing a robust and flexible development environment.

This is how it works:

Conditional Routing: The application decides whether to call the original or the mock API based on the value of the 'USE_MOCK' variable. If 'USE_MOCK' is set to true, the mock server is used; otherwise, the original server is called.

Fallback Mechanism: If the mock server fails or encounters an issue, the application automatically falls back to the original API. This ensures that the application remains functional even if the mock server is not available.

This implementation enhances the development process by allowing developers to test the application with a mock server while still having the reliability of the original API as a fallback option.
