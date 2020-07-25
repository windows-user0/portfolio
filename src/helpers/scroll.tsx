function preventDefault(e: Event) {
    e.preventDefault();
}
export function enableScroll() {
    document.body.removeEventListener("touchmove", preventDefault);
}
export function disableScroll() {
    document.body.addEventListener("touchmove", preventDefault, {
        passive: false,
    });
}
