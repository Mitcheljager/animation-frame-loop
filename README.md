# Animation Frame Loop

[![npm version](https://badgen.net/npm/v/animation-frame-loop)](https://www.npmjs.com/package/animation-frame-loop)
[![npm downloads](https://badgen.net/npm/dt/animation-frame-loop)](https://www.npmjs.com/package/animation-frame-loop)
[![bundle size](https://img.shields.io/bundlephobia/minzip/animation-frame-loop)](https://bundlephobia.com/package/animation-frame-loop)

A small package to keep track of frame related things, most notably deltaTime. Useful when creating animations that need to be consistent with varying frame counts.

### Installation

Install using Yarn or NPM, or any other package manager you might prefer.
```js
yarn add animation-frame-loop
```
```js
npm install animation-frame-loop
```

## Usage

```js
import { AnimationFrameLoop } from "animation-frame-loop"

const loop = new AnimationFrameLoop(({ deltaTime, totalElapsedTime, currentFps }) => {
  // Do your thing
})

// Destroy the loop when you're done
loop.destroy()
```

`deltaTime` provides the time between the previous and the current frame.
`totalElapsedTime` provides the total time the loop has run for
`currentFps` provides the frames per second for the current second.

`.destroy()` can be called to destroy the loop, stopping the callback from being called.
