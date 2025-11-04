# Decision Comparison Organizer - Project Plan

## Overview
A web application that allows users to paste unstructured text about various options/items and automatically generates an organized comparison table with pros & cons, color-coded by weight (importance) and polarity (positive/negative).

## Core Features

### 1. Input Processing
- **Unstructured Text Input**: Large text area where users can paste information about multiple items
- **AI-Powered Parsing**: Use LLM to extract:
  - Individual items/options being compared
  - Pros and cons for each item
  - Weight/importance of each point
  - Polarity (positive/negative) sentiment
- **Manual Item Addition**: Allow users to add items manually if needed

### 2. Comparison Table Generation
- **Dynamic Column Layout**: One column per item/option
- **Row Organization**:
  - Header row with item names
  - Categorized rows (pros section, cons section)
  - Option: grouped by categories (price, features, quality, etc.)
- **Color Coding System**:
  - **Weight/Importance**: Intensity of color (lighter = less important, darker = more important)
  - **Polarity**: Color hue (green = positive/pro, red = negative/con, yellow/orange = neutral/mixed)
  - Example scale:
    - High importance pro: Dark green
    - Medium importance pro: Medium green
    - Low importance pro: Light green
    - High importance con: Dark red
    - Medium importance con: Medium red
    - Low importance con: Light red

### 3. Post-Generation Editing
- **Inline Editing**: Click any cell to edit text
- **Add/Remove Items**: Add new columns or delete existing ones
- **Add/Remove Points**: Add new pros/cons to any item
- **Adjust Weights**: Slider or input to change importance (1-5 or 1-10 scale)
- **Adjust Polarity**: Toggle or adjust positive/negative/neutral
- **Reorder**: Drag and drop to reorganize rows
- **Category Management**: Create custom categories and assign points to them

### 4. Export & Sharing
- **Export Options**:
  - PDF with preserved colors
  - CSV/Excel for data analysis
  - Markdown for documentation
  - Image (PNG/JPEG) for presentations
- **Share Link**: Generate shareable link to view comparison
- **Save/Load**: Save comparisons for later editing

## Technical Architecture

### Frontend Stack
**Framework**: Next.js 14+ (React)
- App Router for modern routing
- Server components for performance
- Client components for interactivity

**UI Libraries**:
- **Styling**: Tailwind CSS for utility-first styling
- **Components**: shadcn/ui for pre-built accessible components
- **Tables**: TanStack Table (React Table v8) for advanced table features
- **Drag & Drop**: dnd-kit for reordering functionality
- **Color Picker**: react-colorful for custom color adjustments
- **Icons**: Lucide React

**State Management**:
- React Context or Zustand for global state
- React Hook Form for form handling

### Backend/API
**Option 1: Serverless (Recommended)**
- Next.js API Routes
- Vercel/Netlify deployment
- Minimal backend complexity

**Option 2: Full Backend**
- Node.js/Express or Next.js API
- Database: PostgreSQL or MongoDB
- Prisma ORM for database management

### AI Integration
**LLM Service**:
- OpenAI GPT-4 or GPT-3.5 Turbo
- Anthropic Claude (alternative)
- Option for local models (Llama via Ollama)

**Processing Pipeline**:
1. User pastes unstructured text
2. Send to LLM with structured prompt
3. LLM returns JSON with:
   ```json
   {
     "items": [
       {
         "name": "Option A",
         "points": [
           {
             "text": "Great battery life",
             "type": "pro",
             "weight": 8,
             "category": "performance"
           },
           {
             "text": "Expensive",
             "type": "con",
             "weight": 6,
             "category": "price"
           }
         ]
       }
     ]
   }
   ```
4. Frontend renders table from JSON
5. User edits as needed

### Data Storage
**Short-term (MVP)**:
- Local Storage for persistence
- Session-based for temporary work

**Long-term**:
- Database for saved comparisons
- User accounts (optional)
- Sharing via unique IDs

## Color Coding Algorithm

### Weight-Based Opacity/Intensity
```javascript
// Weight scale: 1-10
const getColorIntensity = (weight) => {
  const minOpacity = 0.2;
  const maxOpacity = 1.0;
  return minOpacity + (weight / 10) * (maxOpacity - minOpacity);
};
```

### Polarity-Based Hue
```javascript
const polarityColors = {
  pro: {
    base: 'rgb(34, 197, 94)', // green-500
    light: 'rgb(134, 239, 172)', // green-300
    dark: 'rgb(21, 128, 61)' // green-700
  },
  con: {
    base: 'rgb(239, 68, 68)', // red-500
    light: 'rgb(252, 165, 165)', // red-300
    dark: 'rgb(153, 27, 27)' // red-700
  },
  neutral: {
    base: 'rgb(234, 179, 8)', // yellow-500
    light: 'rgb(253, 224, 71)', // yellow-300
    dark: 'rgb(161, 98, 7)' // yellow-700
  }
};
```

