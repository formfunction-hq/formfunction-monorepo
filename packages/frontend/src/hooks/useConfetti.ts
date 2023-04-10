import confetti from "canvas-confetti";

export default function useConfetti() {
  return function () {
    confetti({
      particleCount: 200,
      spread: 80,
      zIndex: 99999,
    });
  };
}
