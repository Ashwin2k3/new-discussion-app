import React, { useState, useEffect } from 'react';
import { addEvent, getEvents } from '../services/api';

const EventSuggestion = ({ studentId }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    const { data } = await getEvents();
    setSuggestions(data);
  };

  const handleAddSuggestion = async () => {
    if (suggestion.trim()) {
      await addEvent({ student: studentId, suggestion });
      setSuggestion('');
      fetchSuggestions();
    }
  };

  return (
    <div>
      <h3>Event Suggestions</h3>
      <input
        type="text"
        value={suggestion}
        onChange={(e) => setSuggestion(e.target.value)}
        placeholder="Suggest an event..."
      />
      <button onClick={handleAddSuggestion}>Submit</button>

      <div>
        <h4>Suggestions</h4>
        {suggestions.map((event) => (
          <div key={event._id}>
            <strong>Suggestion:</strong> {event.suggestion} | <strong>Status:</strong>{' '}
            {event.status}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventSuggestion;
