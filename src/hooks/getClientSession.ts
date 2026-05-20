export default async function getClientSession() {
  const res = await fetch("/api/get-sessions", {
    next: { revalidate: 60 },
    cache: "no-store",
  });
  const json = await res.json();
  const isAuthenticated = json.data;
  return isAuthenticated;
}
