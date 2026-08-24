# Environment Check

I added a small environment checker because I kept finding it easy to
mix up configuration problems with contract problems.

It checks three things:

- chain id
- RPC URL
- market contract address

The idea is simple: if the configuration is obviously wrong, I would
rather find that before trying to debug the transaction itself.

This is intentionally only a helper and does not change the contract.
