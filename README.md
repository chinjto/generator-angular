# Generator Angular

Custom Angular schematics for opinionated project structures.

This package provides reusable Angular generators for projects following the structure:

```text
src/app/
├── core/
├── pages/
└── shared/
    ├── components/
    │   ├── sections/
    │   ├── cards/
    │   └── tiles/
    └── styles/
```

Generated components are:

- Standalone
- SCSS-based
- OnPush by default
- Located in the correct folder according to their type

---

## Installation

```bash
npm install -D @chinjto/generator-angular
ng add @chinjto/generator-angular
```

The `ng add` command automatically configures Angular to use the schematics collection.

---

## Usage

### Generate a page

```bash
ng g page home
```

Creates:

```text
src/app/pages/home/
├── home.ts
├── home.html
└── home.scss
```

---

### Generate a section

```bash
ng g section hero
```

Creates:

```text
src/app/shared/components/sections/hero/
├── hero.ts
├── hero.html
└── hero.scss
```

Selector:

```html
<section-hero></section-hero>
```

---

### Generate a card

```bash
ng g card project
```

Creates:

```text
src/app/shared/components/cards/project/
├── project.ts
├── project.html
└── project.scss
```

Selector:

```html
<card-project></card-project>
```

---

### Generate a tile

```bash
ng g tile skill
```

Creates:

```text
src/app/shared/components/tiles/skill/
├── skill.ts
├── skill.html
└── skill.scss
```

Selector:

```html
<tile-skill></tile-skill>
```

---

## Generated component example

```ts
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'section-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {}
```

---

## Project status

### v1.0.0

Features:

- `ng add @chinjto/generator-angular`
- `ng g page`
- `ng g section`
- `ng g card`
- `ng g tile`
- Standalone components
- SCSS stylesheets
- OnPush change detection
- Automatic folder placement

---

## License

MIT
