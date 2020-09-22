export default async function fetchCampaignData() {
  return fetch(
    "http://5c3db915a9d04f0014a98a79.mockapi.io/campaigns"
  ).then((res) => res.json());
}
