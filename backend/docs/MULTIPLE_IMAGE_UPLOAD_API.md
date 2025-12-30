# Multiple Image Upload API Documentation

## Overview
The product API now supports uploading multiple images (up to 5) per product.

---

## Endpoints

### 1. Create Product with Multiple Images

**POST** `/api/v1/product/create`

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

**Form Data:**
```
pname: "Product Name"
price: 1999
category: "Men"
soldcount: 0
images: [File, File, File] // Up to 5 image files
```

**Response:**
```json
{
  "message": "Product created successfully!",
  "newProduct": {
    "_id": "...",
    "pname": "Product Name",
    "price": 1999,
    "image": "https://cloudinary.com/image1.jpg",  // Primary image
    "images": [
      "https://cloudinary.com/image1.jpg",
      "https://cloudinary.com/image2.jpg",
      "https://cloudinary.com/image3.jpg"
    ],
    "category": "Men",
    "cloudinary_id": "product_uploads/abc123",
    "cloudinary_ids": [
      "product_uploads/abc123",
      "product_uploads/def456",
      "product_uploads/ghi789"
    ],
    "soldcount": 0
  }
}
```

---

### 2. Update Product - Add New Images

**PUT** `/api/v1/product/update/:id`

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

**Form Data:**
```
pname: "Updated Product Name" (optional)
price: 2499 (optional)
category: "Women" (optional)
images: [File, File] // New images to add
removeImageIds: ["product_uploads/abc123"] // Cloudinary IDs to remove (optional)
```

**Response:**
```json
{
  "message": "Product updated",
  "updatedProduct": {
    "_id": "...",
    "pname": "Updated Product Name",
    "images": [
      "https://cloudinary.com/image2.jpg",
      "https://cloudinary.com/image3.jpg",
      "https://cloudinary.com/new_image1.jpg",
      "https://cloudinary.com/new_image2.jpg"
    ],
    "cloudinary_ids": [
      "product_uploads/def456",
      "product_uploads/ghi789",
      "product_uploads/new123",
      "product_uploads/new456"
    ]
  }
}
```

---

### 3. Delete Product (with all images)

**DELETE** `/api/v1/product/delete/:id`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

*Note: All associated images are automatically deleted from Cloudinary*

---

## File Validation

### Allowed File Types
- `image/jpeg`
- `image/jpg`
- `image/png`
- `image/webp`

### File Size Limit
- Maximum: **5MB per image**

### Maximum Files
- **5 images** per product

---

## Frontend Integration Example

### Using FormData with Multiple Files

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('pname', productName);
  formData.append('price', price);
  formData.append('category', category);
  
  // Append multiple files
  for (let i = 0; i < selectedFiles.length; i++) {
    formData.append('images', selectedFiles[i]);
  }
  
  const response = await axios.post(
    'http://localhost:5000/api/v1/product/create',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    }
  );
};
```

### HTML Input for Multiple Files

```html
<input 
  type="file" 
  multiple 
  accept="image/*"
  onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
  max="5"
/>
```

---

## Error Responses

### Invalid File Type
```json
{
  "message": "Invalid file type. Only JPEG, PNG, and WEBP images are allowed."
}
```

### File Too Large
```json
{
  "message": "File too large. Maximum size is 5MB per image."
}
```

### Too Many Files
```json
{
  "message": "Too many files. Maximum 5 images allowed."
}
```

### Upload Failed
```json
{
  "message": "Failed to upload images",
  "error": "Error details..."
}
```

---

## Backward Compatibility

- Existing products with single `image` field will continue to work
- The `image` field always contains the primary (first) image
- Frontend should check `images` array first, fallback to `image` field
- Old API calls using single file upload will still work but are deprecated
