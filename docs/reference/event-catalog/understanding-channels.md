# Overview

Copy as Markdown[View as Markdown](/docs/development/guides/messages/overview.md)

***

EventCatalog supports different types of messages ([commands](/docs/development/guides/messages/commands/introduction.md), [events](/docs/development/guides/messages/events/introduction.md) and [queries](/docs/development/guides/messages/queries/introduction.md)).

* **Commands**
  * Commands are messages that represent intent, commands can be rejected in distributed systems.
* **Events**
  * Events are a type of message that represent immutable facts.
* **Queries**
  * Queries are a type of message that represent requests for information.

### Linking messages to services, domains and channels[​](#linking-messages-to-services-domains-and-channels "Direct link to Linking messages to services, domains and channels")

* Messages can be sent (producer) or received (consumer) by [services](/docs/development/guides/services/introduction.md), [domains](/docs/development/guides/domains/creating-domains/adding-messages-to-domains.md) or be totally independent.
* You can also route messages through one or more [channels](/docs/development/guides/channels/adding-messages-to-services.md).

### Where do messages live?[​](#where-do-messages-live "Direct link to Where do messages live?")

Messages can live anywhere in your catalog, at the service level or domain level.

**Example of a message living at the service level**

Here we have the `OrderPlaced` message living at the service level.

```
services/
  Orders/
    events/
      OrderPlaced/
        index.mdx
```

**Example of a message living at the domain level**

Here we have the `OrderPlaced` message living at the domain level.

```
domains/
  Orders/
    events/
      OrderPlaced/
        index.mdx
```

You can reference messages from anywhere in your catalog

It does not matter where you store your messages, you can reference them from anywhere in your catalog. Your domains and services will reference them by their `id` and optionally the `version`. EventCatalog will resolve the message.
