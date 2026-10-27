# Share image

`app/opengraph-image.png` and `app/twitter-image.png` are static so their URLs
end in `.png` (with `trailingSlash: true`, a generated route would 308-redirect,
which some social crawlers don't follow).

To regenerate after changing copy or design:

1. Copy `assets/og/opengraph-image.tsx` to `app/og-render/opengraph-image.tsx`.
2. `npm run build && npm start`, then save `http://localhost:3000/og-render/opengraph-image/`
   over both PNGs in `app/`.
3. Delete `app/og-render/`.
