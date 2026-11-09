"use client";

import { useEffect } from "react";

export default function SmoothWheelScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetY = window.scrollY;
    let frame = 0;
    let previousTime = 0;
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;

    const cancelPending = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      targetY = window.scrollY;
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    };

    const canScrollInside = (start: EventTarget | null, delta: number) => {
      let element = start instanceof Element ? start : null;
      while (element && element !== document.body) {
        const style = window.getComputedStyle(element);
        const allowsVerticalScroll = /(auto|scroll)/.test(style.overflowY);
        if (allowsVerticalScroll && element.scrollHeight > element.clientHeight) {
          const atTop = element.scrollTop <= 0;
          const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 1;
          if ((delta < 0 && !atTop) || (delta > 0 && !atBottom)) return true;
        }
        element = element.parentElement;
      }
      return false;
    };

    const animate = (time: number) => {
      const elapsed = previousTime ? Math.min(time - previousTime, 40) : 16;
      previousTime = time;
      const progress = 1 - Math.exp(-elapsed / 145);
      const nextY = window.scrollY + (targetY - window.scrollY) * progress;
      window.scrollTo(0, Math.abs(targetY - nextY) < 0.7 ? targetY : nextY);
      if (Math.abs(targetY - window.scrollY) < 0.7) {
        window.scrollTo(0, targetY);
        frame = 0;
        previousTime = 0;
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
        return;
      }
      frame = window.requestAnimationFrame(animate);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY) return;
      const target = event.target;
      if (target instanceof Element && target.closest("input, textarea, select, [contenteditable='true']")) return;
      if (canScrollInside(target, event.deltaY)) return;

      const unit = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? window.innerHeight : 1;
      const delta = event.deltaY * unit;
      const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const nextTarget = Math.max(0, Math.min(maxY, (frame ? targetY : window.scrollY) + delta));
      if (nextTarget === (frame ? targetY : window.scrollY)) return;

      event.preventDefault();
      document.documentElement.style.scrollBehavior = "auto";
      targetY = nextTarget;
      if (!frame) frame = window.requestAnimationFrame(animate);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) cancelPending();
    };
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("a[href^='#']")) cancelPending();
    };

    document.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    document.addEventListener("touchstart", cancelPending, { passive: true });
    return () => {
      document.removeEventListener("wheel", onWheel);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
      document.removeEventListener("touchstart", cancelPending);
      if (frame) window.cancelAnimationFrame(frame);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  return null;
}
