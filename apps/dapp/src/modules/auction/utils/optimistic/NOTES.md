# Optimistic updates

- The dapp uses react-query for async data fetching/management
- The dapp fetches its data from a subgraph backend

There are two subgraph queries used in the dapp for auction data:

1. The list of auctions (displayed on dashboard): `getAuctionLots` graphql query
2. The auction details (displayed on an auction page): `getBatchAuctionLot` (fetches the same data as the list, only useful if the user cold starts the dapp on an auction page)

# Why do we need optimistic updates?

The subgraph listens for smart contract function call events. This is asynchronous, thus there can be a delay between the time the user performs the smart contract call, and when the subgraph receives this event and updates the data.

This leads to issues in the dapp such as the user placing a bid, and then not being able to see it because the subgraph hasn't updated yet.

In these scenarios we can use react-query's built in support for optimistic updates to update the cached data of the relevant queries, so that the user sees the change immediately.

# Strategy

1. When the user performs an action that will change the subgraph data (e.g. place a bid), we update the react-query cache optimistically.
2. We also tag that optimsitic update with a timestamp, so that the next time the dapp tries to refetch the data, it first checks if there's an an "active" optimistic update in place. In which case it won't overwrite the optimistic data until the optimistic update has "expired".

See: `STALE_DURATION_AFTER_OPTIMISTIC_UPDATE` (at the time of writing the optimistic update will persist for 10 seconds before being considered stale)
