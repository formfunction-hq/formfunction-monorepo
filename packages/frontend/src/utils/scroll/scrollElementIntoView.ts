export default function scrollElementIntoView(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element == null) {
    return;
  }

  element.scrollIntoView({ behavior: "smooth" });
}
