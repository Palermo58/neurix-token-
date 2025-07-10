# API Documentation

## POST /api/verify
- Description: Verify product authenticity by barcode or metadata.
- Request Body:
  ```json
  {
    "barcode": "string"
  }
  ```
- Response:
  ```json
  {
    "valid": true,
    "score": 0.92,
    "metadata": {
      "brand": "Example",
      "origin": "USA"
    }
  }
  ```
