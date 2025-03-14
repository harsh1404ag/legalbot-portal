
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion-01";

const items = [
  {
    id: "1",
    title: "Why Choose Lexia?",
    content:
      "Our AI-powered legal assistant analyzes decades of case law in seconds, providing unprecedented insights and assistance.",
  },
  {
    id: "2",
    title: "How does Lexia work?",
    content:
      "Lexia uses advanced machine learning algorithms to understand legal queries and provide accurate, relevant answers based on comprehensive legal databases.",
  },
  {
    id: "3",
    title: "Is Lexia replacing human lawyers?",
    content:
      "No, Lexia is designed to augment and assist legal professionals, making their work more efficient and effective while handling routine research tasks.",
  },
  {
    id: "4",
    title: "What types of legal matters can Lexia assist with?",
    content:
      "Lexia can help with a wide range of legal matters including contract analysis, case research, legal document review, and providing information on legal precedents.",
  },
];

export function AccordionDemo() {
  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full" defaultValue="1">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="py-2 border-white/20">
            <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline text-white">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="pb-2 text-gray-300">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
