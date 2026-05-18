export type Testimonial = {
  quote: string;
  name: string;
  age: number;
  role: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Three sessions a week for nine months. I'm lifting heavier than I did at 25 and my back finally stopped flaring up.",
    name: "Marta",
    age: 38,
    role: "Product Lead",
  },
  {
    quote:
      "No theatrics. Clear programming, measured progress. The outdoor sessions on Saturdays are the reason I stayed consistent.",
    name: "Daniel",
    age: 41,
    role: "Architect",
  },
  {
    quote:
      "I travel two weeks a month. Alex adapted the plan around it without losing momentum. Strongest I've ever been.",
    name: "Júlia",
    age: 34,
    role: "Corporate Lawyer",
  },
];
