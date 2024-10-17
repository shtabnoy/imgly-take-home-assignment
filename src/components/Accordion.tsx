interface AccordionProps {
  children: React.ReactNode;
}

function Accordion({ children }: AccordionProps) {
  return (
    <div className="bg-white text-black p-4 rounded shadow-lg mt-2 text-base">
      {children}
    </div>
  );
}

export default Accordion;
