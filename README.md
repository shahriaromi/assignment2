# Assignment 2

## Objective

Develop an Express application using TypeScript as the programming language, integrating MongoDB with Mongoose for effective data management. Ensure data integrity through validation using Joi/Zod.

## Project Setup and Execution

Follow these steps to set up and run the project:

### Prerequisites

Ensure you have Node.js and npm installed on your machine. If not, download and install them from [Node.js official website](https://nodejs.org/).

### Installation

1. Open your terminal.
2. Navigate to the project directory.
3. Execute the following command to install the necessary dependencies:

   ```sh
   npm install
   ```

### Environment Configuration

1. In the root directory of your project, create a `.env` file.
2. Configure your environment variables within this file as needed for your project sample file `.env.sample` is given.

### Running the Project

To start the project in production mode, execute the following command in your terminal:

```sh
npm run start:prod
```

This will launch the application with the production configuration.

# API References

## Product Management

### 1. Create a New Product

- **Endpoint:** `/api/products`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "name": "iPhone 13",
    "description": "A sleek and powerful smartphone with cutting-edge features.",
    "price": 999,
    "category": "Electronics",
    "tags": ["smartphone", "Apple", "iOS"],
    "variants": [
      {
        "type": "Color",
        "value": "Midnight Blue"
      },
      {
        "type": "Storage Capacity",
        "value": "256GB"
      }
    ],
    "inventory": {
      "quantity": 50,
      "inStock": true
    }
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Product created successfully!",
    "data": {
      "name": "iPhone 13",
      "description": "A sleek and powerful smartphone with cutting-edge features.",
      "price": 999,
      "category": "Electronics",
      "tags": ["smartphone", "Apple", "iOS"],
      "variants": [
        {
          "type": "Color",
          "value": "Midnight Blue"
        },
        {
          "type": "Storage Capacity",
          "value": "256GB"
        }
      ],
      "inventory": {
        "quantity": 50,
        "inStock": true
      }
    }
  }
  ```

### 2. Retrieve a List of All Products

- **Endpoint:** `/api/products`
- **Method:** GET
- **Response:**
  ```json
  {
    "success": true,
    "message": "Products fetched successfully!",
    "data": [
      {
        "name": "iPhone 13",
        "description": "A sleek and powerful smartphone with cutting-edge features.",
        "price": 999,
        "category": "Electronics",
        "tags": ["smartphone", "Apple", "iOS"],
        "variants": [
          {
            "type": "Color",
            "value": "Midnight Blue"
          },
          {
            "type": "Storage Capacity",
            "value": "256GB"
          }
        ],
        "inventory": {
          "quantity": 50,
          "inStock": true
        }
      },
      {
        "name": "Samsung Galaxy S21",
        "description": "High-performance Android smartphone with advanced camera capabilities.",
        "price": 799,
        "category": "Electronics",
        "tags": ["smartphone", "Samsung", "Android"],
        "variants": [
          {
            "type": "Color",
            "value": "Phantom Black"
          },
          {
            "type": "Storage Capacity",
            "value": "128GB"
          }
        ],
        "inventory": {
          "quantity": 30,
          "inStock": true
        }
      }
    ]
  }
  ```

### 3. Retrieve a Specific Product by ID

- **Endpoint:** `/api/products/:productId`
- **Method:** GET
- **Response:**
  ```json
  {
    "success": true,
    "message": "Product fetched successfully!",
    "data": {
      "name": "iPhone 13",
      "description": "A sleek and powerful smartphone with cutting-edge features.",
      "price": 999,
      "category": "Electronics",
      "tags": ["smartphone", "Apple", "iOS"],
      "variants": [
        {
          "type": "Color",
          "value": "Midnight Blue"
        },
        {
          "type": "Storage Capacity",
          "value": "256GB"
        }
      ],
      "inventory": {
        "quantity": 50,
        "inStock": true
      }
    }
  }
  ```

### 4. Update Product Information

- **Endpoint:** `/api/products/:productId`
- **Method:** PUT
- **Request Body:**
  ```json
  {
    "name": "iPhone 13",
    "description": "A sleek and powerful smartphone with cutting-edge features.",
    "price": 999,
    "category": "Electronics",
    "tags": ["smartphone", "Apple", "iOS"],
    "variants": [
      {
        "type": "Color",
        "value": "Midnight Blue"
      },
      {
        "type": "Storage Capacity",
        "value": "256GB"
      }
    ],
    "inventory": {
      "quantity": 50,
      "inStock": true
    }
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Product updated successfully!",
    "data": {
      "name": "iPhone 13",
      "description": "A sleek and powerful smartphone with cutting-edge features.",
      "price": 999,
      "category": "Electronics",
      "tags": ["smartphone", "Apple", "iOS"],
      "variants": [
        {
          "type": "Color",
          "value": "Midnight Blue"
        },
        {
          "type": "Storage Capacity",
          "value": "256GB"
        }
      ],
      "inventory": {
        "quantity": 49,
        "inStock": true
      }
    }
  }
  ```

### 5. Delete a Product

- **Endpoint:** `/api/products/:productId`
- **Method:** DELETE
- **Response:**
  ```json
  {
    "success": true,
    "message": "Product deleted successfully!",
    "data": null
  }
  ```

### 6. Search a Product

- **Endpoint:** `/api/products?searchTerm=iphone`
- **Method:** GET
- **Response:**
  ```json
  {
    "success": true,
    "message": "Products matching search term 'iphone' fetched successfully!",
    "data": [
      {
        "name": "iPhone 13 Pro",
        "description": "The latest flagship iPhone model with advanced camera features.",
        "price": 999,
        "category": "Smartphones",
        "tags": ["iPhone", "Apple", "Mobile"],
        "variants": [
          {
            "type": "Color",
            "value": "Graphite"
          },
          {
            "type": "Storage",
            "value": "256GB"
          }
        ],
        "inventory": {
          "quantity": 50,
          "inStock": true
        }
      },
      {
        "name": "iPhone SE",
        "description": "Compact and affordable iPhone model with powerful performance.",
        "price": 399,
        "category": "Smartphones",
        "tags": ["iPhone", "Apple", "Mobile"],
        "variants": [
          {
            "type": "Color",
            "value": "White"
          },
          {
            "type": "Storage",
            "value": "128GB"
          }
        ],
        "inventory": {
          "quantity": 20,
          "inStock": true
        }
      }
    ]
  }
  ```

## Order Management

### 1. Create a New Order

- **Endpoint:** `/api/orders`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "email": "level2@programming-hero.com",
    "productId": "5fd67e890b60c903cd8544a3",
    "price": 999,
    "quantity": 1
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Order created successfully!",
    "data": {
      "email": "level2@programming-hero.com",
      "productId": "5fd67e890b60c903cd8544a3",
      "price": 999,
      "quantity": 1
    }
  }
  ```

### 2. Retrieve All Orders

- **Endpoint:** `/api/orders`
- **Method:** GET
- **Response:**
  ```json
  {
    "success": true,
    "message": "Orders fetched successfully!",
    "data": [
      {
        "email": "level2@programming-hero.com",
        "productId": "5fd67e890b60c903cd8544a3",
        "price": 999,
        "quantity": 1
      }
    ]
  }
  ```

### 3. Retrieve Orders by User Email

- **Endpoint:** `/api/orders?email=level2@programming-hero.com`
- **Method:** GET
- **Response:**
  ```json
  {
    "success": true,
    "message": "Orders fetched successfully for user email!",
    "data": [
      {
        "email": "level2@programming-hero.com",
        "productId": "5fd67e890b60c903cd8544a3",
        "price": 999,
        "quantity": 1
      }
    ]
  }
  ```
