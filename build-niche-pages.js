/**
 * build-niche-pages.js
 * Generates 6 niche-specific RPM + earnings pages with an embedded
 * pre-filled mini-calculator, audience geo breakdown, and unique copy.
 *
 * Run: node build-niche-pages.js
 */

const fs   = require('fs');
const path = require('path');

const BASE   = 'C:/Users/micth/Desktop/dev/seo/claud/ytb';
const DOMAIN = 'https://ytbearnings.com';

// ─── Niche data ──────────────────────────────────────────────────────────────
const NICHES = [
  {
    slug: 'football-soccer-youtube-rpm-earnings',
    name: 'Football (Soccer)',
    emoji: '⚽',
    tier: 'low',
    rpm:  { low: 0.80, mid: 1.50, high: 3.00 },
    cpm:  { low: 2, high: 6 },
    geo:  [
      { country: 'India',      flag: '🇮🇳', pct: 18, tier: 'tier-3' },
      { country: 'Brazil',     flag: '🇧🇷', pct: 11, tier: 'tier-2' },
      { country: 'Indonesia',  flag: '🇮🇩', pct: 8,  tier: 'tier-3' },
      { country: 'Mexico',     flag: '🇲🇽', pct: 7,  tier: 'tier-2' },
      { country: 'USA',        flag: '🇺🇸', pct: 6,  tier: 'tier-1' },
      { country: 'Other',      flag: '🌐', pct: 50, tier: 'mixed'  },
    ],
    intro: `Soccer is the most-watched sport on the planet, but on YouTube it's one of the lowest-RPM sports verticals. The reason is simple: most football viewership comes from India, Southeast Asia, and Latin America — regions with CPMs 5-10× lower than the US or UK. A channel with 10 million soccer views earns roughly what a US-focused golf channel earns with 1 million.`,
    whyLow: true,
    subNiches: [
      { name: 'Highlights / Match Recaps',      rpm: '$0.80 – $1.60', note: 'Copyright-risky, often demonetized' },
      { name: 'Player Analysis / Tactics',      rpm: '$1.20 – $2.50', note: 'Better CPM due to adult male demo' },
      { name: 'Transfer News',                  rpm: '$1.00 – $2.00', note: 'High volume, seasonal spikes' },
      { name: 'Fan Reaction / Vlog',            rpm: '$0.70 – $1.80', note: 'Young audience, low CPM' },
      { name: 'Football Skills / Freestyle',    rpm: '$1.00 – $2.20', note: 'Brand sponsorship potential' },
      { name: 'FIFA / eFootball Gaming',        rpm: '$1.00 – $2.50', note: 'Gaming advertiser pool' },
    ],
    channelExamples: [
      { name: 'AFTV (Arsenal Fan TV) style',   subs: '1.5M',  notes: 'UK-based fan channel, RPM ~$2.50-4' },
      { name: 'HITC Sevens style',             subs: '2M',    notes: 'UK football quiz, RPM ~$2-3.50' },
      { name: 'Indian football analysis',      subs: '500K',  notes: 'India-heavy audience, RPM ~$0.60-1.20' },
    ],
    whyParagraphs: [
      { h: 'Audience geography kills soccer RPM', p: 'Football audiences concentrate in countries where advertisers pay $0.30–$2.00 CPM. India alone can represent 20–40% of a soccer channel\'s views. Google Ads benchmarks show India CPMs around $0.50–$1.50 for sports inventory, versus $8–$20 in the US.' },
      { h: 'Copyright friction reduces ad load', p: 'Match footage is heavily copyrighted by Premier League, UEFA, FIFA, La Liga. Many soccer channels operate under Content ID claims that divert a portion of revenue to rights holders, further reducing effective RPM.' },
      { h: 'Seasonal and event-driven traffic', p: 'Soccer traffic spikes during World Cups, Euros, Copa América and major derbies — but drops during the off-season. Channels with 8–10× traffic swings see RPM volatility as advertiser demand shifts.' },
    ],
    faq: [
      { q: 'What is a good RPM for a soccer YouTube channel?', a: 'A healthy RPM for a soccer channel is $1.50–$2.50 if you run a mixed international audience. UK or US-heavy channels can reach $3–$4. Anything above $4 usually means the channel has shifted to tactical analysis or business-of-football content attracting adult male audiences.' },
      { q: 'Why do soccer channels earn less than NFL channels?',        a: 'NFL audiences are 75–80% US-based, where CPMs average $10–$20. Soccer audiences are globally distributed with heavy weighting toward India, Brazil, and Indonesia where CPMs are a fraction of US rates. A US viewer is worth 8–15× an Indian viewer to advertisers.' },
      { q: 'Is it worth starting a football YouTube channel for money?', a: 'AdSense alone will not make you wealthy on soccer content unless you grow to tens of millions of views per month. Successful soccer creators rely on sponsorships (betting sites, kit manufacturers, gaming brands), merchandise, and membership tiers to scale revenue.' },
      { q: 'Can FIFA/eFootball gaming content earn more than match recaps?', a: 'Sometimes yes, because gaming content avoids copyright strikes and can run unrestricted ads. Gaming RPM ($1–$2.50) is often comparable to match content ($0.80–$2) but with far fewer demonetization risks.' },
    ],
    sources: [
      { label: 'Influencer Marketing Hub – YouTube earnings benchmarks', url: 'https://influencermarketinghub.com/youtube-money-calculator/' },
      { label: 'Google Ads CPM benchmarks by country',                   url: 'https://blog.hubspot.com/marketing/google-ads-benchmarks' },
    ],
  },

  {
    slug: 'basketball-youtube-rpm-earnings',
    name: 'Basketball',
    emoji: '🏀',
    tier: 'mid',
    rpm:  { low: 1.50, mid: 3.00, high: 5.50 },
    cpm:  { low: 4, high: 9 },
    geo:  [
      { country: 'USA',         flag: '🇺🇸', pct: 38, tier: 'tier-1' },
      { country: 'Philippines', flag: '🇵🇭', pct: 9,  tier: 'tier-3' },
      { country: 'Canada',      flag: '🇨🇦', pct: 6,  tier: 'tier-1' },
      { country: 'China / HK',  flag: '🇭🇰', pct: 5,  tier: 'tier-2' },
      { country: 'Mexico',      flag: '🇲🇽', pct: 4,  tier: 'tier-2' },
      { country: 'Other',       flag: '🌐', pct: 38, tier: 'mixed'  },
    ],
    intro: `Basketball sits in the sports RPM sweet spot: the NBA drives a US-heavy audience (38% of global viewership) while maintaining massive international reach through stars like Luka, Giannis, and Wembanyama. The result is a typical channel RPM of $3 — roughly 2× what soccer channels earn, though still well below NFL or MMA rates.`,
    subNiches: [
      { name: 'NBA Highlights',                rpm: '$2.00 – $3.50', note: 'Copyright-heavy, often claimed' },
      { name: 'Basketball Analysis / Film',    rpm: '$3.00 – $5.50', note: 'Adult male demo, higher CPM' },
      { name: 'NBA News / Rumors',             rpm: '$2.50 – $4.00', note: 'High volume, daily uploads' },
      { name: 'Basketball Training / Skills',  rpm: '$3.00 – $6.00', note: 'Sneaker + apparel brands' },
      { name: 'NBA 2K Gaming',                 rpm: '$1.80 – $3.00', note: 'Gaming CPM floor' },
      { name: 'Sneaker Reviews / Culture',     rpm: '$5.00 – $9.00', note: 'Nike/Adidas premium ads' },
    ],
    channelExamples: [
      { name: 'JxmyHighroller style',          subs: '4M',    notes: 'Analysis channel, RPM ~$4-6' },
      { name: 'Mike Korzemba style',           subs: '1.5M',  notes: 'NBA highlights, RPM ~$2.50-4' },
      { name: 'Philippine basketball channel', subs: '800K',  notes: 'PH-heavy, RPM ~$1.50-2.50' },
    ],
    whyParagraphs: [
      { h: 'US-heavy audience boosts CPM',     p: 'With 38% of views coming from the US and another 6% from Canada, basketball channels capture premium advertising inventory. Auto, telecom, and sports-betting advertisers compete for North American basketball audiences, pushing CPMs to $7–$15 for US-viewed inventory.' },
      { h: 'Philippines is the RPM drag',      p: 'The Philippines is the #2 basketball-watching country globally per NBA international data, but Philippine CPMs average $0.80–$2.00. A channel heavily dependent on PH viewership will see blended RPMs closer to the $1.50–$2 range even with strong US traffic.' },
      { h: 'Sneaker economy pays premium',     p: 'Sneaker review and basketball culture channels benefit from Nike, Adidas, Puma, and Anta advertising — often running branded segments at $0.03–$0.08 per view (on top of AdSense). This effectively doubles or triples total revenue for well-positioned creators.' },
    ],
    faq: [
      { q: 'What is a realistic basketball channel RPM?', a: 'Most basketball channels earn $2.50–$4 RPM with a mixed audience. Pure NBA highlights channels trend lower ($2–$3) due to copyright claims. Analysis/film channels with US-skewed audiences can reach $4–$6.' },
      { q: 'Do highlights channels get demonetized?',     a: 'NBA match footage is protected by Turner and the NBA itself. Most highlight channels operate under Content ID claims that share or divert revenue. Fair-use analysis channels (with commentary and selective clips) typically retain more earnings.' },
      { q: 'Are basketball Shorts profitable?',           a: 'Basketball Shorts see Shorts RPMs of $0.06–$0.15 — higher than the global Shorts average because of the US-heavy audience. Still, long-form earns 20–40× more per view than Shorts.' },
      { q: 'How do basketball creators scale income?',    a: 'Sneaker brand deals, NBA 2K partnerships, fantasy-sports app sponsorships, and Patreon film-breakdown tiers are the primary growth levers beyond AdSense.' },
    ],
    sources: [
      { label: 'NBA International Growth reports', url: 'https://www.nba.com/news/nba-international-growth' },
      { label: 'Tubefilter sports channel coverage', url: 'https://www.tubefilter.com/' },
    ],
  },

  {
    slug: 'nfl-american-football-youtube-rpm-earnings',
    name: 'NFL / American Football',
    emoji: '🏈',
    tier: 'very-high',
    rpm:  { low: 4.00, mid: 7.00, high: 12.00 },
    cpm:  { low: 10, high: 20 },
    geo:  [
      { country: 'USA',     flag: '🇺🇸', pct: 78, tier: 'tier-1' },
      { country: 'Canada',  flag: '🇨🇦', pct: 6,  tier: 'tier-1' },
      { country: 'UK',      flag: '🇬🇧', pct: 4,  tier: 'tier-1' },
      { country: 'Mexico',  flag: '🇲🇽', pct: 3,  tier: 'tier-2' },
      { country: 'Germany', flag: '🇩🇪', pct: 2,  tier: 'tier-1' },
      { country: 'Other',   flag: '🌐', pct: 7,  tier: 'mixed'  },
    ],
    intro: `NFL channels sit at the absolute top of the sports RPM pyramid on YouTube. With 78% of views coming from the United States, NFL creators capture the most lucrative advertising market in the world. Typical RPMs run $7 mid-range, with analysis and betting-adjacent channels regularly reaching $10–$15.`,
    subNiches: [
      { name: 'NFL Highlights / Clips',        rpm: '$4.00 – $7.00',  note: 'NFL rights holder claims' },
      { name: 'Game Analysis / Film Study',    rpm: '$7.00 – $12.00', note: 'Adult male 25-54 demo' },
      { name: 'NFL News / Rumors',             rpm: '$5.00 – $9.00',  note: 'High-volume daily content' },
      { name: 'Fantasy Football Advice',       rpm: '$8.00 – $15.00', note: 'DFS + betting sponsors' },
      { name: 'Madden Gaming',                 rpm: '$3.00 – $5.50',  note: 'Gaming CPM floor applies' },
      { name: 'NFL Draft Analysis',            rpm: '$6.00 – $11.00', note: 'Seasonal peak in spring' },
    ],
    channelExamples: [
      { name: 'Pat McAfee Show style',         subs: '3M+',   notes: 'Sports talk, RPM ~$10-15' },
      { name: 'Kyle Brandt Football Show style', subs: '600K', notes: 'Analysis, RPM ~$8-12' },
      { name: 'Bleacher Report NFL style',     subs: '2M',    notes: 'Highlights, RPM ~$5-8' },
    ],
    whyParagraphs: [
      { h: 'The US CPM premium is enormous',   p: 'US advertising inventory commands $10–$30 CPM on sports content. With 78% US viewership, NFL channels blend into a weighted CPM of $12–$18 — an order of magnitude higher than globally-distributed sports. This single factor explains most of the gap between NFL and soccer RPM.' },
      { h: 'Betting ads changed the game',     p: 'Since 2018 Supreme Court legalization, DraftKings, FanDuel, BetMGM and Caesars have poured hundreds of millions into sports advertising. NFL-adjacent content captures a major share of this spend, driving fantasy and betting-oriented channel RPMs as high as $15.' },
      { h: 'Older, affluent audience',         p: 'NFL viewership skews older (average age 50+) and wealthier than most YouTube content. This demographic purchases insurance, vehicles, financial products, and home improvement — all categories that pay $15–$30 CPM.' },
    ],
    faq: [
      { q: 'Why is NFL RPM so high vs other sports?', a: 'Three reasons compound: 78% US audience, an older/wealthier demographic, and massive sports-betting advertiser demand. No other sport on YouTube combines all three factors.' },
      { q: 'Do small NFL channels also earn $7 RPM?', a: 'Yes — RPM is determined by audience and niche, not channel size. A 50,000-view NFL analysis channel will earn roughly the same $7 RPM as a 10-million-view one, assuming similar audience composition.' },
      { q: 'What about international NFL fans?',      a: 'The UK, Germany, and Mexico are NFL\'s growth markets. UK and German inventory is still tier-1 pricing ($5–$12 CPM), so moderate international growth does not significantly hurt RPM.' },
      { q: 'Can betting-adjacent content get demonetized?', a: 'Yes. YouTube policies restrict direct gambling promotion. Fantasy content is generally safe, but explicit betting picks can trigger limited ad serving. Use disclaimers and educational framing.' },
    ],
    sources: [
      { label: 'Nielsen NFL viewership reports',        url: 'https://www.nielsen.com/insights/2023/nfl-viewership/' },
      { label: 'Tubefilter sports channel coverage',    url: 'https://www.tubefilter.com/' },
    ],
  },

  {
    slug: 'cricket-youtube-rpm-earnings',
    name: 'Cricket',
    emoji: '🏏',
    tier: 'very-low',
    rpm:  { low: 0.30, mid: 0.70, high: 1.50 },
    cpm:  { low: 1, high: 3 },
    geo:  [
      { country: 'India',      flag: '🇮🇳', pct: 62, tier: 'tier-3' },
      { country: 'Pakistan',   flag: '🇵🇰', pct: 11, tier: 'tier-3' },
      { country: 'Bangladesh', flag: '🇧🇩', pct: 7,  tier: 'tier-3' },
      { country: 'UK',         flag: '🇬🇧', pct: 5,  tier: 'tier-1' },
      { country: 'Australia',  flag: '🇦🇺', pct: 3,  tier: 'tier-1' },
      { country: 'Other',      flag: '🌐', pct: 12, tier: 'mixed'  },
    ],
    intro: `Cricket is the most-watched sport in South Asia and commands enormous YouTube view volume — but it has the lowest RPM of any major sport on the platform. With 80%+ of viewership coming from India, Pakistan, and Bangladesh (CPMs $0.50–$2), even extremely popular cricket channels struggle to push RPM above $1.50.`,
    whyLow: true,
    subNiches: [
      { name: 'Match Highlights',              rpm: '$0.30 – $0.80', note: 'Heavily copyright-claimed' },
      { name: 'Cricket Analysis / Commentary', rpm: '$0.50 – $1.20', note: 'Expert audience, slightly better' },
      { name: 'IPL / T20 News',                rpm: '$0.40 – $1.00', note: 'High volume, seasonal peaks' },
      { name: 'Fantasy Cricket',               rpm: '$0.80 – $2.50', note: 'Dream11/MPL sponsorship heavy' },
      { name: 'Cricket Memes / Reactions',     rpm: '$0.30 – $0.70', note: 'Young audience, lowest CPM' },
      { name: 'Coaching / Skills',             rpm: '$0.60 – $1.50', note: 'Global audience helps' },
    ],
    channelExamples: [
      { name: 'Cricket news channels (India)', subs: '5M+',   notes: 'Massive views, RPM ~$0.40-0.80' },
      { name: 'Cricket analysis (UK/AUS)',     subs: '300K',  notes: 'Tier-1 audience, RPM ~$1.50-3' },
      { name: 'Fantasy cricket tips',          subs: '1M',    notes: 'Sponsorship-driven, RPM ~$1-2' },
    ],
    whyParagraphs: [
      { h: 'India dominates cricket viewership', p: 'India alone represents 60%+ of global cricket views on YouTube. Google Ads India sports CPMs average $0.50–$1.50. Even a channel with 100 million monthly views will earn a small fraction of what a 10-million-view US channel earns.' },
      { h: 'Sponsorships dwarf AdSense',         p: 'Successful cricket channels rely almost entirely on sponsorships from fantasy sports apps (Dream11, MPL, MyTeam11), betting sites (where legal), and direct brand deals. A 1M-view cricket channel might earn $700 in AdSense but $5,000–$15,000 in sponsorships.' },
      { h: 'Copyright is a minefield',           p: 'Star India, Sony Pictures Networks, and national cricket boards aggressively claim match footage. Most highlight channels are either Content-ID claimed (losing 50–100% of ad revenue) or operate on the edge of fair use with commentary overlays.' },
    ],
    faq: [
      { q: 'Why is cricket RPM so low compared to football?', a: 'Cricket audiences are 85% India/Pakistan/Bangladesh — the three lowest-CPM sports markets globally. Football at least has Brazilian, Mexican, and European viewership pulling averages up. Cricket has no equivalent tier-1 audience base.' },
      { q: 'Can a cricket channel become profitable on AdSense alone?', a: 'Only at massive scale (50M+ monthly views). Most profitable cricket creators treat AdSense as a small secondary revenue source and build their business on sponsorships, affiliate fantasy-app signups, and brand partnerships.' },
      { q: 'Do UK / Australia cricket channels earn more?',   a: 'Yes — significantly. A UK-focused cricket channel can reach $2–$4 RPM because Australia and the UK are tier-1 CPM markets. The tradeoff is smaller audience size compared to India-focused content.' },
      { q: 'What about IPL-focused content?',                 a: 'IPL content has high view volume but the same audience-geography problem. IPL-focused channels see seasonal RPM spikes during March-May when advertiser demand peaks in India.' },
    ],
    sources: [
      { label: 'Similarweb cricket site audience analysis',  url: 'https://www.similarweb.com/' },
      { label: 'Google Ads benchmarks by country',           url: 'https://blog.hubspot.com/marketing/google-ads-benchmarks' },
    ],
  },

  {
    slug: 'cooking-food-youtube-rpm-earnings',
    name: 'Cooking / Food',
    emoji: '🍳',
    tier: 'high',
    rpm:  { low: 2.00, mid: 5.00, high: 10.00 },
    cpm:  { low: 6, high: 14 },
    geo:  [
      { country: 'USA',        flag: '🇺🇸', pct: 28, tier: 'tier-1' },
      { country: 'India',      flag: '🇮🇳', pct: 12, tier: 'tier-3' },
      { country: 'UK',         flag: '🇬🇧', pct: 7,  tier: 'tier-1' },
      { country: 'Canada',     flag: '🇨🇦', pct: 5,  tier: 'tier-1' },
      { country: 'Australia',  flag: '🇦🇺', pct: 4,  tier: 'tier-1' },
      { country: 'Other',      flag: '🌐', pct: 44, tier: 'mixed'  },
    ],
    intro: `Cooking and food content is one of YouTube's highest-paying evergreen niches. A typical RPM of $5 — and $7–$10 for US-focused channels — reflects strong demand from CPG brands, grocery delivery services, kitchen appliance makers, and meal-kit companies. Food content ages well: a recipe video uploaded in 2020 can still earn solid AdSense revenue in 2026.`,
    subNiches: [
      { name: 'Classic Recipes / Tutorials',   rpm: '$3.00 – $7.00',  note: 'Family demo, evergreen value' },
      { name: 'Gourmet / Fine Cooking',        rpm: '$5.00 – $10.00', note: 'High-end appliance ads' },
      { name: 'Quick Meals / Meal Prep',       rpm: '$4.00 – $8.00',  note: 'Meal-kit, delivery ads' },
      { name: 'Baking / Pastry',               rpm: '$4.00 – $9.00',  note: 'KitchenAid, equipment ads' },
      { name: 'Food Reviews / Restaurant Vlogs', rpm: '$3.00 – $6.50', note: 'Mixed audience, travel ads' },
      { name: 'Healthy / Diet Cooking',        rpm: '$5.00 – $12.00', note: 'Supplement + app brands' },
    ],
    channelExamples: [
      { name: 'Binging with Babish style',      subs: '10M+',  notes: 'Recipes, RPM reportedly ~$7-10' },
      { name: 'Joshua Weissman style',          subs: '9M',    notes: 'Gourmet, RPM ~$6-9' },
      { name: 'Tasty-style quick recipes',      subs: '5M',    notes: 'Short recipes, RPM ~$4-7' },
    ],
    whyParagraphs: [
      { h: 'CPG advertisers love cooking content', p: 'Consumer packaged goods brands (Kraft-Heinz, Nestlé, Unilever) spend heavily on food content because purchase intent is high — viewers watching a pasta recipe are actively thinking about ingredients to buy. This drives CPMs into the $8–$14 range.' },
      { h: 'US audience lifts average RPM',        p: 'With 28% US viewership and another 16% from UK/Canada/Australia, nearly half of typical food channel views hit tier-1 CPM brackets. Indian viewership (12%) drags slightly but not enough to offset the premium US audience.' },
      { h: 'Evergreen = compounding revenue',      p: 'Unlike news or trending content, recipes do not age. A well-SEO\'d recipe from 2020 still ranks and earns in 2026. Food creators build back-catalogs of 500–1000 videos that continue generating AdSense for years, producing "passive" monthly income of $5,000–$50,000+.' },
    ],
    faq: [
      { q: 'Is cooking still a good niche to start on YouTube?', a: 'Yes. Food has high ad demand, global appeal, and extreme evergreen value. The main challenge is saturation — competition for beginner recipes is fierce. Niching down (single-cuisine, dietary restriction, technique-specific) is the winning strategy for new channels.' },
      { q: 'Why do some food channels earn $10 RPM and others $3?', a: 'Audience composition is the primary driver. A channel heavy on US and UK viewers with premium equipment in videos attracts Williams Sonoma or All-Clad ads at $15+ CPM. A broadly international channel with generic recipes sees mostly generic CPG ads at $6 CPM.' },
      { q: 'Do cooking Shorts pay well?',                     a: 'Shorts RPMs for food are $0.05–$0.15 — above the Shorts average because US-heavy food audiences lift the rate. But long-form recipe videos earn 30–60× more per view than the equivalent Shorts.' },
      { q: 'What are the highest-paying food sub-niches?',    a: 'Healthy cooking / fitness meals, supplement-adjacent content, and high-end gourmet cooking typically top $8 RPM. Budget cooking and international cuisine average $3–$5 RPM.' },
    ],
    sources: [
      { label: 'Influencer Marketing Hub – YouTube CPM by niche', url: 'https://influencermarketinghub.com/youtube-cpm/' },
      { label: 'Tubefilter – Food Channel Rankings',               url: 'https://www.tubefilter.com/' },
    ],
  },

  {
    slug: 'diy-home-improvement-youtube-rpm-earnings',
    name: 'DIY / Home Improvement',
    emoji: '🔨',
    tier: 'very-high',
    rpm:  { low: 4.00, mid: 8.00, high: 15.00 },
    cpm:  { low: 10, high: 22 },
    geo:  [
      { country: 'USA',        flag: '🇺🇸', pct: 55, tier: 'tier-1' },
      { country: 'Canada',     flag: '🇨🇦', pct: 9,  tier: 'tier-1' },
      { country: 'UK',         flag: '🇬🇧', pct: 7,  tier: 'tier-1' },
      { country: 'Australia',  flag: '🇦🇺', pct: 5,  tier: 'tier-1' },
      { country: 'Germany',    flag: '🇩🇪', pct: 3,  tier: 'tier-1' },
      { country: 'Other',      flag: '🌐', pct: 21, tier: 'mixed'  },
    ],
    intro: `DIY and home improvement is one of the highest-RPM niches on YouTube — often exceeding $10 RPM for established US-focused channels. The audience is adult homeowners in wealthy countries (79% tier-1 traffic), the advertisers are Home Depot, Lowe's, DeWalt, Milwaukee Tool, and every insurance company that wants to sell to people who own property. The combination produces premium ad economics.`,
    subNiches: [
      { name: 'Woodworking / Carpentry',       rpm: '$5.00 – $12.00', note: 'Tool brand premium ads' },
      { name: 'Home Renovation',               rpm: '$6.00 – $15.00', note: 'Insurance, mortgage ads' },
      { name: 'Plumbing / Electrical DIY',     rpm: '$5.00 – $11.00', note: 'High intent, trade-pro overlap' },
      { name: 'Gardening / Landscaping',       rpm: '$6.00 – $12.00', note: 'Home Depot, nursery ads' },
      { name: 'Tool Reviews',                  rpm: '$7.00 – $18.00', note: 'DeWalt/Milwaukee premium' },
      { name: 'Tiny House / Off-Grid',         rpm: '$4.00 – $9.00',  note: 'Solar + self-sufficiency ads' },
    ],
    channelExamples: [
      { name: 'April Wilkerson style',         subs: '1.2M',  notes: 'Woodworking, RPM reportedly ~$10-14' },
      { name: 'Bourbon Moth Woodworking style', subs: '800K', notes: 'Woodworking, RPM ~$9-13' },
      { name: 'This Old House style',          subs: '2M',    notes: 'Home reno, RPM ~$10-18' },
    ],
    whyParagraphs: [
      { h: 'Homeowner demographic drives CPM',    p: 'DIY YouTube skews 30–65 years old, predominantly US/Canada/UK homeowners. This demographic purchases power tools, appliances, insurance policies, and contractor services — high-ticket categories that advertisers pay $18–$35 CPM to reach.' },
      { h: 'Tool brand affiliate + sponsorship',  p: 'DIY creators enjoy unusually high sponsorship rates. DeWalt, Milwaukee, Ryobi, and Rockwell run persistent integration campaigns at $0.05–$0.12 per view. Amazon and direct affiliate links on tool reviews can add 30–100% on top of AdSense + sponsorship revenue.' },
      { h: 'Intent-heavy, high-value searches',   p: 'Searches like "how to install a toilet" or "best circular saw" indicate clear purchase intent. These queries pull premium advertiser inventory — Google Ads will serve Home Depot or Lowe\'s rather than generic display ads, keeping CPMs near the top of the YouTube range.' },
    ],
    faq: [
      { q: 'Is DIY really the highest-paying YouTube niche?', a: 'Personal finance and insurance topics technically have higher CPMs ($20–$40), but DIY is close behind at $10–$22 and has far lower content entry barriers. For a creator who can produce physical-work video, DIY offers the best income-to-difficulty ratio of any major niche.' },
      { q: 'Can non-US DIY channels still earn high RPM?',    a: 'UK, Canadian, and Australian DIY channels routinely earn $6–$12 RPM. The audience profile (wealthy English-speaking homeowners) matters more than physical country. Channels that ship mostly to tier-3 audiences will not see these rates.' },
      { q: 'How often do DIY creators upload?',               a: 'Most successful DIY creators publish 1 long-form video per week. The production cost (filming a real build) is high, but the evergreen value + high RPM means fewer videos are needed to reach income targets than in lower-RPM niches.' },
      { q: 'What about gardening specifically?',              a: 'Gardening is a strong DIY sub-niche with $6–$12 RPM, slightly below woodworking/renovation but with strong seasonal spikes in spring. Excellent beginner niche due to low production costs.' },
    ],
    sources: [
      { label: 'Think Media – YouTube niche CPM analysis',     url: 'https://www.thinkmediatv.com/' },
      { label: 'Tubefilter – DIY channel earnings coverage',    url: 'https://www.tubefilter.com/' },
    ],
  },
];

