import { useState } from 'react';
import ThreeScene from '../components/ThreeScene';
import Timeline, { type TimelineEvent } from '../components/Timeline';

interface HomePageProps {
  events: TimelineEvent[];
}

export default function HomePage({ events }: HomePageProps) {
  const [selected, setSelected] = useState<TimelineEvent | null>(null);

  return (
    <div className="app-container">
      <ThreeScene
        events={events}
        onSelect={(id) => {
          const event = events.find((e) => e.id === id) || null;
          setSelected(event);
        }}
      />
      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <Timeline.Detail event={selected} />
        </div>
      )}
    </div>
  );
}
