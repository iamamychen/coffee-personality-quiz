# Coffee Personality Quiz - Requirements

## Overview
A personality quiz that recommends a coffee drink based on the user's lifestyle preferences. Built for Basecamp Coffee's loyalty program.

---

## Personality → Coffee Pairings (4 results)

| Personality | Coffee | Tagline |
|-------------|--------|---------|
| Bold Adventurer | Double Espresso | "You live for intensity" |
| Health Nut | Oat Milk Americano | "Wellness in every sip" |
| Practical Pragmatist | Large Drip, Whatever's Fresh | "Just make it work" |
| Indulgent Treat | Mocha with Whip | "Coffee is dessert" |

---

## Result Display
**Single recommendation** - Show only the top personality match with its coffee recommendation.

Example: "You're a Bold Adventurer! Your coffee: Double Espresso"

---

## Visual Style
**Warm & Cozy (Style 4)**
- Earth tones: browns, creams, warm neutrals
- Soft gradients and rounded corners
- Serif headings (Lora font)
- Inviting, coffee-shop feel
- Clean card-based layout

---

## Visual Elements
- **Images:** Skip for now (can add later)
- **Icons:** No icons - text-only answers

---

## Quiz Questions (5 total)

### Question 1: What's your ideal weekend morning?
| Answer | Maps to |
|--------|---------|
| Sleeping in, then treating myself to something delicious | Indulgent Treat |
| Up early for a workout or hike | Health Nut |
| Whatever gets me moving efficiently | Practical Pragmatist |
| Trying something new and spontaneous | Bold Adventurer |

### Question 2: You're picking a restaurant. What matters most?
| Answer | Maps to |
|--------|---------|
| The dessert menu looks incredible | Indulgent Treat |
| They have healthy, fresh options | Health Nut |
| It's nearby and has good reviews | Practical Pragmatist |
| It's a new spot I've never tried | Bold Adventurer |

### Question 3: How do you approach a long to-do list?
| Answer | Maps to |
|--------|---------|
| Reward myself with treats along the way | Indulgent Treat |
| Break it into energizing chunks with movement breaks | Health Nut |
| Just power through, most efficient path | Practical Pragmatist |
| Tackle the hardest thing first for the rush | Bold Adventurer |

### Question 4: What's your travel style?
| Answer | Maps to |
|--------|---------|
| Comfort and indulgence - nice hotels, good food | Indulgent Treat |
| Active adventures - hiking, biking, exploring | Health Nut |
| Well-planned with a practical itinerary | Practical Pragmatist |
| Spontaneous - book a flight and figure it out | Bold Adventurer |

### Question 5: It's Friday night. What sounds best?
| Answer | Maps to |
|--------|---------|
| Cozy movie night with snacks and sweets | Indulgent Treat |
| Yoga class or an evening run | Health Nut |
| Low-key dinner, early bedtime | Practical Pragmatist |
| Saying yes to whatever adventure comes up | Bold Adventurer |

---

## Logic
1. User answers all 5 questions
2. Each answer adds a point to the corresponding personality
3. At the end, tally points for each personality
4. Display the personality with the most points (ties go to first selected)
5. Show the personality name, tagline, and coffee recommendation

---

## Technical Notes
- Framework: Next.js
- No database needed (client-side scoring)
- Mobile-responsive design
- Single-page quiz flow with progress indicator
