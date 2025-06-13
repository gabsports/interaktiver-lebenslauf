import { useRef, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import '../styles/Timeline.css';

export interface TimelineLink {
  label: string;
  url: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
  links?: TimelineLink[];
}

interface TimelineProps {
  events: TimelineEvent[];
  onSelect: (id: string) => void;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

/**
 * Timeline component: displays events with scroll-triggered animations.
 */
export default function Timeline({ events, onSelect }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    items?.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="timeline-container">
      {events.map((event, idx) => (
        <motion.div
          key={event.id}
          className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          onClick={() => onSelect(event.id)}
        >
          <h3>{event.title}</h3>
          <p style={{ fontStyle: 'italic' }}>{event.date}</p>
          <p>{event.description}</p>
          {event.imageUrl && (
            <img
              src={event.imageUrl}
              alt={event.title}
              style={{ width: '100%', borderRadius: '4px', marginTop: '0.5rem' }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Detail sub-component: for modal content.
 */
Timeline.Detail = function Detail({ event }: { event: TimelineEvent }) {
  return (
    <div>
      <h2>{event.title}</h2>
      <p style={{ fontStyle: 'italic' }}>{event.date}</p>
      <p>{event.description}</p>
      {event.imageUrl && (
        <img src={event.imageUrl} alt={event.title} style={{ width: '100%', borderRadius: '4px', marginTop: '1rem' }} />
      )}
      {event.links && (
        <ul style={{ marginTop: '1rem' }}>
          {event.links.map(link => (
            <li key={link.url}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
