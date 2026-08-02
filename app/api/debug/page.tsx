// app/debug/page.tsx
import { fetchAllDataFromSheets } from '@/lib/data';

export default async function DebugPage() {
  const data = await fetchAllDataFromSheets();
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">📊 Data Debug</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="font-bold">Total Products</h2>
          <p className="text-3xl">{data.products.length}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="font-bold">Total Reviews</h2>
          <p className="text-3xl">{data.reviews.length}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <h2 className="font-bold">Categories</h2>
          <p className="text-3xl">25</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">📦 Sample Products (First 5)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.products.slice(0, 5).map((product) => (
            <div key={product.id} className="border p-4 rounded-lg">
              <h3 className="font-bold">{product.name}</h3>
              <p>Price: {product.price}</p>
              <p>Category: {product.categoryId}</p>
              <p>In Stock: {product.inStock ? '✅' : '❌'}</p>
              <p>Unit: {product.unit}</p>
              {product.image && (
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover mt-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">🔍 Raw Data (First Product)</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
          {JSON.stringify(data.products[0] || 'No products', null, 2)}
        </pre>
      </div>
    </div>
  );
}
