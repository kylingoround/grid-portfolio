import { DemoSection } from './components/DemoSection';
import Chat from './components/Chat';
import Chat2 from './components/Chat2';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <DemoSection />
      <DemoSection />
      <DemoSection />
      <Chat2 />
    </main>
  );
}