### Combined Color Function
```javascript
const getPointColor = (type, weight) => {
  const colors = polarityColors[type];
  if (weight <= 3) return colors.light;
  if (weight <= 7) return colors.base;
  return colors.dark;
};
```

## UI/UX Design

### Main Layout
```
┌─────────────────────────────────────────────────┐
│  Decision Comparison Organizer          [Save]  │
├─────────────────────────────────────────────────┤
│                                                  │
│  Paste your information below:                  │
│  ┌────────────────────────────────────────────┐ │
│  │ I'm trying to decide between:              │ │
│  │                                             │ │
│  │ iPhone 15 Pro - great camera, expensive... │ │
│  │ Samsung S24 - cheaper, good battery...     │ │
│  │ ...                                         │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  [Generate Comparison]                          │
│                                                  │
├─────────────────────────────────────────────────┤
│  Comparison Table                               │
│  ┌──────────┬──────────┬──────────┐            │
│  │ iPhone   │ Samsung  │ Pixel 8  │            │
│  ├──────────┼──────────┼──────────┤            │
│  │ 🟢🟢🟢    │ 🟢🟢      │ 🟢🟢🟢    │ Camera    │
│  │ 🔴🔴🔴    │ 🟢🟢      │ 🟢        │ Price     │
│  │ 🟢🟢      │ 🟢🟢🟢    │ 🟢🟢      │ Battery   │
│  └──────────┴──────────┴──────────┘            │
│                                                  │
│  [Export PDF] [Export CSV] [Share Link]        │
└─────────────────────────────────────────────────┘
```

### Table Features
- **Sticky Headers**: Column headers remain visible on scroll
- **Responsive**: Mobile-friendly with horizontal scroll or stacked view
- **Tooltips**: Hover over cells to see full details
- **Visual Indicators**:
  - Border thickness for weight
  - Background color for polarity
  - Icons for quick recognition (✓, ✗, ⚠)

## Implementation Phases

### Phase 1: MVP (Week 1-2)
- [ ] Set up Next.js project with Tailwind CSS
- [ ] Create basic input form component
- [ ] Integrate OpenAI API for text parsing
- [ ] Build simple comparison table component
- [ ] Implement basic color coding (3 levels: low/medium/high)
- [ ] Add local storage persistence

### Phase 2: Enhanced Editing (Week 3)
- [ ] Inline editing for all cells
- [ ] Add/remove items and points
- [ ] Weight adjustment UI (sliders)
- [ ] Drag and drop reordering
- [ ] Category management

### Phase 3: Advanced Features (Week 4)
- [ ] Advanced color customization
- [ ] Export to PDF/CSV/Markdown
- [ ] Responsive design improvements
- [ ] Loading states and error handling
- [ ] Better prompt engineering for LLM

### Phase 4: Persistence & Sharing (Week 5)
- [ ] Database setup (PostgreSQL + Prisma)
- [ ] Save/load comparisons
- [ ] Share links with unique IDs
- [ ] Optional: User accounts

### Phase 5: Polish (Week 6)
- [ ] UI/UX improvements
- [ ] Performance optimization
- [ ] Accessibility (ARIA labels, keyboard navigation)
- [ ] Analytics and user feedback
- [ ] Documentation

## File Structure
```
decision-maker/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page with input form
│   ├── comparison/
│   │   └── [id]/
│   │       └── page.tsx        # Shared comparison view
│   └── api/
│       ├── parse/
│       │   └── route.ts        # LLM parsing endpoint
│       └── comparisons/
│           └── route.ts        # CRUD for saved comparisons
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── InputForm.tsx           # Text input component
│   ├── ComparisonTable.tsx     # Main table component
│   ├── EditableCell.tsx        # Editable table cell
│   ├── WeightSlider.tsx        # Weight adjustment UI
│   ├── ColorIndicator.tsx      # Color-coded visual indicator
│   ├── ExportMenu.tsx          # Export options dropdown
│   └── ItemColumn.tsx          # Single item column
├── lib/
│   ├── ai/
│   │   └── parser.ts           # LLM integration logic
│   ├── colors/
│   │   └── colorUtils.ts       # Color calculation functions
│   ├── export/
│   │   ├── pdf.ts              # PDF export
│   │   ├── csv.ts              # CSV export
│   │   └── markdown.ts         # Markdown export
│   └── db/
│       ├── schema.ts           # Prisma schema
│       └── queries.ts          # Database queries
├── types/
│   └── comparison.ts           # TypeScript interfaces
├── public/
│   └── examples/               # Example comparisons
├── prisma/
│   └── schema.prisma           # Database schema
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Key TypeScript Interfaces

```typescript
// types/comparison.ts

