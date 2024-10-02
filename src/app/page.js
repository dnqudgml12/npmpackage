"use client"
import axios from "axios";
import { useState } from "react";
export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchPackages = async () => {
    if (!query) return;

    try {
      const res = await axios.get(`/api/search?query=${query}`);
      setResults(res.data.objects);
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <h1>npm 패키지 검색</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
      <button onClick={searchPackages}>검색</button>
      <ul>
        {results.map((pkg) => (
          <li key={pkg.package.name}>
            <h3>{pkg.package.name}</h3>
            <p>{pkg.package.description}</p>
            <p>최신 버전: {pkg.package.version}</p>
          </li>
        ))}
      </ul>
    </div>
  );

}
