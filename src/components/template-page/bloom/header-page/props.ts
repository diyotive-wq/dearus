export const imageDecorations = (theme: string) => [
  {
    position: {
      top: "0",
      right: "0",
    },
    sources:
      theme.toLowerCase() === "pink"
        ? "https://firebasestorage.googleapis.com/v0/b/dearus-f7987.firebasestorage.app/o/template%2Fbloom%2Fdecoration_images%2Fpink_theme%2Fflower-corner-top-1-pink.png?alt=media&token=3b7e1563-27c2-4aa6-ba6b-fbd8654ca6aa"
        : "https://firebasestorage.googleapis.com/v0/b/dearus-f7987.firebasestorage.app/o/template%2Fbloom%2Fdecoration_images%2Fblue_theme%2Fflower-corner-top-1-blue.png?alt=media&token=2ee0a224-6e34-4ef4-91c9-79ebb173f21b",
    initialTransition: { opacity: 0, x: 50, y: 0 },
    transition: { opacity: 1, x: 0, y: 0 },
  },
  {
    position: {
      top: "0",
      left: "0",
    },
    sources:
      theme.toLowerCase() === "pink"
        ? "https://firebasestorage.googleapis.com/v0/b/dearus-f7987.firebasestorage.app/o/template%2Fbloom%2Fdecoration_images%2Fpink_theme%2Fflower-corner-top-1-pink.png?alt=media&token=3b7e1563-27c2-4aa6-ba6b-fbd8654ca6aa"
        : "https://firebasestorage.googleapis.com/v0/b/dearus-f7987.firebasestorage.app/o/template%2Fbloom%2Fdecoration_images%2Fblue_theme%2Fflower-corner-top-1-blue.png?alt=media&token=2ee0a224-6e34-4ef4-91c9-79ebb173f21b",
    initialTransition: { opacity: 0, x: -50, y: 0 },
    transition: { opacity: 1, x: 0, y: 0 },
    imageStyles: { transform: "scaleX(-1)" },
  },
  {
    position: {
      bottom: "0",
      right: "0",
    },
    sources:
      theme.toLowerCase() === "pink"
        ? "https://firebasestorage.googleapis.com/v0/b/dearus-f7987.firebasestorage.app/o/template%2Fbloom%2Fdecoration_images%2Fpink_theme%2Fflower-corner-bottom-2-pink.png?alt=media&token=2c73762a-61b6-4bb0-b5dc-dfe0628e824f"
        : "https://firebasestorage.googleapis.com/v0/b/dearus-f7987.firebasestorage.app/o/template%2Fbloom%2Fdecoration_images%2Fblue_theme%2Fflower-corner-bottom-2-blue.png?alt=media&token=3336b5bf-7e86-4cb0-932a-f884c50bd8be",
    initialTransition: { opacity: 0, x: 50, y: 0 },
    transition: { opacity: 1, x: 0, y: 0 },
  },
  {
    position: {
      bottom: "0",
      left: "0",
    },
    sources:
      theme.toLowerCase()  === "pink"
        ? "https://firebasestorage.googleapis.com/v0/b/dearus-f7987.firebasestorage.app/o/template%2Fbloom%2Fdecoration_images%2Fpink_theme%2Fflower-corner-bottom-2-pink.png?alt=media&token=2c73762a-61b6-4bb0-b5dc-dfe0628e824f"
        : "https://firebasestorage.googleapis.com/v0/b/dearus-f7987.firebasestorage.app/o/template%2Fbloom%2Fdecoration_images%2Fblue_theme%2Fflower-corner-bottom-2-blue.png?alt=media&token=3336b5bf-7e86-4cb0-932a-f884c50bd8be",
    initialTransition: { opacity: 0, x: -50, y: 0 },
    transition: { opacity: 1, x: 0, y: 0 },
    imageStyles: { transform: "scaleX(-1)" },
  },
];
