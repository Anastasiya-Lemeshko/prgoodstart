import { Marquee, Swipe } from "vevet";

const marqueeContainers = document.querySelectorAll(".marquee");

const setMarquee = () => {
  if (!marqueeContainers || !marqueeContainers.length) return;

  marqueeContainers.forEach((container) => {
    const marquee = new Marquee({
      container,
      speed: "0.1vw",
      gap: "4vw"
    });

    const swipe = new Swipe({
      container,
      grabCursor: true,
      onMove: ({ step }) => marquee.render(-step.x),
      onStart: () => marquee.updateProps({ enabled: false }),
      onEnd: ({ diff }) => {
        marquee.updateProps({
          enabled: true,
          speed: diff.x > 0 ? "-0.1vw" : "0.1vw"
        });
      }
    });
  });
};

export { setMarquee };