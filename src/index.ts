import type { FrameTime } from "./types"

export class AnimationFrameLoop {
  private request: number = 0
  private lastTime: number = 0
  private totalElapsedTime: number = 0
  private totalFrameCountInSecond: number = 0
  private currentFps: number = 0
  private lastFpsUpdate: number = 0

  constructor(private callback: (params: FrameTime) => void) {
    if (this.request) return

    const frame = (currentTime: number): void => {
      const deltaTime = (currentTime - this.lastTime) / 1000
      this.totalElapsedTime += deltaTime
      this.lastTime = currentTime
      this.totalFrameCountInSecond++

      if (currentTime - this.lastFpsUpdate >= 1000) {
        this.currentFps = this.totalFrameCountInSecond
        this.totalFrameCountInSecond = 0
        this.lastFpsUpdate = currentTime
      }

      const time: FrameTime = {
        totalElapsedTime: this.totalElapsedTime,
        currentFps: this.currentFps,
        deltaTime
      }

      this.callback(time)
      this.request = requestAnimationFrame(frame)
    }

    this.lastTime = performance.now()
    this.request = requestAnimationFrame(frame)
  }

  destroy(): void {
    if (!this.request) return

    cancelAnimationFrame(this.request)
    this.request = 0
  }
}
