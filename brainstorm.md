                       ┌─────────────────────┐
                       │     index.html      │  <-- Base HTML (Webpack injects JS/CSS here)
                       └─────────┬───────────┘
                                 │
                                 ▼
                         ┌──────────────┐
                         │  index.js    │  <-- App entry point
                         └──────┬───────┘
                                │
                                ▼
                         ┌──────────────┐
                         │   App.js     │  <-- Bootstraps routing, state, etc.
                         └──────┬───────┘
                                │
       ┌────────────────────────┼─────────────────────────┐
       ▼                        ▼                         ▼
┌──────────────┐        ┌───────────────┐         ┌────────────────┐
│   Pages/     │        │ Components/   │         │     Styles/    │
│ (Views/UI)   │        │ (Logic Blocks)│         │  (CSS Modules) │
└────┬─────────┘        └──────┬────────┘         └────────┬───────┘
     │                         │                           │
     ▼                         ▼                           ▼
[ HomePage.js ]        [ WeatherCard.js ]         [ home.css, base.css ]
[ CitiesPage.js ]      [ HourlyForecastChart.js ] [ layout.css, reset.css ]
[ SearchPage.js ]      [ CityCard.js ]            [ responsive.css, ... ]
[ ... ]                [ ... ]                    [ components/, pages/ ]

       │                         ▲
       ▼                         │
┌──────────────┐         ┌─────────────┐
│     UI/      │◄────────┤ UI Elements │
│ (Render layer│         │  e.g., Card │
│  + Styling)  │         └─────────────┘
└──────────────┘

