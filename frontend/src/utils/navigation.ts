import { Href, router } from "expo-router";

// A screen opened through a deep link has nothing to go back to, so it falls back to a fixed screen
export const goBackOr = (fallback: Href) => {
  if (router.canGoBack()) router.back();
  else router.replace(fallback);
};
