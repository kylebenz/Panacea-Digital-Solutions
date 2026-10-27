# Web fonts

Trimmed copies of the Google Fonts releases, served by `next/font/local`
(`app/layout.tsx`). All three are licensed under the SIL Open Font License 1.1
(https://openfontlicense.org).

| File                          | Family          | Kept                                            |
| ----------------------------- | --------------- | ----------------------------------------------- |
| `fraunces-latin.woff2`        | Fraunces        | latin subset · wght 350–500 · opsz 12–80        |
| `instrument-sans-latin.woff2` | Instrument Sans | latin subset · wght 400–600                     |
| `jetbrains-mono-latin.woff2`  | JetBrains Mono  | latin subset · wght 500–600 · no code ligatures |

Each was made from the Google Fonts latin `woff2` with fontTools:

```sh
pip install fonttools brotli
# 1. Limit the variable axes to the ranges the design uses.
python3 -c "from fontTools.ttLib import TTFont; from fontTools.varLib import instancer as i; \
f=TTFont('in.woff2'); o=i.instantiateVariableFont(f, {'wght': (350, 500), 'opsz': (12, 80)}); \
o.flavor='woff2'; o.save('tmp.woff2')"
# 2. Keep the latin range and the layout features in use.
python3 -m fontTools.subset tmp.woff2 --flavor=woff2 --no-hinting --desubroutinize \
  --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2190-2193,U+2212,U+2215,U+FEFF,U+FFFD" \
  --layout-features="kern,liga,tnum,lnum,case,locl,ccmp,mark,mkmk,rvrn" \
  --output-file=out.woff2
```

JetBrains Mono drops `liga` and `case` as well (no code ligatures in labels).
If the design starts using a weight outside these ranges, regenerate the file
with the wider range rather than letting the browser synthesize it.
