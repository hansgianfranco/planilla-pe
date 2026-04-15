# Contributing to sunat-utils

First of all, thank you for considering contributing to this project

## How to contribute

### 1. Fork the repository
Click "Fork" on GitHub and clone your fork.

```bash
git clone https://github.com/hansgianfranco/sunat-utils.git
````

### 2. Create a branch

```bash
git checkout -b feature/my-feature
```

### 3. Make your changes

* Follow existing code style
* Keep functions small and reusable
* Add tests when possible

### 4. Run tests

```bash
npm run build
npm test
```

### 5. Commit changes

```bash
git commit -m "feat: add new feature"
```

### 6. Push and open PR

```bash
git push origin feature/my-feature
```

Then open a Pull Request.

---

## Code style

* TypeScript preferred
* Functional approach
* No side effects in utilities
* Keep functions pure when possible

---

## Tests

We use Node.js built-in test runner:

```bash
node --test
```

---

## What we accept

* Bug fixes
* New utilities for SUNAT (Peru-related logic)
* Performance improvements
* Documentation improvements

---

## What we avoid

* Breaking changes without discussion
* External API dependencies
* Unrelated features outside scope of SUNAT utilities
