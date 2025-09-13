'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '@/services/api';

export default function TestApiPage() {
  const [result, setResult] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('TestApiPage useEffect triggered');
    const testApi = async () => {
      try {
        console.log('Calling getProducts');
        const data = await getProducts();
        console.log('getProducts returned:', data);
        setResult(data);
        setLoading(false);
      } catch (err) {
        console.error('Error in testApi:', err);
        setError((err as Error).message);
        setLoading(false);
      }
    };

    testApi();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <h1>API Test Results</h1>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}