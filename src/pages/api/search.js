import axios from "axios";
export default async function handler(req, res) {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: '검색어가 필요합니다.' });
    }
  
    try {
      const apiUrl = process.env.NEXT_PUBLIC_NPM_API_URL;
      const response = await axios.get(`${apiUrl}?text=${encodeURIComponent(query)}&size=20`);
      //사이즈 조절 가능
     res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'npm 레지스트리에서 데이터를 가져오는 중 오류가 발생했습니다.' });
    }
  }
