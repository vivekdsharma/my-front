import { useState } from 'react';
import { getTripPreview } from '../services/tripService';

const ResultsPage = () => {
  const [preview, setPreview] = useState(null);

  const handlePreview = async () => {
    const payload = {
      destinationCity: "Mumbai",
      includeFlight: true,
      includeHotel: true,
      includeDriver: false,
      includeGuide: true
    };

    try {
      const data = await getTripPreview(payload);
      setPreview(data);
    } catch (err) {
      console.error("Error fetching trip preview", err);
    }
  };

  return (
    <div>
      <button onClick={handlePreview}>Get Trip Preview</button>
      {preview && (
        <div>
          <h3>Total: ₹{preview.totalCost}</h3>
          <ul>
            {preview.details.map((d, idx) => <li key={idx}>{d}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
