---
layout: post
title: "Boss Fight Postmortem: My First Game Jam"
date: 2025-02-14
author: Myst1cS04p
tags: [game dev, game jam, GDevelop, postmortem]
color: "#E01BFF"
excerpt: "A look back at my first-ever game, created in 48 hours for the Dev Pad Game Jam. What went right, what went wrong, and what I learned."
reading_time: "5 min read"
css: assets/css/articles.css
cover: /assets/img/project_icons/BossFight.png
---

**Boss Fight** was my debut game project, created for the Dev Pad Game Jam in May 2021. It marked several firsts for me: first game, first team collaboration, and first time sharing a project with others.

## The Concept

The game is a fast-paced action experience set in a continuous boss battle arena. Players need to master timing, pattern recognition, and strategy to survive.

The concept was inspired by the jam's theme, which emphasized the intensity and learning curve typical of boss fights.

## What Went Right

### Scope Management

We kept the concept simple: three simple bosses, one arena, focused mechanics. This allowed us to actually finish and polish what we had rather than scrambling to implement half-baked features.

### Pattern Design

The boss patterns were predictable enough to learn but challenging enough to punish mistakes. This balance made the game feel fair even when difficult.

### Team Communication

This was my first time collaborating remotely with a team. We used Discord for coordination and managed to stay aligned throughout the 48-hour window.

## What Went Wrong

### Last-Minute Bug

I almost shipped with a game-breaking bug in the final boss phase. The attack pattern would occasionally lock up, making the boss invincible.

**Lesson learned:** Always test edge cases, especially phase transitions.

### Limited Feedback Time

We didn't leave enough time for external playtesting. Some balance issues only became apparent after submission.

### Audio Polish

Sound effects were added in the last few hours and it shows. They're functional but not polished.

## Technical Breakdown

The game was built using **GDevelop**, a visual game engine that was perfect for a first project. Here's how the core mechanics worked:

### Boss Behavior System

```
Phase 1: Simple attacks
- Pattern A: Linear projectiles
- Pattern B: Circular spread

Phase 2: Chaos mode
- Combines both patterns
- Increased speed
- Added random elements
```

The pattern system used a simple state machine that triggered based on health thresholds.

## Reception

The feedback was incredibly positive. Players appreciated:
- The clear visual indicators for attacks
- The learning curve (challenging but fair)
- The satisfying feeling of mastering patterns

## Key Takeaways

1. **Scope ruthlessly** - Finishing a simple game beats abandoning a complex one
2. **Test edge cases** - Phase transitions and state changes are where bugs hide
3. **Leave time for polish** - Audio and visual polish matter more than I expected
4. **Document patterns** - Writing down enemy behaviors helped team communication
5. **Playtest early** - Even 5 minutes of external feedback is valuable

---

You can [play Boss Fight on itch.io](https://shotgunflamez.itch.io/boss-fight) if you want to see where it all started.

---

***disclaimer***: *i did not write ts. it's ai generated for better or worse.*