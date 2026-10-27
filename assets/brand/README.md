# Brand assets

`panacea-logo-source.webp` is the logo as supplied (1254×1254, white background).
`panacea-mark.png` is the same mark cropped, with the white background removed
(alpha from the distance to the background colour, colour un-blended at the
anti-aliased edges).

Derived files:

| File                                             | Use                                                             |
| ------------------------------------------------ | --------------------------------------------------------------- |
| `public/brand/panacea-mark-{64,96,144}.webp`     | Header, footer, and menu mark (`components/brand/Monogram.tsx`) |
| `app/icon.png` (192×192, transparent)            | Favicon                                                         |
| `app/apple-icon.png` (180×180, paper background) | iOS home screen                                                 |

Logo palette (sampled from the source) — tokens in `app/globals.css`:

| Token       | Hex       | Role                                                       |
| ----------- | --------- | ---------------------------------------------------------- |
| `teal-deep` | `#023A52` | Primary button hover; deepest petrol                       |
| `teal`      | `#046081` | Brand colour on light: links, focus rings, primary buttons |
| `teal-mid`  | `#0298B5` | Gradient stop                                              |
| `cyan`      | `#01D3DE` | Gradient stop                                              |
| `mint`      | `#3DDBBA` | Gradient stop                                              |
| `aqua`      | `#5EC8C8` | Brand colour on ink: links, focus, primary buttons         |
| `aqua-soft` | `#8ADBD0` | Primary button hover on ink                                |
| `ink`       | `#0B1D26` | Text and dark chapters (petrol black)                      |

The gradient (`--gradient-brand`) appears only as hairlines. If a vector (SVG)
logo becomes available, replace the WebP files and keep the same component.
