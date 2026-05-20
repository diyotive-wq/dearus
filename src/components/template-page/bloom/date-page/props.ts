export const imageDecorations = (theme: string) => [
  {
    position: {
      top: "0",
      left: "0",
    },
    sources:
      theme.toLowerCase() === "pink"
        ? "https://firebasestorage.googleapis.com/v0/b/dearus-f7987.firebasestorage.app/o/template%2Fbloom%2Fdecoration_images%2Fpink_theme%2Fflower-corner-top-2-pink.png?alt=media&token=e2886e4f-4bd4-4bdd-bcda-6ba06a9f0444"
        : "https://firebasestorage.googleapis.com/v0/b/dearus-f7987.firebasestorage.app/o/template%2Fbloom%2Fdecoration_images%2Fblue_theme%2Fflower-corner-top-2-blue.png?alt=media&token=f9338364-bcd7-438e-b0e1-0aff3ad72cb4",
    initialTransition: { opacity: 0, x: -50, y: 0 },
    transition: { opacity: 1, x: 0, y: 0 },
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
];
