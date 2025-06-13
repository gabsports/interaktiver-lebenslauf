import { useState } from 'react';
import Timeline, { type TimelineEvent } from './components/Timeline';
import './styles/main.css';

export default function App() {
  const events: TimelineEvent[] = [
    {
      id: '1',
      title: 'Geburt',
      date: '1990',
      description: 'Ich wurde geboren.',
    },
    {
      id: '2',
      title: 'Studium',
      date: '2010',
      description: 'Beginn meines Studiums.',
    },
    {
      id: '3',
      title: 'Erster Job',
      date: '2015',
      description: 'Start in der IT Branche.',
    },
  ];

  const [selected, setSelected] = useState<TimelineEvent | null>(null);

  return (
    <div className="app-container">
      <Timeline events={events} onSelect={(id) => {
        const event = events.find((e) => e.id === id) || null;
        setSelected(event);
      }} />
      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <Timeline.Detail event={selected} />
        </div>
      )}
    </div>
  );
}
    
      
   