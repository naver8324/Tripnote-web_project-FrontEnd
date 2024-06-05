import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion';
import React from 'react';
import useMapStore from '../../store/useMapStore';

export default function BarRootSpot() {
  const routes = useMapStore((state) => state.routes);

  return (
    <div className="w-[340px]">
      <Accordion type="single" collapsible>
        {routes.map((route, index) => (
          <AccordionItem key={route.id} value={`item-${index + 1}`}>
            <AccordionTrigger>
              <p className="text-3xl">{`경로 ${index + 1}`}</p>
            </AccordionTrigger>
            <AccordionContent>
              <p>{route.location}</p>
              <p>{route.address}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
