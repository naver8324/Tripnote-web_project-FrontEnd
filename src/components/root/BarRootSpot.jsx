import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion';
import React from 'react';

export default function BarRootSpot() {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <p className="text-3xl">경로 1</p>
          </AccordionTrigger>
          <AccordionContent>경로A - 경로B - 경로C</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <p className="text-3xl">경로 2</p>
          </AccordionTrigger>
          <AccordionContent>경로A - 경로B - 경로C</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            <p className="text-3xl">경로 3</p>
          </AccordionTrigger>
          <AccordionContent>경로A - 경로B - 경로C</AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
