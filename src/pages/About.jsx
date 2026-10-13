import React from 'react'
import {
  Heart,
  Sparkles,
  Stethoscope,
  Wheat,
  Home as HomeIcon,
  CheckCircle
} from 'lucide-react'

const galleryPhotos = [
  {
    src: '/images/calf-at-gauseva.jpeg',
    alt: 'A young brown and white calf standing in the Gaushala courtyard',
    caption: 'A young calf',
    category: 'Young ones'
  },
  {
    src: '/images/cow-and-calf-at-gauseva.jpeg',
    alt: 'A calf standing beside its mother inside the Gaushala shelter',
    caption: 'Mother and calf',
    category: 'Together'
  },
  {
    src: '/images/two-calves-at-gauseva.jpeg',
    alt: 'Two young calves standing together at the Gaushala',
    caption: 'Growing together',
    category: 'Young ones'
  },
  {
    src: '/images/shri-gopal-mandir.jpeg',
    alt: 'Colorful entrance of Shri Gopal Mandir',
    caption: 'Shri Gopal Mandir',
    category: 'A place for prayer'
  }
]

export const About = () => {
  const pillars = [
    {
      icon: Stethoscope,
      label: 'Health',
      title: 'Rescue & treatment',
      desc: 'Sick and injured cows can receive care and a safe place to recover.'
    },
    {
      icon: Wheat,
      label: 'Daily care',
      title: 'Food & water',
      desc: 'Regular meals and fresh fodder are part of everyday care at the Gaushala.'
    },
    {
      icon: HomeIcon,
      label: 'Shelter',
      title: 'A safe place to rest',
      desc: 'Rescued cows are given shelter, patience, and a chance to heal with dignity.'
    },
    {
      icon: Heart,
      label: 'Community',
      title: 'Seva together',
      desc: 'Visitors and supporters can take part by offering help to the Gaushala.'
    }
  ]

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden border-b border-stone-200/60 bg-gradient-to-br from-gau-cream via-[#fffaf0] to-gau-bg py-16 sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gau-green-200/30 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-gau-green-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gau-green-900 shadow-sm">
            <Sparkles className="h-4 w-4 text-amber-600" />
            <span>Roorkee, Uttarakhand</span>
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl font-bold leading-tight text-stone-900 sm:text-5xl lg:text-6xl">
            A place for <span className="text-gau-green-800">care, shelter</span> and seva
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-stone-600 sm:text-lg">
            GauSeva is a home for cows who need support, with daily care and Shri Gopal Mandir as part of the same community.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-stone-700">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm"><Heart className="h-4 w-4 text-orange-600" /> Compassionate cow care</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm"><Sparkles className="h-4 w-4 text-amber-600" /> Shri Gopal Mandir</span>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <article className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-gau-green-900 to-[#153b2b] p-8 text-white shadow-xl sm:p-10">
            <div className="pointer-events-none absolute -right-10 -top-12 -z-10 h-56 w-56 rounded-full border-[28px] border-white/5" />
            <div className="mb-7 flex items-center justify-between gap-4">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-green-50">Our purpose</span>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-300">
                <Heart className="h-6 w-6" />
              </div>
            </div>
            <h2 className="max-w-lg font-serif text-3xl font-bold leading-tight sm:text-4xl">Care that gives every cow a safe place to heal.</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-green-50/85 sm:text-base">
              Our mission is to support rescued, sick, and injured cows with food, shelter, and compassionate care at our Roorkee Gaushala.
            </p>
            <ul className="mt-7 space-y-3 border-t border-white/15 pt-6 text-sm text-green-50">
              <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 shrink-0 text-amber-300" /><span>Rescue and support cows in need</span></li>
              <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 shrink-0 text-amber-300" /><span>Provide daily food, shelter, and veterinary care</span></li>
              <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 shrink-0 text-amber-300" /><span>Put each cow’s well-being first</span></li>
            </ul>
          </article>

          <article className="relative isolate overflow-hidden rounded-[2rem] border border-amber-200 bg-gradient-to-br from-[#fffaf0] to-[#f7eddb] p-8 shadow-soft sm:p-10">
            <div className="pointer-events-none absolute -bottom-16 -right-16 -z-10 h-64 w-64 rounded-full border-[30px] border-amber-600/5" />
            <div className="mb-7 flex items-center justify-between gap-4">
              <span className="rounded-full border border-amber-200 bg-white/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-900">Our hope</span>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>
            <h2 className="max-w-lg font-serif text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">A community where every cow is met with kindness and respect.</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-600 sm:text-base">
              We want GauSeva to be a welcoming place where people can connect with the cows, visit Shri Gopal Mandir, and take part in seva.
            </p>
            <ul className="mt-7 space-y-3 border-t border-amber-200 pt-6 text-sm text-stone-700">
              <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 shrink-0 text-amber-700" /><span>A safe and caring home for cows</span></li>
              <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 shrink-0 text-amber-700" /><span>A place for visitors, prayer, and seva</span></li>
              <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 shrink-0 text-amber-700" /><span>People joining together to continue compassionate care</span></li>
            </ul>
          </article>
        </div>
      </section>

      {/* How We Care For Cows Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-gau-cream/70 p-6 sm:p-10 lg:p-12">
          <div className="mb-10 max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-gau-green-800 shadow-sm">
              <Heart className="h-3.5 w-3.5 text-orange-600" /> Everyday care
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">Care that makes a home</h2>
            <p className="text-sm leading-relaxed text-stone-600 sm:text-base">
              Rescue, food, shelter, and community support all play a part in caring for cows at GauSeva.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {pillars.map((p, idx) => {
              const Icon = p.icon
              return (
                <article key={p.title} className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gau-green-100 text-gau-green-900 transition-colors group-hover:bg-gau-green-800 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-right text-[10px] font-bold uppercase tracking-[0.16em] text-stone-400">0{idx + 1} · {p.label}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold leading-snug text-stone-900">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">{p.desc}</p>
                  <div className="mt-6 h-1 w-12 rounded-full bg-gradient-to-r from-gau-green-700 to-amber-500" />
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Gaushala photo gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            Real moments · Roorkee
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            A glimpse of life at GauSeva
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            From daily feeding to the young calves and Shri Gopal Mandir, these are real moments from our Gaushala.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
          <figure className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-soft lg:col-span-8">
            <img
              src="/images/cow-feeding-at-gauseva.jpeg"
              alt="Cows gathered around a feeding trough at the GauSeva gaushala"
              className="block h-auto w-full object-contain"
              loading="lazy"
            />
            <figcaption className="flex items-center justify-between gap-3 border-t border-stone-100 px-5 py-4">
              <span className="font-serif font-bold text-stone-900">Daily feeding at GauSeva</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gau-green-800">Daily care</span>
            </figcaption>
          </figure>

          <div className="flex flex-col justify-center rounded-3xl bg-gau-green-900 p-7 text-white shadow-soft sm:p-9 lg:col-span-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-200">
              <Wheat className="h-3.5 w-3.5" /> Everyday seva
            </span>
            <h3 className="mt-5 font-serif text-2xl font-bold leading-snug sm:text-3xl">Care is made of small things, done every day.</h3>
            <p className="mt-4 text-sm leading-relaxed text-green-50/90">
              A meal, a safe place to rest, and people who show up with care—this is everyday life at GauSeva.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-5 grid max-w-6xl grid-cols-2 items-start gap-4 sm:gap-5 lg:grid-cols-4">
          {galleryPhotos.map((photo) => (
            <figure key={photo.src} className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
              <img
                src={photo.src}
                alt={photo.alt}
                className="block h-auto w-full object-contain"
                loading="lazy"
              />
              <figcaption className="border-t border-stone-100 px-4 py-4 sm:px-5">
                <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-gau-green-700">{photo.category}</span>
                <span className="mt-1 block font-serif text-base font-bold leading-snug text-stone-900 sm:text-lg">{photo.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

    </div>
  )
}
