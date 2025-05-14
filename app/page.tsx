import { DemoSection } from "./components/DemoSection";
import { ChatComponent } from "@/app/components/chat";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <DemoSection />
      <DemoSection />
      <DemoSection />
      <ChatComponent />
    </main>
  );
}

// add a project section
//  add a timeline section
