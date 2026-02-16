---
layout: post
title: "Building a Discord Poll Wrapper"
date: 2025-02-15
author: Myst1cS04p
tags: [discord, api, python, library design, tooling]
color: "#1b76ffff"
excerpt: "Discord recently introduced a native polling system. It’s clean, built into the platform, and honestly much nicer than the reaction-based polls most bots use. The problem? There wasn’t a simple, lightweight Python wrapper that let you create and manage these polls without dragging in an entire Discord bot framework."
reading_time: "5 min read"
css: assets/css/articles.css
cover: assets/img/articles/covers/pollcord.gif
title-image: assets/img/articles/titles/pollcord.png
---

## Why I Built It

Discord recently introduced a native polling system. It’s clean, built into the platform, and honestly much nicer than the reaction-based polls most bots use. The problem? There wasn’t a simple, lightweight Python wrapper that let you create and manage these polls without dragging in an entire Discord bot framework.

Most existing solutions assumed you were already using a large library like `discord.py` or similar. That’s fine if you’re building a full bot, but not great if you just want to integrate polling into an existing async system or microservice.

So I built **Pollcord** — a small wrapper around Discord’s poll API designed to:

* Create polls with a simple function call
* Track poll state locally
* Run callbacks when polls end
* Fetch vote counts and users
* Stay lightweight and framework-agnostic

It was supposed to be simple.

It was not.

---

## Context

At the time, I was in a phase where I wanted to strip things down and build something minimal, just to see how the pieces would fit together. The goal wasn’t to ship quickly or make something production-ready. It was to test ideas, validate assumptions, and figure out what worked and what didn’t.

I started by creating the initial version of the wrapper, which worked perfectly in isolated testing. I could:

* Create polls
* Let them expire
* Trigger callbacks
* Fetch results

Everything behaved exactly as expected. Confident in the results, I released a beta.

Then, I tried integrating it into my actual bot. That’s when everything fell apart.

What worked in a controlled test environment started breaking in real usage:

* Polls ending twice
* Callbacks firing inconsistently
* End logic creating weird loops
* Edge cases I hadn’t even considered

The wrapper wasn’t broken in an obvious way. It was worse: it was subtly wrong. And subtle async bugs are the worst kind.

Two months ago, I paused the project at a very early stage. It never reached a stable or usable state, and it’s important to be clear about that. Right now, it’s more of a prototype or a technical sketch than a real product.

To be explicit:

* It is not stable.
* It should not be used for anything serious.
* I don’t have any immediate plans to finish or productionize it.

This blog post is more of a technical reflection than a product announcement.

---

## Technical Challenges

### 1. Poll Lifetime vs. Local State

Discord manages poll expiration on its servers.
My wrapper also tracked poll duration locally to trigger callbacks.

That created two independent “clocks”:

* Discord’s poll expiration
* My local async scheduler

If those two ever got out of sync, strange things happened:

* Poll ended locally but not on Discord
* Poll ended on Discord but callback never fired
* Callback firing twice

---

### 2. The Callback Recursion Trap

One of the early designs looked something like this:

```
client.end_poll()
    → poll.end()
        → client.end_poll()
```

That’s a recursion loop disguised as “clean separation of concerns.”

In theory, it made sense:

* The client ends the poll via API
* The poll object handles its own lifecycle

In practice:

* A small logic mistake could cause infinite API calls
* Or double callbacks
* Or inconsistent poll state

Async recursion through network calls is not something you want to debug at 2 a.m.

---

### 3. Race Conditions Between Manual and Scheduled Ends

Two different things could try to end the same poll:

1. The scheduled expiration task
2. A manual `end_poll()` call

If they happened at the same time, both could:

* Mark the poll as ended
* Fire the callback
* Cancel each other’s tasks

Result: duplicate results, inconsistent logs, and very confusing behavior.

---

### 4. Rate Limits and API Response Handling

Discord rate limits aggressively.
My first implementation assumed:

* The API always returns JSON
* `retry_after` is always present
* The response format is predictable

None of those assumptions are safe.

In real usage, you have to handle:

* Text responses
* Missing fields
* Headers instead of JSON values
* Temporary API quirks

Otherwise your “simple wrapper” becomes a crash generator.

---

## Overcoming the Issues

### 1. Clear Separation of Responsibilities

The final design rule became:

* **Poll objects never talk to the API**
* **PollClient handles all API interaction**
* Poll only manages local state and callbacks

That eliminated recursion risks and made the control flow obvious.

---

### 2. Making Poll Termination Atomic

To prevent race conditions, poll termination was guarded with an async lock:

* If two tasks try to end the poll
* Only one actually runs the callback
* The other exits silently

This guarantees:

* Callback fires once
* State stays consistent
* No weird timing bugs

---

### 3. Defensive Networking Code

The HTTP layer was hardened to:

* Handle both JSON and text responses
* Respect rate limits from either JSON or headers
* Retry safely without infinite loops

Instead of assuming the API behaves nicely, the code now assumes it will eventually do something weird.

Because it will.

---

### 4. Strict Validation

Before even touching the API, the wrapper now checks:

* Minimum and maximum option counts
* Session initialization
* Valid response structure

Failing early is better than failing mysteriously.

---

## What I Learned

A few important lessons came out of this:

### Async code that “works” is not necessarily correct

If your tests don’t simulate real concurrency, you’re just testing the happy path.

Real users create edge cases you never thought of.

---

### Separation of concerns matters more in async systems

Circular logic that might work in synchronous code becomes dangerous when:

* Tasks run concurrently
* Network calls are involved
* State can change mid-execution

---

### Race conditions are silent killers

They don’t crash your code immediately.

They just:

* Fire callbacks twice
* Lose state
* Produce inconsistent behavior

And those bugs are much harder to detect.

---

## Future Plans

There are several improvements planned for the wrapper:

### 1. Poll Manager

A centralized system to:

* Track active polls
* Restore them after restarts
* Prevent orphaned poll objects

---

### 2. Persistence Support

Right now, polls exist only in memory.
Future versions may support:

* Redis
* SQLite
* Custom storage backends

So polls survive bot restarts.

---

### 3. Better Result Handling

Planned additions:

* Built-in result formatting
* Winner detection
* Tie handling utilities

---

### 4. Framework Integrations

Optional adapters for:

* discord.py
* nextcord
* py-cord

Without forcing users to adopt a specific framework.

---

## Closing Thoughts

The first version of this wrapper worked perfectly in testing.
It only started breaking once it faced real concurrency, real users, and real timing.

That experience was frustrating, but also valuable.
It forced a better architecture, safer async patterns, and more defensive code.

---

You can [check it out](https://github.com/Myst1cS04p/Pollcord/) if you want to have a go at my shit code XD

---

***disclaimer***: *this post was partially written by AI*