# DermaSathi — React Conversion

This is a React/Vite conversion of the uploaded Google Stitch DermaSathi immersive design.

## Run
```bash
npm install
npm run dev
```

Then open the local Vite URL.

## Pages
Home, Login/Signup, Dashboard, Skin Scan, Report, Resources, Profile, Settings.

## Notes
- The Stitch HTML was converted into React components rather than kept as static HTML.
- The home page uses the exported Stitch screenshots as rotating dermatology visual backgrounds.
- A lightweight WebGL skin-texture shader is implemented in `src/components/SkinShader.jsx`.
- The scan flow supports image upload and a simulated analysis pipeline.
- The app is ready to connect to your existing backend/ML logic later.
