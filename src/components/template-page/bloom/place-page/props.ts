export const imageDecorations = (theme: string) => [
  {
    position: {
      bottom: "0",
      left: "0",
    },
    sources:
      theme.toLowerCase() === "pink"
        ? "https://firebasestorage.googleapis.com/v0/b/dearus-f7987.firebasestorage.app/o/template%2Fbloom%2Fdecoration_images%2Fpink_theme%2Fflower-corner-bottom-3-pink.png?alt=media&token=9c003905-d2bf-467a-984c-92d9fc335f2d"
        : "https://firebasestorage.googleapis.com/v0/b/dearus-f7987.firebasestorage.app/o/template%2Fbloom%2Fdecoration_images%2Fblue_theme%2Fflower-corner-bottom-3-blue.png?alt=media&token=16feee2c-95af-4e42-b84b-f102682f27e0",
    initialTransition: { opacity: 0, x: -50, y: 0 },
    transition: { opacity: 1, x: 0, y: 0 },
  },
  {
    position: {
      top: "0",
      right: "0",
    },
    sources:
      theme.toLowerCase() === "pink"
        ? "https://firebasestorage.googleapis.com/v0/b/dearus-f7987.firebasestorage.app/o/template%2Fbloom%2Fdecoration_images%2Fpink_theme%2Fflower-corner-top-3-pink.png?alt=media&token=46067701-21d3-4857-beeb-65f5c70afbb1"
        : "https://firebasestorage.googleapis.com/v0/b/dearus-f7987.firebasestorage.app/o/template%2Fbloom%2Fdecoration_images%2Fblue_theme%2Fflower-corner-top-3-blue.png?alt=media&token=5b97a281-f880-486b-a94d-17861374f278",
    initialTransition: { opacity: 0, x: 50, y: 0 },
    transition: { opacity: 1, x: 0, y: 0 },
  },
];
