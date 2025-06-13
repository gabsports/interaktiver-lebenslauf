import { useState } from 'react';
import Timeline, { type TimelineEvent } from '../components/Timeline';
import TopButtonBar from '../components/TopButtonBar';

interface TimelinePageProps {
  events: TimelineEvent[];
}

export default function TimelinePage({ events }: TimelinePageProps) {
  const [selected, setSelected] = useState<TimelineEvent | null>(null);

  return (
    <div>
      <TopButtonBar />
      <div style={{ padding: '2rem' }}>
        <Timeline
          events={events}
          onSelect={(id) => {
            const event = events.find((e) => e.id === id) || null;
            setSelected(event);
          }}
        />
      </div>
      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <Timeline.Detail event={selected} />
        </div>
      )}
    </div>
  );
}