// ─── Template ────────────────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function fmtMoney(n) {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function tierColor(tier) {
  return {
    'tier-1': '#10B981',
    'tier-2': '#F59E0B',
    'tier-3': '#EF4444',
    'mixed':  '#6B7280',
  }[tier] || '#6B7280';
}

function renderGeoBar(geo) {
  // Stacked bar: 100% width segments
  const segments = geo.map(g =>
    `<div class="geo-seg" style="width:${g.pct}%;background:${tierColor(g.tier)};" title="${g.country} ${g.pct}%"></div>`
  ).join('');
  const legend = geo.map(g =>
    `<div class="geo-legend-item"><span class="geo-dot" style="background:${tierColor(g.tier)};"></span><span>${g.flag} ${g.country}</span><span class="geo-pct">${g.pct}%</span></div>`
  ).join('');
  return `
        <div class="geo-bar">${segments}</div>
        <div class="geo-legend">${legend}</div>`;
}

function renderEarningsTable(n) {
  const views = [100000, 500000, 1000000, 5000000, 10000000, 50000000];
  const rows = views.map(v => {
    const low  = (v / 1000 * n.rpm.low).toFixed(0);
    const mid  = (v / 1000 * n.rpm.mid).toFixed(0);
    const high = (v / 1000 * n.rpm.high).toFixed(0);
    const highlight = v === 1000000 ? ' class="tr-highlight"' : '';
    const bold = v === 1000000 ? 'strong' : 'span';
    return `<tr${highlight}><td><${bold}>${v.toLocaleString('en-US')}</${bold}></td><td>$${Number(low).toLocaleString('en-US')}</td><td>$${Number(mid).toLocaleString('en-US')}</td><td>$${Number(high).toLocaleString('en-US')}</td></tr>`;
  }).join('\n              ');
  return rows;
}

