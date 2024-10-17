interface AccordionProps {
  children: React.ReactNode;
}

function Accordion({ children }: AccordionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded shadow-lg mt-2 text-base">
      {children}
    </div>
  );
}

export default Accordion;
