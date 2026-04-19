import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  Check,
  Cloud,
  Coffee,
  MapPinned,
  Search,
  ShoppingCart,
  Sun,
  Sunrise,
  Umbrella,
  UtensilsCrossed,
  Wind,
} from 'lucide-react';
import {
  foodStrategy,
  forecast,
  groceryChecklist,
  itinerary,
  options,
  packingChecklist,
  tripMeta,
} from './data';

const weatherIcons = {
  sun: Sun,
  cloud: Cloud,
  rain: Umbrella,
  sunrise: Sunrise,
  wind: Wind,
};

const filters = ['All', 'Resort dining', 'Local gems', 'Groceries', 'Activities'];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sea/80">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-ink/70">{description}</p>
    </div>
  );
}

function App() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [query, setQuery] = useState('');

  const filteredOptions = useMemo(() => {
    return options.filter((option) => {
      const matchesFilter = activeFilter === 'All' || option.category === activeFilter;
      const matchesQuery = [option.name, option.vibe, option.area, option.bestFor]
        .join(' ')
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  return (
    <div className="min-h-screen bg-mist font-body text-ink">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,#dcecf0_0%,#eef4f7_25%,#fbf8f2_100%)]" />
      <div className="fixed inset-0 -z-10 bg-grain opacity-70" />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(135deg,rgba(22,36,58,0.96),rgba(50,124,143,0.88),rgba(121,182,183,0.75))] p-6 text-white shadow-glow sm:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
                <MapPinned className="h-4 w-4" />
                {tripMeta.location}
              </div>
              <h1 className="mt-6 max-w-3xl font-display text-5xl leading-tight sm:text-6xl">
                {tripMeta.destination}
              </h1>
              <div className="mt-5 flex flex-wrap gap-3 text-sm text-white/80">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                  <CalendarDays className="h-4 w-4" />
                  {tripMeta.dates}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                  <Coffee className="h-4 w-4" />
                  Cozy coastal family reset
                </span>
              </div>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">{tripMeta.vibe}</p>
            </div>

            <div className="rounded-[1.75rem] border border-white/20 bg-white/12 p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.25em] text-white/70">Trip vibe</p>
              <ul className="mt-5 space-y-4">
                {tripMeta.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 rounded-full bg-white/20 p-1">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-base leading-7 text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl bg-[rgba(255,255,255,0.12)] p-4">
                <p className="text-sm text-white/70">Planning lens</p>
                <p className="mt-2 text-sm leading-6 text-white/90">
                  Prioritize scenic moments on Thursday, keep Tuesday and Wednesday flexible, and
                  make arrival/departure days as frictionless as possible.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-glow backdrop-blur sm:p-8">
            <SectionHeading
              eyebrow="Forecast"
              title="Weather-aware daily flow"
              description="A forecast-informed overview for Apr 20 through Apr 24 so the trip can flex around temperature swings, mist, and your best outdoor window."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-1">
              {forecast.map((day, index) => {
                const Icon = weatherIcons[day.icon];

                return (
                  <motion.article
                    key={day.date}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.06, duration: 0.45 }}
                    className="rounded-[1.5rem] border border-ink/8 bg-mist/90 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.22em] text-sea">{day.date}</p>
                        <h3 className="mt-2 text-2xl font-semibold text-ink">{day.title}</h3>
                        <p className="mt-2 text-sm text-ink/65">{day.summary}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-3 text-sea shadow-sm">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {day.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ink/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-end justify-between gap-4 border-t border-ink/8 pt-4">
                      <p className="text-sm font-medium text-ink/70">Temps: {day.temp} F</p>
                      <p className="max-w-xs text-right text-sm text-ink/70">{day.mood}</p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(233,210,170,0.55),rgba(255,255,255,0.82))] p-6 shadow-glow backdrop-blur sm:p-8">
            <SectionHeading
              eyebrow="Food game plan"
              title="Keep meals fun, not complicated"
              description="A simple strategy that protects the vibe: anchor a few moments, stock the room well, and let weather decide the rest."
            />
            <div className="mt-8 space-y-4">
              {foodStrategy.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                  className="flex gap-4 rounded-[1.35rem] border border-white/70 bg-white/70 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-coral text-white">
                    <UtensilsCrossed className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-7 text-ink/75">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-glow backdrop-blur sm:p-8">
          <SectionHeading
            eyebrow="Itinerary"
            title="Day-by-day trip flow"
            description="A flexible itinerary with enough structure to feel organized and enough slack to make the weather and family energy your guide."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-5">
            {itinerary.map((item, index) => (
              <motion.article
                key={item.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.07, duration: 0.45 }}
                className="flex h-full flex-col rounded-[1.5rem] border border-ink/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(238,244,247,0.92))] p-5"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-sea">{item.day}</p>
                <h3 className="mt-3 text-xl font-semibold text-ink">{item.theme}</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-ink/72">
                  {item.agenda.map((entry) => (
                    <li key={entry} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-coral" />
                      <span>{entry}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-2xl bg-sea/8 p-4 text-sm leading-6 text-ink/70">
                  {item.anchor}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-glow backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Explore"
              title="Searchable trip options"
              description="Filter across resort dining, local gems, groceries, and activities to quickly decide what fits the day, the weather, and everybody’s mood."
            />
            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] lg:w-[28rem]">
              <label className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-mist px-4 py-3">
                <Search className="h-4 w-4 text-sea" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search chowder, coffee, rainy day..."
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/40"
                />
              </label>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full px-4 py-3 text-sm font-medium transition ${
                      activeFilter === filter
                        ? 'bg-ink text-white'
                        : 'bg-mist text-ink/70 hover:bg-sea/10'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredOptions.map((option, index) => (
              <motion.article
                key={option.name}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.03, duration: 0.35 }}
                className="rounded-[1.45rem] border border-ink/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(243,247,248,0.94))] p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-sea/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sea">
                    {option.category}
                  </span>
                  <span className="text-sm text-ink/45">{option.area}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-ink">{option.name}</h3>
                <p className="mt-2 text-sm font-medium text-coral">{option.vibe}</p>
                <p className="mt-4 text-sm leading-7 text-ink/72">{option.bestFor}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(53,88,73,0.95),rgba(63,109,91,0.92))] p-6 text-white shadow-glow sm:p-8">
            <SectionHeading
              eyebrow="Prep"
              title="Packing and prep checklist"
              description="Pack for chilly ocean air first, then layer in the nice-to-haves that make a family trip smoother."
            />
            <div className="mt-8 grid gap-3">
              {packingChecklist.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.04, duration: 0.3 }}
                  className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3"
                >
                  <span className="rounded-full bg-white/15 p-1.5">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-6 text-white/90">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(233,210,170,0.9),rgba(255,255,255,0.88))] p-6 shadow-glow sm:p-8">
            <SectionHeading
              eyebrow="Stock up"
              title="Grocery checklist"
              description="Hit the basics once, then stop spending vacation energy on snack logistics and forgotten breakfast items."
            />
            <div className="mt-8 grid gap-3">
              {groceryChecklist.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.04, duration: 0.3 }}
                  className="flex items-center gap-3 rounded-2xl border border-ink/8 bg-white/75 px-4 py-3"
                >
                  <span className="rounded-full bg-coral/15 p-1.5 text-coral">
                    <ShoppingCart className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-6 text-ink/75">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