function renderSubNicheTable(n) {
  return n.subNiches.map(s =>
    `<tr><td>${escapeHtml(s.name)}</td><td>${escapeHtml(s.rpm)}</td><td>${escapeHtml(s.note)}</td></tr>`
  ).join('\n              ');
}

function renderFaq(n) {
  return n.faq.map(f =>
    `      <details class="faq-item">
        <summary>${escapeHtml(f.q)}</summary>
        <p>${escapeHtml(f.a)}</p>
      </details>`
  ).join('\n');
}

function renderFaqJsonLd(n) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: n.faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }, null, 2);
}

function renderArticleJsonLd(n) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${n.name} YouTube RPM & Earnings 2026`,
    description: `Full 2026 data on ${n.name} YouTube channel RPM, audience geography, and earnings estimates.`,
    url: `${DOMAIN}/${n.slug}.html`,
    author:    { '@type': 'Organization', name: 'YouTube Money Calculator' },
    publisher: { '@type': 'Organization', name: 'YouTube Money Calculator', url: DOMAIN },
  }, null, 2);
}

function renderPage(n) {
  const title = `${n.name} YouTube RPM & Earnings 2026 — Full Data`;
  const desc  = `${n.name} YouTube channels earn ${fmtMoney(n.rpm.low)}–${fmtMoney(n.rpm.high)} RPM in 2026. Audience geo breakdown, sub-niche rates, and a pre-filled earnings calculator.`;
  const example1M = Math.round(1_000_000 / 1000 * n.rpm.mid);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(desc)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${DOMAIN}/${n.slug}.html">
  <link rel="alternate" hreflang="en"        href="${DOMAIN}/${n.slug}.html" />
  <link rel="alternate" hreflang="x-default" href="${DOMAIN}/${n.slug}.html" />
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#FF0000">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(desc)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${DOMAIN}/${n.slug}.html">
  <meta property="og:image" content="${DOMAIN}/og-image.svg">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="stylesheet" href="/style.css">
  <style>
    .geo-bar { display:flex; height:28px; border-radius:6px; overflow:hidden; margin:16px 0 12px; }
    .geo-seg { height:100%; transition:opacity .15s; }
    .geo-seg:hover { opacity:.8; }
    .geo-legend { display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:8px 20px; font-size:.9rem; }
    .geo-legend-item { display:flex; align-items:center; gap:8px; }
    .geo-dot { width:10px; height:10px; border-radius:50%; display:inline-block; }
    .geo-pct { margin-left:auto; color:var(--text-muted); font-variant-numeric:tabular-nums; }
    .niche-calc { background:var(--card); border:1px solid var(--border); border-radius:12px; padding:28px; margin:24px 0 40px; }
    .niche-calc h3 { margin:0 0 18px; }
    .calc-row { display:grid; grid-template-columns:1fr; gap:16px; margin-bottom:16px; }
    @media (min-width:720px) { .calc-row { grid-template-columns:1fr 1fr; } }
    .calc-field label { display:block; font-weight:600; font-size:.9rem; margin-bottom:6px; }
    .calc-field input[type="number"] { width:100%; padding:10px 12px; border:1px solid var(--border); border-radius:6px; font-size:1rem; }
    .calc-field input[type="range"] { width:100%; }
    .calc-rpm-display { font-variant-numeric:tabular-nums; background:#FEE2E2; color:#991B1B; padding:2px 8px; border-radius:4px; font-weight:700; font-size:.85rem; margin-left:8px; }
    .calc-results { display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:12px; margin-top:20px; }
    .calc-res-card { background:var(--bg-alt); border-radius:8px; padding:14px; text-align:center; }
    .calc-res-label { font-size:.78rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:.05em; font-weight:600; }
    .calc-res-value { font-size:1.5rem; font-weight:800; color:var(--text); margin-top:4px; font-variant-numeric:tabular-nums; }
    .calc-res-card.primary { background:linear-gradient(135deg,#FEF2F2,#FEE2E2); border:1px solid #FCA5A5; }
    .calc-res-card.primary .calc-res-value { color:var(--red); font-size:1.9rem; }
    .tier-badge { display:inline-block; padding:2px 10px; border-radius:12px; font-size:.75rem; font-weight:700; text-transform:uppercase; }
    .tier-badge.low { background:#FEF3C7; color:#92400E; }
    .tier-badge.mid { background:#DBEAFE; color:#1E40AF; }
    .tier-badge.high { background:#D1FAE5; color:#065F46; }
    .tier-badge.very-high { background:#059669; color:#fff; }
    .tier-badge.very-low { background:#FEE2E2; color:#991B1B; }
    .faq-item { border-bottom:1px solid var(--border); padding:16px 0; }
    .faq-item summary { font-weight:600; cursor:pointer; font-size:1.05rem; }
    .faq-item p { margin:10px 0 0; color:var(--text-muted); }
    .sources-list { font-size:.85rem; color:var(--text-muted); }
    .sources-list a { color:var(--blue); }
  </style>
  <script type="application/ld+json">
${renderArticleJsonLd(n)}
  </script>
  <script type="application/ld+json">
${renderFaqJsonLd(n)}
  </script>
</head>
<body>

<div class="red-top-bar"></div>

<header class="site-header">
  <div class="container">
    <div class="header-inner">
      <a href="/" class="logo" aria-label="YouTube Money Calculator Home">
        <span class="logo-icon" aria-hidden="true">▶$</span>
        <span class="logo-text">YT Money Calculator</span>
      </a>
      <nav class="main-nav" aria-label="Main navigation">
        <a href="/">Calculator</a>
        <a href="/youtube-rpm-guide.html">RPM Guide</a>
        <a href="/youtube-rpm-by-country.html">By Country</a>
        <a href="/youtube-shorts-money-calculator.html">Shorts</a>
        <a href="/blog/">Blog</a>
      </nav>
      <button class="nav-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-nav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>
<div class="mobile-nav" id="mobile-nav" aria-hidden="true">
  <a href="/" class="mobile-nav-link">Calculator</a>
  <a href="/youtube-rpm-guide.html" class="mobile-nav-link">RPM Guide</a>
  <a href="/youtube-rpm-by-country.html" class="mobile-nav-link">By Country</a>
  <a href="/youtube-shorts-money-calculator.html" class="mobile-nav-link">Shorts</a>
  <a href="/blog/" class="mobile-nav-link">Blog</a>
</div>

<main>

  <section class="hero" style="padding:40px 0 32px;background:#fff;border-bottom:1px solid var(--border);">
    <div class="container">
      <div class="hero-badge">${n.emoji} ${escapeHtml(n.name)}</div>
      <h1>${escapeHtml(n.name)} YouTube RPM &amp; Earnings 2026</h1>
      <div class="accent-line"></div>
      <p class="hero-desc">Typical ${escapeHtml(n.name)} channel RPM runs <strong>${fmtMoney(n.rpm.low)} – ${fmtMoney(n.rpm.high)}</strong> in 2026 <span class="tier-badge ${n.tier}">${n.tier.replace('-', ' ')} RPM</span>. A channel averaging 1M monthly views earns around <strong>${fmtMoney(example1M)}</strong> per month from AdSense alone.</p>
    </div>
  </section>

  <section style="padding:32px 0 16px;">
    <div class="container">

      <div class="article-body" style="max-width:820px;margin:0 auto;">

        <p>${escapeHtml(n.intro)}</p>

        <!-- EMBEDDED CALCULATOR -->
        <div class="niche-calc">
          <h3>${n.emoji} ${escapeHtml(n.name)} Earnings Calculator</h3>
          <p style="color:var(--text-muted);margin:0 0 18px;font-size:.95rem;">Pre-filled with typical ${escapeHtml(n.name)} RPM. Adjust views and RPM to model your channel.</p>
          <div class="calc-row">
            <div class="calc-field">
              <label for="nc-views">Monthly Views</label>
              <input type="number" id="nc-views" value="1000000" min="0" step="10000">
            </div>
            <div class="calc-field">
              <label for="nc-rpm">RPM <span class="calc-rpm-display" id="nc-rpm-display">${fmtMoney(n.rpm.mid)}</span></label>
              <input type="range" id="nc-rpm" min="${n.rpm.low}" max="${n.rpm.high}" step="0.05" value="${n.rpm.mid}">
              <div style="display:flex;justify-content:space-between;font-size:.8rem;color:var(--text-muted);margin-top:4px;">
                <span>${fmtMoney(n.rpm.low)} low</span><span>${fmtMoney(n.rpm.mid)} typical</span><span>${fmtMoney(n.rpm.high)} high</span>
              </div>
            </div>
          </div>
          <div class="calc-results">
            <div class="calc-res-card primary">
              <div class="calc-res-label">Monthly Revenue</div>
              <div class="calc-res-value" id="nc-monthly">${fmtMoney(example1M)}</div>
            </div>
            <div class="calc-res-card">
              <div class="calc-res-label">Daily</div>
              <div class="calc-res-value" id="nc-daily">${fmtMoney(example1M / 30)}</div>
            </div>
            <div class="calc-res-card">
              <div class="calc-res-label">Yearly</div>
              <div class="calc-res-value" id="nc-yearly">${fmtMoney(example1M * 12)}</div>
            </div>
            <div class="calc-res-card">
              <div class="calc-res-label">Per 1K Views</div>
              <div class="calc-res-value" id="nc-per-mille">${fmtMoney(n.rpm.mid)}</div>
            </div>
          </div>
          <p style="margin-top:16px;font-size:.8rem;color:var(--text-muted);">⚠ Estimate only. Actual RPM varies by sub-niche, exact audience mix, and ad density. Check YouTube Studio for real data.</p>
        </div>

        <h2>${escapeHtml(n.name)} Audience Geography</h2>
        <p>Audience geography is the single biggest driver of RPM for ${escapeHtml(n.name)} channels. Here is the typical viewing distribution:</p>
${renderGeoBar(n.geo)}
        <p style="font-size:.85rem;color:var(--text-muted);margin-top:8px;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#10B981;margin-right:4px;"></span> Tier 1 (US/CA/UK/AU/DE) • <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#F59E0B;margin-right:4px;"></span> Tier 2 (BR/MX/CN) • <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#EF4444;margin-right:4px;"></span> Tier 3 (IN/PK/ID/BD)</p>

        <h2>${escapeHtml(n.name)} RPM by Sub-Niche</h2>
        <p>Within ${escapeHtml(n.name)} content, different formats earn meaningfully different RPMs:</p>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr><th>Sub-Niche</th><th>RPM Range</th><th>Notes</th></tr>
            </thead>
            <tbody>
              ${renderSubNicheTable(n)}
            </tbody>
          </table>
        </div>

        <h2>Why ${escapeHtml(n.name)} Channels Earn ${n.tier.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())} RPM</h2>
${n.whyParagraphs.map(w => `        <h3>${escapeHtml(w.h)}</h3>\n        <p>${escapeHtml(w.p)}</p>`).join('\n')}

        <h2>${escapeHtml(n.name)} Earnings by View Count</h2>
        <p>Reference table showing estimated monthly AdSense revenue at the three RPM tiers for ${escapeHtml(n.name)} channels:</p>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Monthly Views</th>
                <th>RPM ${fmtMoney(n.rpm.low)} (low)</th>
                <th>RPM ${fmtMoney(n.rpm.mid)} (typical)</th>
                <th>RPM ${fmtMoney(n.rpm.high)} (high)</th>
              </tr>
            </thead>
            <tbody>
              ${renderEarningsTable(n)}
            </tbody>
          </table>
        </div>

        <h2>Example ${escapeHtml(n.name)} Channels (Reference)</h2>
        <p>Representative channel archetypes at different scales. Exact RPMs vary; these are industry-reported ranges:</p>
        <ul>
${n.channelExamples.map(c => `          <li><strong>${escapeHtml(c.name)}</strong> (~${escapeHtml(c.subs)} subs) — ${escapeHtml(c.notes)}</li>`).join('\n')}
        </ul>

        <h2>FAQ — ${escapeHtml(n.name)} YouTube Earnings</h2>
${renderFaq(n)}

        <h2>Sources</h2>
        <ul class="sources-list">
${n.sources.map(s => `          <li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.label)}</a></li>`).join('\n')}
          <li>Creator-reported RPM data from r/PartneredYoutube and public creator analytics disclosures</li>
        </ul>

      </div>
    </div>
  </section>

  <section class="related-calculators">
    <div class="container">
      <h2>Related Tools &amp; Guides</h2>
      <div class="article-grid">
        <a href="/youtube-niche-rpm-calculator.html" class="article-card">
          <div class="tag">Calculator</div>
          <div class="title">Full Niche RPM Calculator</div>
          <div class="desc">Compare RPM across all YouTube niches in one tool.</div>
        </a>
        <a href="/youtube-rpm-by-country.html" class="article-card">
          <div class="tag">Guide</div>
          <div class="title">RPM by Country 2026</div>
          <div class="desc">Detailed CPM and RPM rates for every major country.</div>
        </a>
        <a href="/best-youtube-niches-high-rpm.html" class="article-card">
          <div class="tag">Guide</div>
          <div class="title">Best High-RPM Niches</div>
          <div class="desc">Ranked list of the highest-paying YouTube niches.</div>
        </a>
      </div>
    </div>
  </section>

</main>

<footer class="site-footer" aria-label="Site footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="logo footer-logo" aria-label="YouTube Money Calculator">
          <span class="logo-icon" aria-hidden="true">▶$</span>
          <span class="logo-text">YT Money Calculator</span>
        </a>
        <p>Free YouTube earnings estimator for creators. Not affiliated with YouTube or Google.</p>
      </div>
      <div class="footer-col">
        <h4>Tools</h4>
        <ul>
          <li><a href="/">YouTube Money Calculator</a></li>
          <li><a href="/youtube-cpm-calculator.html">CPM Calculator</a></li>
          <li><a href="/youtube-shorts-money-calculator.html">Shorts Calculator</a></li>
          <li><a href="/youtube-niche-rpm-calculator.html">Niche RPM Calculator</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Guides</h4>
        <ul>
          <li><a href="/youtube-rpm-guide.html">RPM Guide</a></li>
          <li><a href="/youtube-rpm-by-country.html">RPM by Country</a></li>
          <li><a href="/best-youtube-niches-high-rpm.html">Best Niches</a></li>
          <li><a href="/youtube-ad-revenue-by-niche.html">Revenue by Niche</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="/about.html">About</a></li>
          <li><a href="/privacy.html">Privacy Policy</a></li>
          <li><a href="/contact.html">Contact</a></li>
          <li><a href="/disclaimer.html">Disclaimer</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 YouTube Money Calculator. Not affiliated with YouTube or Google.</p>
    </div>
  </div>
</footer>

<script>
  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      mobileNav.setAttribute('aria-hidden', String(!open));
    });
  }

  // Niche calculator
  (function () {
    const views = document.getElementById('nc-views');
    const rpm   = document.getElementById('nc-rpm');
    const disp  = document.getElementById('nc-rpm-display');
    const mo    = document.getElementById('nc-monthly');
    const day   = document.getElementById('nc-daily');
    const yr    = document.getElementById('nc-yearly');
    const pm    = document.getElementById('nc-per-mille');
    if (!views || !rpm) return;

    const fmt = n => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    function update() {
      const v = Math.max(0, Number(views.value) || 0);
      const r = Number(rpm.value);
      const monthly = v / 1000 * r;
      disp.textContent = fmt(r);
      mo.textContent  = fmt(monthly);
      day.textContent = fmt(monthly / 30);
      yr.textContent  = fmt(monthly * 12);
      pm.textContent  = fmt(r);
    }

    views.addEventListener('input', update);
    rpm.addEventListener('input', update);
    update();
  })();
</script>
</body>
</html>
`;
}

// ─── Main ────────────────────────────────────────────────────────────────────
let generated = 0;
for (const n of NICHES) {
  const out = path.join(BASE, `${n.slug}.html`);
  fs.writeFileSync(out, renderPage(n), 'utf8');
  generated++;
  console.log(`  ✓ ${n.slug}.html  (RPM ${n.rpm.low}-${n.rpm.high}, ${n.geo[0].country} ${n.geo[0].pct}%)`);
}

console.log(`\nGenerated ${generated} niche pages.`);
