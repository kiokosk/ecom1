export async function getAllCategories() {
    const categories = await fetch('https://fakestoreapi.com/products/categories');
    return categories.json();
}

export async function getAllProducts() {
    const products = await fetch('https://fakestoreapi.com/products');
    return products.json();
}

export async function getProduct(id: string) {
    const product = await fetch(`https://fakestoreapi.com/products/${id}`);
    return product.json();
}

export async function getProductsByCategory(category: string) {
    const productsByCategory = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    return productsByCategory.json();
}