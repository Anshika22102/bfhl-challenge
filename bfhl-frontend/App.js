import React, { useState } from 'react';

function App() {
    const [jsonData, setJsonData] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleSubmit = async () => {
        try {
            const res = await fetch('https://your-backend-url.herokuapp.com/bfhl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: JSON.parse(jsonData) })
            });
            const result = await res.json();
            setResponse(result);
        } catch (error) {
            alert('Error in submission. Please check the JSON format.');
        }
    };

    const renderResponse = () => {
        if (!response) return null;

        let displayData = {};
        if (selectedFilters.includes('Numbers')) displayData.numbers = response.numbers;
        if (selectedFilters.includes('Alphabets')) displayData.alphabets = response.alphabets;
        if (selectedFilters.includes('Highest lowercase alphabet')) displayData.highest_lowercase_alphabet = response.highest_lowercase_alphabet;

        return (
            <pre>{JSON.stringify(displayData, null, 2)}</pre>
        );
    };

    return (
        <div className="App">
            <h1>Bajaj Finserv Health Challenge</h1>
            <textarea 
                value={jsonData} 
                onChange={(e) => setJsonData(e.target.value)} 
                placeholder='Enter JSON'
            />
            <button onClick={handleSubmit}>Submit</button>

            <div>
                <label>
                    <input
                        type="checkbox"
                        value="Numbers"
                        onChange={(e) => setSelectedFilters(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(f => f !== e.target.value))}
                    />
                    Numbers
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Alphabets"
                        onChange={(e) => setSelectedFilters(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(f => f !== e.target.value))}
                    />
                    Alphabets
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Highest lowercase alphabet"
                        onChange={(e) => setSelectedFilters(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(f => f !== e.target.value))}
                    />
                    Highest lowercase alphabet
                </label>
            </div>

            {renderResponse()}
        </div>
    );
}

export default App;
