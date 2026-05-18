export type Focus = "Strength" | "Conditioning" | "Mobility";
export type Location = "Studio" | "Outdoor";

export type Slot = {
  id: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
  time: string;
  name: string;
  focus: Focus;
  location: Location;
  place: string;
  duration: number; // minutes
  open: boolean;
};

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export const SCHEDULE: Slot[] = [
  // Mon
  { id: "m1", day: "Mon", time: "06:30", name: "Barbell Strength",  focus: "Strength",     location: "Studio",  place: "Poblenou Studio",  duration: 55, open: true  },
  { id: "m2", day: "Mon", time: "08:00", name: "Beach Conditioning",focus: "Conditioning", location: "Outdoor", place: "Barceloneta",      duration: 50, open: true  },
  { id: "m3", day: "Mon", time: "13:00", name: "Midday Mobility",   focus: "Mobility",     location: "Studio",  place: "Poblenou Studio",  duration: 40, open: false },
  { id: "m4", day: "Mon", time: "18:30", name: "Lower Body Strength",focus: "Strength",    location: "Studio",  place: "Poblenou Studio",  duration: 55, open: true  },
  // Tue
  { id: "t1", day: "Tue", time: "07:00", name: "Park Intervals",    focus: "Conditioning", location: "Outdoor", place: "Ciutadella",       duration: 45, open: true  },
  { id: "t2", day: "Tue", time: "12:30", name: "Push & Pull",       focus: "Strength",     location: "Studio",  place: "Poblenou Studio",  duration: 55, open: true  },
  { id: "t3", day: "Tue", time: "19:00", name: "Hill Repeats",      focus: "Conditioning", location: "Outdoor", place: "Montjuïc",         duration: 50, open: false },
  // Wed
  { id: "w1", day: "Wed", time: "06:30", name: "Full Body Strength",focus: "Strength",     location: "Studio",  place: "Poblenou Studio",  duration: 55, open: true  },
  { id: "w2", day: "Wed", time: "09:00", name: "Mobility Reset",    focus: "Mobility",     location: "Studio",  place: "Poblenou Studio",  duration: 40, open: true  },
  { id: "w3", day: "Wed", time: "18:00", name: "Beach Sprints",     focus: "Conditioning", location: "Outdoor", place: "Barceloneta",      duration: 45, open: true  },
  { id: "w4", day: "Wed", time: "19:30", name: "Upper Body Strength",focus: "Strength",    location: "Studio",  place: "Poblenou Studio",  duration: 55, open: false },
  // Thu
  { id: "h1", day: "Thu", time: "07:00", name: "Park Strength Circuit", focus: "Strength", location: "Outdoor", place: "Ciutadella",       duration: 50, open: true  },
  { id: "h2", day: "Thu", time: "13:00", name: "Mobility & Breath", focus: "Mobility",     location: "Studio",  place: "Poblenou Studio",  duration: 40, open: true  },
  { id: "h3", day: "Thu", time: "18:30", name: "Posterior Chain",   focus: "Strength",     location: "Studio",  place: "Poblenou Studio",  duration: 55, open: true  },
  // Fri
  { id: "f1", day: "Fri", time: "06:30", name: "Olympic Lifts",     focus: "Strength",     location: "Studio",  place: "Poblenou Studio",  duration: 55, open: false },
  { id: "f2", day: "Fri", time: "08:00", name: "Stair Conditioning",focus: "Conditioning", location: "Outdoor", place: "Bunkers del Carmel", duration: 50, open: true  },
  { id: "f3", day: "Fri", time: "12:30", name: "Midday Strength",   focus: "Strength",     location: "Studio",  place: "Poblenou Studio",  duration: 55, open: true  },
  { id: "f4", day: "Fri", time: "18:00", name: "Mobility Long",     focus: "Mobility",     location: "Studio",  place: "Poblenou Studio",  duration: 50, open: true  },
  // Sat
  { id: "s1", day: "Sat", time: "08:00", name: "Beach Conditioning",focus: "Conditioning", location: "Outdoor", place: "Barceloneta",      duration: 60, open: true  },
  { id: "s2", day: "Sat", time: "09:30", name: "Park Strength",     focus: "Strength",     location: "Outdoor", place: "Ciutadella",       duration: 55, open: true  },
  { id: "s3", day: "Sat", time: "11:00", name: "Mobility Reset",    focus: "Mobility",     location: "Studio",  place: "Poblenou Studio",  duration: 40, open: false },
];
