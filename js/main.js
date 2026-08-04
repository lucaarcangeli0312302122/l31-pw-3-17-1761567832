// Applica subito tema/lingua salvati per evitare un flash visivo al caricamento.
// Eseguito immediatamente (non attende il DOM) perché deve impostare l'attributo
// data-theme prima che il browser disegni la pagina.
(function () {
  try {
    var storedTheme = localStorage.getItem('ruffino-theme');
    var theme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();

document.addEventListener('DOMContentLoaded', function () {
  // Evidenzia il link di navigazione attivo in base alla sezione visibile
  (function () {
    var navLinks = document.querySelectorAll('.main-navbar .nav-link');
    var sections = Array.from(navLinks)
      .map(function (link) { return document.querySelector(link.getAttribute('href')); })
      .filter(Boolean);

    function setActiveLink() {
      var current = sections[0];
      sections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= 140) {
          current = section;
        }
      });
      navLinks.forEach(function (link) {
        var isActive = link.getAttribute('href') === '#' + current.id;
        link.classList.toggle('active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    // Mostra/nasconde il pulsante "torna su"
    var backToTop = document.getElementById('backToTop');
    function toggleBackToTop() {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }

    window.addEventListener('scroll', function () {
      setActiveLink();
      toggleBackToTop();
    }, { passive: true });

    setActiveLink();
    toggleBackToTop();

    // Chiude il menu mobile dopo il click su una voce (miglior UX su schermi piccoli)
    var mobileMenu = document.getElementById('mainNav');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (mobileMenu.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(mobileMenu).hide();
        }
      });
    });

    // Animazioni leggere "reveal on scroll", disattivate se l'utente preferisce meno movimento
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var revealTargets = document.querySelectorAll('.reveal');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      revealTargets.forEach(function (el) { observer.observe(el); });
    }
  })();

  // Selettore lingua (IT/EN) e tema chiaro/scuro
  (function () {
    var LANG_KEY = 'ruffino-lang';
    var THEME_KEY = 'ruffino-theme';

    var metaTitleEn = 'Ruffino Cares · Sustainability Report';
    var metaDescriptionEn = 'Ruffino Sustainability Report: environmental, social and governance initiatives, 2030 Agenda goals and results of the Ruffino Cares program.';

    var translations = {
      en: {
        skip_link: 'Skip to main content',
        nav_azienda: 'Company',
        nav_pilastri: 'Pillars',
        nav_ambiente: 'Environment',
        nav_sociale: 'Social',
        nav_governance: 'Governance',
        nav_sdg: '2030 Agenda',
        nav_fonti: 'Sources',

        hero_eyebrow: 'Sustainability Report · FY 2023',
        hero_title: 'Ruffino Cares: sustainability as shared value',
        hero_lead: 'Since 1877, Ruffino\u2019s Tuscan winemaking tradition has embraced innovation and ESG commitment, on a journey rooted in the hills of Pontassieve and now extended to every estate of the Group. Through the <strong>Ruffino Cares</strong> program, the company turns its sustainability vision into concrete, measurable actions capable of generating shared value for the environment, for the people who live and work the land, and for the entire supply chain \u2014 without ever losing sight of the quality that has always set its wines apart.',
        hero_cta1: 'Discover the pillars',
        hero_cta2: 'Download the Report (PDF)',
        hero_stat1: 'Founding year, Pontassieve (FI)',
        hero_stat2: 'Countries where the brand is distributed',
        hero_stat_tenute: 'Estates of the Group, in Tuscany and Veneto',
        hero_stat_persone: 'People working every day across the Group',
        hero_stat3: '2030 Agenda SDGs monitored',
        hero_stat4: 'Estates certified Biodiversity Friend',

        azienda_eyebrow: 'Who is Ruffino',
        azienda_title: 'A Tuscan story, a global commitment',
        azienda_p1: 'Founded in 1877 in Pontassieve, near Florence, by cousins Ilario and Leopoldo Ruffino, the company was created to showcase Tuscany\u2019s winemaking tradition through the production of high-quality wines. Over nearly a hundred and fifty years of history, Ruffino has never simply settled for consolidating its position in the wine market: today it is one of the world\u2019s leading Italian wine brands, present in more than 90 countries and a genuine ambassador for Made in Italy on every continent. Part of the American group <strong>Constellation Brands</strong>, one of the world\u2019s leading beverage companies, Ruffino has combined winemaking tradition with technological innovation, developing over time a sustainability strategy that is increasingly embedded in its business model and in its estates, spread across some of Tuscany\u2019s most celebrated wine-growing areas.',
        azienda_p2: 'In 2018, <strong>Ruffino Cares</strong> was launched: the program through which the company puts its ESG (Environmental, Social, Governance) commitment into practice. Initially conceived as a container for Corporate Social Responsibility initiatives, it has gradually evolved into the strategic framework for implementing sustainability policies, with the stated goal of establishing itself as a <em>Brand of Purpose</em> by 2025, offering consumers a concrete and verifiable answer in terms of responsible production.',
        azienda_quote: '\u201CProviding a concrete answer to consumers too, who are increasingly attentive to and focused on sustainable products, the result of a responsible production chain.\u201D',
        azienda_cite: 'Ruffino Cares, from the FY 2023 Sustainability Report',
        azienda_timeline1: '<span class="mini-stat-number">1890</span> Ruffino becomes official supplier to the Royal House and the Duke of Aosta',
        azienda_timeline2: '<span class="mini-stat-number">1927</span> Riserva Ducale is born, still one of the most iconic labels today',
        azienda_timeline3: '<span class="mini-stat-number">2018</span> Acquisition of Ca\u2019 del Duca and La Duchessa, the first estates in Veneto',
        azienda_timeline4: '<span class="mini-stat-number">2023</span> New vineyards in Bolgheri, among the most prestigious appellations in the world',
        azienda_map_caption: 'The seven Tuscan estates, from Chianti to Bolgheri · Source: ruffino.it',
        azienda_map_note: 'Alongside the seven Tuscan estates are two estates in Veneto, <strong>Ca\u2019 del Duca</strong> and <strong>La Duchessa</strong>, dedicated to the production of Prosecco and Pinot Grigio, for a total of 9 estates across the Group.',
        azienda_img1_caption: 'The historic garden of one of the Tuscan estates · Source: FY 2023 Sustainability Report',
        azienda_img2_caption: 'Hospitality and tastings overlooking the vineyards · Source: FY 2023 Sustainability Report',

        divider_title: 'A commitment rooted in the land, reaching the people',
        divider_text: 'Every estate, every row of vines and every rural hamlet dotting the Tuscan landscape tells part of Ruffino\u2019s sustainability strategy: a journey that starts with the care of the soil and reaches, step by step, the local communities who live and work in these places.',

        pilastri_eyebrow: 'The Ruffino Cares program',
        pilastri_title: 'The four pillars of sustainability',
        pilastri_lead: 'The strategic framework through which Ruffino turns its ESG commitment into concrete actions, embedding sustainability not as a set of occasional initiatives, but as a structured approach guiding the decisions and activities of the entire organisation, from vineyard to cellar, all the way to its relationship with consumers and communities. In the programme\u2019s logo, created in 2018, a leaf, an embrace and a glass merge into the shape of a heart, visually symbolising the strategy\u2019s four areas of action.',
        pillar1_title: 'Environmental and productive sustainability',
        pillar1_text: 'Protecting the environment and its biodiversity through sustainable agronomic practices, the gradual conversion to organic farming, the adoption of precision viticulture based on data and sensors, and the most conscious possible use of the water and energy resources available on the land.',
        pillar2_title: 'Diversity and inclusion',
        pillar2_text: 'Fostering a genuinely inclusive corporate culture, marked by diversity of background, experience and perspective, that faithfully reflects the consumers and communities in which the company lives and works, nurturing a shared sense of belonging at every level.',
        pillar3_title: 'Responsible drinking',
        pillar3_text: 'Actively promoting responsibility and moderation in the consumption of alcoholic beverages, through recreational and educational initiatives aimed at raising awareness of the harm caused by alcohol abuse and highlighting the socio-cultural value of mindful consumption.',
        pillar4_title: 'Commitment to others',
        pillar4_text: 'Concretely supporting local communities, backing initiatives in favour of local excellence, grassroots associations, disadvantaged groups and people in need, as part of a <em>giving back</em> approach to a share of the value generated.',

        ambiente_tag: 'E · Environmental',
        ambiente_title: 'Environmental sustainability and land stewardship',
        ambiente_lead: 'Responsible management of agricultural land is one of the key pillars for ensuring production continuity in the face of the threats posed by climate change. The transition towards more virtuous management unfolds along three closely interconnected paths: conversion to organic farming, biodiversity protection, and the efficient management of water and energy resources.',
        amb_img1_caption: 'Vine rows at dawn, among the hills of the Ruffino estates · Source: ruffino.it',
        amb_img2_caption: 'Aerial view of vineyards and olive groves in Tuscany · Source: ruffino.it',
        amb_kpi1_title: 'Conversion to organic farming',
        amb_kpi1_text: 'The gradual shift to organic farming, launched in 2016, has enabled Ruffino to implement this production method across all of its estates, eliminating chemical herbicides (replaced by mechanical under-row cultivation) and adopting organic fertilisation. The only exceptions are a few recently acquired vineyards, whose full organic conversion is expected by <strong>2027</strong>.',
        amb_kpi2_title: 'Biodiversity Friend',
        amb_kpi2_text: '<strong>100%</strong> of the Group\u2019s agricultural estates are certified under the international Biodiversity Friend standard, confirming the presence of healthy ecosystems that support native fauna and flora, safeguarding the land\u2019s natural balance.',
        amb_kpi3_title: 'Rainwater collection basins',
        amb_kpi3_text: 'Ruffino has built a series of artificial basins for collecting rainwater, achieving the strategic goal of covering more than <strong>50%</strong> of the irrigation needs of its Tuscan vineyards using only water accumulated during rainy periods, without competing with local communities for drinking water.',
        amb_kpi4_title: 'Precision irrigation',
        amb_kpi4_text: 'The adoption of precision drip irrigation, calibrated to the actual water needs of each individual row, guarantees a documented water saving of more than <strong>50%</strong> compared with traditional irrigation methods, significantly reducing waste.',
        amb_kpi5_title: 'Natural water treatment',
        amb_kpi5_text: 'Cellar wastewater is biologically treated through <strong>3 purification plants</strong> and <strong>3 natural phyto-purification systems</strong>, which harness the filtering capacity of marsh plants, sand and gravel, following a process with a very low environmental impact.',
        amb_kpi6_title: 'Precision viticulture',
        amb_kpi6_text: 'NDVI vigour maps make it possible to detect water stress or the presence of disease before it becomes visible to the naked eye, while the <em>Kattivo</em> technology kit, developed with Ruffino\u2019s involvement, adjusts the dosage of crop-protection products according to the thickness of the vine canopy, achieving savings of up to <strong>30%</strong> on plant-protection products.',

        amb_energy_tag: 'E · Energy, climate and circular economy',
        amb_energy_title: 'Energy, emissions and waste management',
        amb_energy_lead: 'Beyond soil and water management, Ruffino\u2019s environmental sustainability journey includes energy efficiency, a gradual transition to renewable sources, the reduction of CO\u2082 emissions and a structured commitment to reducing and properly recycling the waste it generates.',
        amb_kpi7_title: 'Green energy and solar power',
        amb_kpi7_text: 'Since 2020 the Pontassieve plant has run entirely on green energy from third-party suppliers, an approach progressively extended to the Venetian estates and wineries as well. The energy transition continues with the roll-out of the company\u2019s first photovoltaic plants, starting with La Solat\u00eca, to increase renewable self-generation.',
        amb_kpi8_title: 'Low-impact company fleet',
        amb_kpi8_text: 'The company fleet increasingly includes electric, hybrid and plug-in hybrid vehicles, supported by dedicated charging stations, as part of a plan to progressively replace the traditional car fleet with lower-impact solutions.',
        amb_kpi9_title: 'CO\u2082eq emissions',
        amb_kpi9_text: 'Ruffino closely monitors its greenhouse gas emissions, distinguishing between direct emissions (Scope 1) and indirect emissions (Scope 2): the latter are calculated using both the location-based and market-based methods, the second of which accounts for the share of green energy purchased, reducing the overall reported impact.',
        amb_kpi10_title: 'Waste reduction and recycling',
        amb_kpi10_text: 'The company pursues a path of progressive waste reduction and responsible management of hazardous waste, favouring the recycling of a significant share of the waste generated and sending most of the material from the Pontassieve plant into recovery supply chains.',
        amb_img3_caption: 'Manual grape harvesting, still at the heart of Ruffino\u2019s quality today · Source: FY 2023 Sustainability Report',
        amb_biodiversity_p: 'Tuscany is the second Italian region for plant biodiversity, with more than <strong>3,200 plant species</strong> and a rich wildlife heritage that the Ruffino estates help protect: part of the land of the La Solat\u00eca estate and the Murlo plot (Greppone Mazzi) falls within the Natura 2000 network sites of <em>Montagnola Senese</em> and <em>Basso Merse</em>. Since 2008 the company has also supported pollinator protection projects, with beehives active at the Gretole estate and, since 2021, at Ca\u2019 del Duca in Veneto, and has collaborated since 2019 with CREA-Viticoltura e Enologia di Conegliano to monitor flavescence dor\u00e9e in the Venetian vineyards.',

        sociale_tag: 'S · Social',
        sociale_title: 'Equity and the value chain',
        sociale_lead: 'The social dimension of Ruffino\u2019s ESG strategy unfolds along two complementary lines: on one hand, enhancing internal human capital through policies geared towards inclusion, worker protection and equal opportunities; on the other, promoting responsible practices along the entire value chain, involving suppliers, business partners and, ultimately, consumers themselves. In FY 2023 the Group counted <strong>255 people</strong> overall, of whom 240 on stable contracts.',
        social_highlight_title: 'Gender Equality Certification',
        social_highlight_text: 'A significant milestone in this journey was achieving Gender Equality Certification under the UNI/PdR 125:2022 practice, confirming the adoption of a management system designed to ensure equity, inclusion and equal opportunities within the organisation. A dedicated steering committee was also established, tasked with defining policies, monitoring performance indicators and promoting actions to foster equal access to positions of responsibility, alongside the progressive elimination of the gender pay gap.',
        mini_stat1: '<span class="mini-stat-number">40/60</span> ratio between female and male workforce',
        mini_stat2: '<span class="mini-stat-number">~40%</span> strategic leadership and management positions held by women',
        mini_stat3: '<span class="mini-stat-number">0</span> pay gap recorded between genders',
        social1_title: 'Evaluation of Sustainability',
        social1_text: 'Ruffino regards its suppliers as an integral part of its sustainability journey and requires them to comply with ethical, social and environmental standards consistent with the company\u2019s values. An indicator called <strong>Evaluation of Sustainability (EoS)</strong> has been introduced, derived from a questionnaire administered to <em>dry goods</em> suppliers \u2014 such as bottling materials, packaging and distribution \u2014 to assess their level of sustainability and compare it against the company\u2019s minimum standards across the entire supply chain.',
        social2_title: 'Wine in Moderation',
        social2_text: 'As part of its efforts to promote responsible consumption, Ruffino serves as an <em>Ambassador Company</em> for the European <strong>Wine in Moderation (WiM)</strong> program, actively committed to spreading a culture of mindful, moderate drinking, considered one of the pillars of the company\u2019s social responsibility.',
        social3_title: 'Awareness campaigns',
        social3_text: 'This commitment translates concretely into informative messages and dedicated logos on product labels, support for scholarships dedicated to medical research on alcohol-abuse-related conditions, and participation in awareness campaigns, such as <em>In Vino Virtus</em>, carried out in partnership with law enforcement across the country.',

        social_people_tag: 'S · People, training and safety',
        social_people_title: 'Professional growth and workplace safety',
        social4_title: 'Continuous training',
        social4_text: 'Ruffino invests continuously in staff training, introducing cross-functional pathways dedicated to sustainability, open to managers, supervisors, office staff and workers alike, to spread a shared culture across every level of the organisation.',
        social5_title: 'Health and safety',
        social5_text: 'All the Group\u2019s production sites are certified <strong>ISO 45001:2018</strong>, the reference standard for occupational health and safety management. A programme of regular external audits verifies compliance with the standard and supports the ongoing improvement of workplace safety conditions.',
        social6_title: 'Welfare and smart working',
        social6_text: 'The company promotes a flexible way of working through smart working, alongside welfare initiatives such as the opportunity for employees to purchase parent company shares on favourable terms, health insurance, and a parental leave pathway that supports a full return to work.',
        social7_title: 'Responsible packaging',
        social7_text: 'Ruffino is committed to fully recyclable packaging, favouring FSC-certified cardboard and progressively reducing the weight of glass used in its bottles, as part of a circular economy approach applied to the entire bottling supply chain.',

        social_community_tag: 'S · Commitment to others',
        social_community_title: 'Community and territory: the "giving back" approach',
        social_community_lead: 'Ruffino has for years promoted social, educational, economic and environmental initiatives for the benefit of the communities in which it lives and works, as part of a <em>giving back</em> approach to a share of the value generated.',
        social_table_title: 'Resources dedicated to the local area (Euro)',
        social_table_subtitle: 'Comparison FY 2023 · FY 2022 · FY 2021',
        social_table_caption: 'Table of the economic resources allocated by Ruffino to donations, scholarships and Ruffino Cares activities, comparing fiscal years 2021, 2022 and 2023.',
        social_gth1: 'Area',
        social_grow1: 'Donations',
        social_grow2: 'Responsible drinking (scholarships)',
        social_grow3: 'Ruffino Cares activities',
        social_comm1: '<span class="mini-stat-number"><i class="fa-solid fa-heart" aria-hidden="true"></i></span> <strong>MIA.DI</strong>: yearly support for the fundraising dinner in aid of the Meyer Children\u2019s Hospital in Florence.',
        social_comm2: '<span class="mini-stat-number"><i class="fa-solid fa-dove" aria-hidden="true"></i></span> <strong>\u20ac20,000</strong> donated to UNICEF in support of the Ukrainian population.',
        social_comm3: '<span class="mini-stat-number"><i class="fa-solid fa-church" aria-hidden="true"></i></span> Support for the restoration of the organ of the Parish of San Giorgio Martire, in San Don\u00e0 di Piave.',
        social_comm4: '<span class="mini-stat-number"><i class="fa-solid fa-comments" aria-hidden="true"></i></span> <strong>Piazza Ruffino</strong>: regular town-hall meetings with all employees on strategy, sustainability and company news.',

        gov_title: 'Compliance and continuous improvement',
        gov_lead: 'The Sustainability Report highlights a governance system built on an organisational model strengthened by dedicated divisions for specific topics, objectives linked to management performance evaluation, and a path to operational excellence recognised internationally.',
        gov_p1: 'Within this structure, the CEO is responsible for implementing corporate strategies, supported by the Executive Committee and the <strong>Sustainability &amp; Environment Team</strong>. Through this team, coordinated by the CSR &amp; Environmental Sustainability Manager, regular meetings are held to review sustainability initiatives and programmes against a defined set of objectives, constantly monitoring performance and the related KPIs.',
        gov_p2: 'Reinforcing the Group\u2019s commitment in this direction, since 2020 Ruffino has formally linked the achievement of these objectives to its top management\u2019s performance evaluation system, based on a <em>Management by Objectives</em> (MBO) approach: a mechanism that makes sustainability an integral part, rather than a secondary aspect, of managerial responsibility.',
        gov_val1_title: 'Economic value generated',
        gov_val1_text: 'The economic value generated by Ruffino is largely distributed to the Group\u2019s priority stakeholder categories \u2014 employees, suppliers, communities and public administration \u2014 reflecting a model of shared value creation with the territory in which the company operates.',
        gov_val2_title: 'EBITDA and net profit',
        gov_val2_text: 'The Group\u2019s financial results confirm the strength of its business model, in a market context where Italy remains among the world\u2019s leading wine exporters by value.',
        gov_val3_title: 'Management system certifications',
        gov_val3_text: 'The Group\u2019s sites are certified <strong>ISO 14001</strong> for environmental management and <strong>ISO 45001</strong> for workplace safety, while the Group\u2019s companies have adopted the Organisational Model under Italian Legislative Decree 231/2001, safeguarding regulatory compliance.',
        gov_tpm_pillars_p: 'The TPM programme, launched in early 2019, is structured around <strong>9 pillars</strong> covering the company\u2019s entire operational cycle: <em>Focused Improvement</em>, <em>Autonomous Maintenance</em>, <em>Professional Maintenance</em>, <em>Quality Management</em>, <em>Early Equipment Management</em>, <em>Training &amp; Education</em>, <em>Lean Office</em>, <em>Environment</em> and <em>Health &amp; Safety</em>, each with its own mission and dedicated indicators.',
        gov_img_caption: 'The historic cellar, where tradition meets process · Source: ruffino.it',
        gov_kpi1_text: 'Coordinated by the CSR &amp; Environmental Sustainability Manager, with regular meetings to review sustainability initiatives, programmes and KPIs, in direct support of the CEO and the Executive Committee.',
        gov_kpi2_text: 'Since 2020, sustainability objectives have been formally linked to the top management evaluation system (MBO), making ESG performance a structural rather than secondary criterion of corporate management.',
        gov_kpi3_text: 'Thanks to the improvements achieved over time, in May 2023 the company successfully passed the first assessment phase for the <em>Award for TPM Excellence</em>, granted by the Japan Institute of Plant Maintenance (JIPM).',
        gov_tpm_p: 'On an operational level, the turning point is represented by the introduction of the <strong>Total Productive Maintenance (TPM)</strong> method, a practical <em>Learning Organization</em> approach aimed at systematically reducing waste and inefficiencies through the active involvement of the entire workforce, following a continuous-improvement philosophy built on nine operational pillars \u2014 among which those dedicated to workplace safety (<em>Health &amp; Safety</em>), ongoing staff training (<em>Training &amp; Education</em>) and environmental protection stand out. This achievement places Ruffino among the most advanced realities within the Constellation Brands group in terms of continuous improvement and operational excellence.',
        gov_table_title: 'Total Productive Maintenance (TPM) results',
        gov_table_subtitle: 'FY 2023 vs 2019 Baseline comparison',
        gov_table_caption: 'Table of Ruffino\u2019s TPM operational results, comparing fiscal year 2023 with the 2019 baseline, together with the related strategic implication.',
        gov_th1: 'Operational indicator',
        gov_th2: 'Result achieved',
        gov_th3: 'Strategic implication',
        row1_th: 'Plant efficiency',
        row1_td3: 'Optimisation of bottling times and reduction of energy consumption per unit of product.',
        row2_th: 'Equipment breakdowns',
        row2_td3: 'Reduction of machine downtime and minimisation of raw material waste.',
        row3_th: 'Customer complaints',
        row3_td3: 'Higher quality standards as perceived by the end market.',
        row4_th: 'Delivery punctuality',
        row4_td3: 'Strengthening of commercial relationships with large retailers and export markets.',
        row5_th: 'Unsafe acts/conditions',
        row5_td3: 'Active prevention of workplace injuries and improved company climate.',
        row6_th: 'Staff training',
        row6_extra: 'total hours',
        row6_td3: 'Highly specialised staff and a widespread culture of continuous improvement.',

        sdg_eyebrow: '2030 Agenda',
        sdg_title: 'The 9 Sustainable Development Goals addressed',
        sdg_lead: 'The 2030 Agenda, unanimously adopted in 2015 by the 193 member states of the United Nations, sets out 17 Sustainable Development Goals (SDGs) as a fundamental guide for the evolution of sustainability at company level. Ruffino has chosen to act directly on these nine targets, constantly monitoring the relevant metrics and actively working to meet the requirements involved. The same framework guides Ruffino\u2019s alignment with the EU\u2019s <em>Farm to Fork</em> and <em>2030 Biodiversity</em> strategies, part of the European Green Deal, and is periodically updated through a materiality analysis involving company functions, top management and external stakeholders in defining reporting priorities.',
        sdg1_title: 'Good health and well-being',
        sdg1_text: 'Strengthen the prevention of harmful alcohol use, promoting awareness and moderation in consumption.',
        sdg2_title: 'Gender equality',
        sdg2_text: 'Ensure women\u2019s full and effective participation and equal leadership opportunities at all levels of decision-making.',
        sdg3_title: 'Clean water and sanitation',
        sdg3_text: 'Substantially increase water-use efficiency across all production sectors.',
        sdg4_title: 'Affordable and clean energy',
        sdg4_text: 'Considerably increase the share of renewable energy in the overall energy mix used.',
        sdg5_title: 'Decent work and economic growth',
        sdg5_text: 'Achieve higher levels of economic productivity through diversification, technological upgrading and innovation.',
        sdg6_title: 'Responsible consumption and production',
        sdg6_text: 'By 2030, substantially reduce waste generation through prevention, reduction, recycling and reuse.',
        sdg7_title: 'Climate action',
        sdg7_text: 'Strengthen resilience and adaptive capacity to climate-related risks and natural disasters.',
        sdg8_title: 'Life on land',
        sdg8_text: 'Take urgent and significant action to reduce the degradation of natural habitats and halt the loss of biodiversity.',
        sdg9_title: 'Partnerships for the goals',
        sdg9_text: 'Enhance the global partnership for sustainable development, sharing knowledge, expertise, and technological and financial resources.',

        cta_eyebrow: 'Learn more',
        cta_title: 'Continue exploring',
        cta_lead: 'This page summarises the main contents of Ruffino\u2019s Sustainability Report. For the full text and methodological details on the GRI indicators, the original documents can be downloaded in PDF format, made available here as supporting material for this project.',
        cta_btn1: 'Sustainability Report FY 2023',

        footer_text: 'This page was created for informational/academic purposes, to summarise in an accessible way the contents of Ruffino\u2019s Sustainability Report (FY 2023), prepared in accordance with Global Reporting Initiative (GRI) standards. The original documents and some images of estates and vineyards are provided as reference material, with the source indicated, for purely illustrative and non-commercial purposes.',
        footer_heading1: 'Main sources',
        footer_link1: 'Sustainability Report FY 2023',
        footer_link3: 'Official Ruffino website',
        footer_link4: 'WCAG 2.1 guidelines',
        footer_link5: 'UN 2030 Agenda',
        footer_heading2: 'Navigate',
        footer_nav2: 'Environment',
        footer_nav3: 'Social',
        footer_note: 'Unofficial academic project, not affiliated with Ruffino S.r.l. or Constellation Brands. Content summarised from the Sustainability Report published by the company.'
      }
    };

    var attrTranslations = {
      en: {
        navbar_toggle_aria: 'Open/close the navigation menu',
        azienda_map_alt: 'Illustrated map of Tuscany showing the location of the Ruffino estates: Poggio Casciano, Montemasso, Santedame, Gretole, La Solat\u00eca, Greppone Mazzi and Castagneto Carducci (Bolgheri).',
        azienda_timeline_aria: 'Key milestones in Ruffino\u2019s history',
        azienda_media_aria: 'Photographs of Ruffino estates: historic gardens and vineyards',
        azienda_img1_alt: 'Shaded garden of a historic Ruffino estate, with statues, blooming wisteria and outdoor tables.',
        azienda_img2_alt: 'Panoramic terrace of a Ruffino estate overlooking the Tuscan hillside vineyards.',
        media_duo_aria: 'Photographs of Ruffino\u2019s estates and vineyards in Tuscany',
        amb_img1_alt: 'Vineyard rows lit by the light of dawn, with morning mist over the Tuscan hills.',
        amb_img2_alt: 'Aerial view of a Ruffino estate with vineyard rows, olive groves and cypress trees set across the Tuscan hillside landscape.',
        amb_img3_alt: 'Two workers hand-picking grape bunches during harvest in the rows of a Ruffino vineyard.',
        mini_stats_aria: 'Gender equality statistics',
        social_community_list_aria: 'Examples of community initiatives',
        pilastri_logo_alt: 'Ruffino Cares logo: a leaf, an embrace and a glass forming a heart.',
        gov_img_alt: 'Interior of the historic Ruffino cellar with wooden barrels used for wine ageing.',
        back_to_top_aria: 'Back to top of the page'
      }
    };

    var THEME_LABELS = {
      it: { toDark: 'Tema scuro', toLight: 'Tema chiaro' },
      en: { toDark: 'Dark theme', toLight: 'Light theme' }
    };

    var itCache = new Map();
    var itAttrCache = new Map();
    var itLabelCache = new Map();
    var titleItOriginal = document.title;
    var metaDescriptionEl = document.querySelector('meta[name="description"]');
    var metaDescriptionItOriginal = metaDescriptionEl.getAttribute('content');

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      itCache.set(el, el.innerHTML);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      itAttrCache.set(el, el.getAttribute('alt'));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      itAttrCache.set(el, el.getAttribute('aria-label'));
    });
    document.querySelectorAll('[data-i18n-label]').forEach(function (el) {
      itLabelCache.set(el, el.getAttribute('data-label'));
    });

    var currentLang = localStorage.getItem(LANG_KEY) || 'it';
    var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';

    function applyLanguage(lang) {
      currentLang = lang;
      document.documentElement.setAttribute('lang', lang);

      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var key = el.getAttribute('data-i18n');
        if (lang === 'it') {
          el.innerHTML = itCache.get(el);
        } else if (translations.en[key] !== undefined) {
          el.innerHTML = translations.en[key];
        }
      });

      document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-alt');
        if (lang === 'it') {
          el.setAttribute('alt', itAttrCache.get(el));
        } else if (attrTranslations.en[key] !== undefined) {
          el.setAttribute('alt', attrTranslations.en[key]);
        }
      });

      document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-aria');
        if (lang === 'it') {
          el.setAttribute('aria-label', itAttrCache.get(el));
        } else if (attrTranslations.en[key] !== undefined) {
          el.setAttribute('aria-label', attrTranslations.en[key]);
        }
      });

      document.querySelectorAll('[data-i18n-label]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-label');
        if (lang === 'it') {
          el.setAttribute('data-label', itLabelCache.get(el));
        } else if (translations.en[key] !== undefined) {
          el.setAttribute('data-label', translations.en[key]);
        }
      });

      document.title = lang === 'it' ? titleItOriginal : metaTitleEn;
      metaDescriptionEl.setAttribute('content', lang === 'it' ? metaDescriptionItOriginal : metaDescriptionEn);

      document.querySelectorAll('.lang-btn').forEach(function (btn) {
        var isActive = btn.getAttribute('data-lang') === lang;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
      });

      localStorage.setItem(LANG_KEY, lang);
      updateThemeButtonLabel();
    }

    var themeToggleBtn = document.getElementById('themeToggle');
    var themeIcon = themeToggleBtn.querySelector('i');
    var themeLabelEl = themeToggleBtn.querySelector('.theme-toggle-label');

    function updateThemeButtonLabel() {
      var labels = THEME_LABELS[currentLang] || THEME_LABELS.it;
      var isDark = currentTheme === 'dark';
      themeLabelEl.textContent = isDark ? labels.toLight : labels.toDark;
      themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      themeToggleBtn.setAttribute('aria-pressed', String(isDark));
    }

    function applyTheme(theme) {
      currentTheme = theme;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(THEME_KEY, theme);
      updateThemeButtonLabel();
    }

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLanguage(btn.getAttribute('data-lang'));
      });
    });

    themeToggleBtn.addEventListener('click', function () {
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Inizializzazione: applica lingua e tema salvati (o i default) al primo caricamento
    applyLanguage(currentLang);
    updateThemeButtonLabel();
  })();
});
