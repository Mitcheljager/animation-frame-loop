import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { AnimationFrameLoop } from "."

describe("AnimationFrameLoop", () => {
  let loop: AnimationFrameLoop

  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubGlobal("performance", { now: vi.fn(() => 0) })
    vi.stubGlobal("requestAnimationFrame", vi.fn((cb) => setTimeout(() => cb(performance.now()), 16)))
    vi.stubGlobal("cancelAnimationFrame", vi.fn(clearTimeout))
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.resetAllMocks()
  })

  it("Should start the loop and call the callback", async() => {
    const callback = vi.fn()
    new AnimationFrameLoop(callback)

    vi.advanceTimersByTime(16)
    expect(callback).toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledTimes(Math.ceil(100 / 16))
  })

  it("Should stop the loop when destroy() is called", () => {
    const callback = vi.fn()
    const loop = new AnimationFrameLoop(callback)

    vi.advanceTimersByTime(100)

    loop.destroy()
    const callCount = callback.mock.calls.length

    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledTimes(callCount)
  })
})