export type Polarity = 'pro' | 'con' | 'neutral';

export interface ComparisonPoint {
  id: string;
  text: string;
  type: Polarity;
  weight: number; // 1-10
  category?: string;
  color?: string; // Optional custom color override
}

export interface ComparisonItem {
  id: string;
  name: string;
  points: ComparisonPoint[];
  description?: string;
}

export interface Comparison {
  id: string;
  title?: string;
  items: ComparisonItem[];
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ParsedInput {
  items: ComparisonItem[];
  categories: string[];
}
```

## LLM Prompt Template

```typescript
const PARSING_PROMPT = `You are a comparison organizer. Extract structured comparison data from the following unstructured text.

User Input:
{userInput}

Extract:
1. All items/options being compared
2. Pros and cons for each item
3. Rate each point's importance (1-10, where 10 is most important)
4. Identify categories (price, quality, features, etc.)

Return ONLY valid JSON in this exact format:
{
  "items": [
    {
      "name": "Item Name",
      "description": "Brief description if mentioned",
      "points": [
        {
          "text": "Specific pro or con",
          "type": "pro" | "con" | "neutral",
          "weight": 1-10,
          "category": "category name"
        }
      ]
    }
  ],
  "categories": ["list", "of", "categories"]
}

Rules:
- Be specific with point text
- Assign realistic weights based on context
- Use neutral for ambiguous points
- Create meaningful categories`;
```

## Deployment Strategy

### Development
- Local development: `npm run dev`
- Environment variables:
  - `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`
  - `DATABASE_URL` (for production)
  - `NEXTAUTH_SECRET` (if using auth)

### Production
**Option 1: Vercel (Recommended)**
- Automatic deployments from Git
- Serverless functions for API routes
- Edge runtime for performance
- Built-in analytics

**Option 2: Self-hosted**
- Docker container
- Node.js server
- Nginx reverse proxy
- PostgreSQL database

## Success Metrics
- Time to generate comparison: < 5 seconds
- Table editing responsiveness: < 100ms
- Mobile usability score: > 90/100
- Accessibility score: > 95/100
- User satisfaction: Can edit and understand comparisons easily

## Future Enhancements
- AI-powered suggestions for missing pros/cons
- Collaborative editing (multiple users)
- Templates for common decision types (products, jobs, housing)
- Integration with external data sources (reviews, specs)
- Scoring/ranking system based on weighted pros/cons
- Dark mode
- Multiple view modes (table, cards, list)
- Import from existing spreadsheets
- Browser extension for capturing comparison data while browsing

## Technical Considerations

### Performance
- Lazy load table rows for large comparisons
- Debounce editing inputs to reduce re-renders
- Memoize color calculations
- Use virtual scrolling for 100+ items

### Security
- Sanitize user input to prevent XSS
- Rate limit API endpoints
- Validate LLM responses
- Secure sharing tokens

### Accessibility
- ARIA labels for screen readers
- Keyboard navigation for all features
- High contrast mode support
- Focus indicators
- Alt text for color-coded elements

### Error Handling
- LLM parsing failures → Allow manual input
- Network errors → Save draft locally
- Invalid data → Validation with helpful messages
- Export failures → Retry mechanism

## Estimated Timeline
- **Week 1-2**: Core functionality (input → AI parsing → table display)
- **Week 3**: Editing features
- **Week 4**: Export and advanced features
- **Week 5**: Persistence and sharing
- **Week 6**: Polish and deployment

**Total**: ~6 weeks for full-featured v1.0

## Budget Considerations
- **AI API Costs**: ~$0.01-0.05 per comparison (OpenAI)
- **Hosting**: Free tier on Vercel/Netlify for MVP
- **Database**: Free tier PostgreSQL (Supabase/Neon)
- **Domain**: ~$10-15/year

## Risk Mitigation
- **LLM parsing failures**: Fallback to manual input mode
- **API costs**: Implement caching, rate limiting
- **Complex inputs**: Start with simpler templates, improve over time
- **Browser compatibility**: Test on major browsers (Chrome, Firefox, Safari, Edge)

---

## Next Steps
1. Review and approve this plan
2. Set up initial Next.js project structure
3. Install dependencies
4. Create basic UI mockups
5. Implement Phase 1 MVP features
