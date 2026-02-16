---
layout: post
title: "Chickens Vs Humans: What Happens When Your Team Disappears"
date: 2025-02-15
author: Myst1cS04p
tags: [game jam, unity, game-design, mobile-optimization, collaboration]
color: "#fff235ff"
excerpt: "In August 2023, I entered a nation-wide game jam with a team of five. By the end, I'd done 95% of the work alone, spent days debugging projectile physics, learned mobile optimization from scratch, and watched my 'team leader' walk away with the award plaque. The game won 'Ridiculously Engaging Game' and placed top 20. This is what actually happened."
reading_time: "10 min read"
css: assets/css/articles.css
cover: assets/img/articles/covers/chickens.jpg
title-image: assets/img/articles/titles/chickens.png
---

## The Setup

The Mindstorm Labs game jams are supposed to be collaborative. You get assigned a team, divide responsibilities, and build something together under time pressure.

That's the theory.

I got assigned to a team of five people. Within the first week, two teammates vanished completely. Just... stopped responding. The coordinators shuffled people around and gave us replacements.

The replacements also did nothing.

By week three, I'd built the entire game myself. The core loop, the enemies, the towers, the UI, the balancing—everything.

Then, in the final days before submission, my "team" suddenly reappeared.

---

## The Team Dynamics (Or Lack Thereof)

Let me be specific about what "team" meant in this context:

**Week 1-2:** Radio silence from most teammates. I started building core systems alone because no one was coordinating anything.

**Week 2-3:** Original teammates formally left. New people were added. They also didn't contribute. I kept building.

**Week 3:** One programmer was assigned to help. I asked him to fix a single bug—enemy pathing getting stuck on corners. Simple pathfinding issue. He didn't do it.

**Week 4, Final Days:** I was away from my house when the submission deadline was approaching. That same bug was still breaking the game. I had to practically *beg* this guy to fix it. He eventually did. Barely.

**Final Day:** The "team leader"—who had been absent for 90% of the jam—suddenly came alive. She'd made egg sprites. They were... not good. Rough, inconsistent, didn't match the game's style.

I was 13, exhausted, and didn't have the energy to argue. I integrated them.

**After Submission:** *We* placed top 20 (out of 100+) and won an award. The ceremony happened. They gave us a physical plaque.

The team leader took it.

I was too shy and too young to say anything. I just watched her walk away with the trophy for a game I'd built almost entirely alone.

---

## Some Rough Lessons I Learnt

I learned more from this experience about working with people than I did from any actual teamwork.

**Lesson 1: People will take credit for work they didn't do.**

And if you're young, quiet, or conflict-averse, they'll get away with it.

**Lesson 2: The label "Team leader" doesn't always mean "person who leads."**

In this case it just meant "person who talks the most" or "person who shows up at the end." 

Leadership is functional. Often the label lags behind the contribution.

**Lesson 3: You can't rely on people who aren't invested.**

If someone isn't contributing early, they won't suddenly become helpful later. Hoping they will just wastes your time.

**Lesson 4: Speak up or get walked over.**

I didn't complain to the coordinators. I didn't push back when the team leader took the plaque. I didn't advocate for myself.

That was ***my*** mistake. And I never made it again.

This wasn't collaboration. It was me doing the work while other people's names got attached to it.

But it also taught me that I *could* build something substantial alone. And that I didn't need to wait for permission or help to make things happen.

---

## The Technical Challenges

Building a mobile tower defense game in four weeks sounds manageable.

It's not.

Especially when you're 13, working alone, and learning half the required skills as you go.

---

### 1. The Egg Projectile Arc Problem

Tower defense games need projectiles that feel good.

For "Chickens Vs Humans," the main attack was chickens throwing eggs at farmers.

**The problem:**
* Eggs needed to follow a realistic physics arc
* The arc had to match where the player tapped
* But also account for moving targets
* And feel responsive, not laggy or floaty

**What I tried first:**
* Basic linear projectiles (looked terrible)
* Rigidbody physics (too unpredictable)
* Hardcoded arcs (didn't adapt to distance)

None of it worked.

**The solution I eventually found:**

I spent *days* on this. Literally. I must have rewritten the projectile system five or six times.

Eventually, I figured out a hybrid approach:
* Calculate the required arc using kinematic equations
* Apply initial velocity based on target distance and desired apex height
* Let Unity's physics handle the rest
* Add slight homing for moving targets (invisible, just enough to feel good)

It wasn't perfect. But it felt *right*. The eggs flew in satisfying arcs, hit targets reliably, and responded to player input without feeling scripted.

That one mechanic took up probably 20% of my total development time.

---

### 2. UI That Fought Back

The UI was a constant source of pain.

**Problems I hit:**
* Buttons not scaling correctly across devices
* Mana bar visual glitches
* Text rendering at wrong sizes on different screens
* Touch input occasionally not registering
* UI elements overlapping on smaller screens

Mobile UI is harder than it looks. You're not designing for one screen size. You're designing for *hundreds*, all with different aspect ratios, resolutions, and DPI settings.

I ended up using Unity's Canvas Scaler with a reference resolution, anchor presets for every UI element, and a lot of manual testing on different virtual devices.

It worked. Eventually. After many, many iterations.

> Most likely, it'll still break on a bunch of devices; but at the time, I did not care lol.

---

### 3. Enemy Health and Damage Systems

This sounds simple: enemy has health, egg does damage, health goes down.

It was not simple. T-T

**Issues I ran into:**
* Enemies dying before damage animations played (looked janky)
* Overkill damage carrying to the wrong enemy
* Health bars not updating smoothly
* Edge cases where enemies became invincible due to timing bugs
* And just in general a crap ton of hit reg, and unity physics x animator bugs

I ended up building a centralized damage manager and health system that worked independently of each other.

Was this over-engineered for a jam game? Maybe.

Did it fix the bugs? Yes.

---

### 4. Animation vs. Movement Synchronization

I wanted enemies to look good while moving.

Unity had other plans.

**The problem:**
Enemies moved along paths using `transform.position`, and animations played based on speed, but movement speed and animation speed weren't synced. Not to mention the fact that rigidbody physics does ***NOT*** like being paired with animators or transformations. So now I had janky ahh collisions and moments when coliders would end up overlapping leading to weird physics behaviors and enemies being thrown off screen. Wild stuff.

**The solution:**
* Match animation speed to actual movement velocity
* Use root motion for critical animations
* Blend animations smoothly when speed changed
* Enable/Disable Rigidbody when needed to mitigate any conflicts with other systems. 

This took *forever* to get right. Every time I fixed one issue, another appeared.

By the end, enemies moved smoothly, albeit looking like clones since they walked the same. 

---

### 5. Mobile Optimization Hell

The game jam specified: **mobile games only**.

I'd been building for desktop the whole time.

Two weeks before the deadline, I tested on an actual phone.

It ran at 8 FPS.

**Panic mode activated.**

I had to learn mobile optimization from scratch. Fast.

**Things I learned the hard way:**

**Batching:**
Unity batches draw calls to reduce overhead, but only if materials and meshes are set up correctly. So, I had to reorganize my entire asset structure.

**Mesh combining:**
Multiple small meshes = many draw calls. So, you combine meshes where possible. I wrote a script to merge static environment objects. Huge pain.

> NOTE: Don't be like me. Be smart and use an open source script and save yourself time. 

**LOD (Level of Detail):**
Since, distant objects don't need full detail, you create lower-poly versions for background elements. Unity's LOD groups handle transitions automatically.

I don't think this was the biggest optimization, especially considering there wasn't really any signifficant distance between the camera and the map. But I was squeezing out ever frame I could get, so it's whatever.

**Model optimization:**
Many asset store models had way too many vertices. I spent *hours* in Blender reducing poly counts. 

Retopologizing meshes, removing hidden faces, simplifying geometry. Not a fun experience. 

**Lighting and shadows:**
Real time shadows for a static map is not a good idea. Instead you can "*bake*" your shadows. Which is essentially the process of taking static shadows (the ones that don't move) and hardcoding them into the environment textures. 

Reducing shadow quality also helps a lot. 

After a week of optimization work, the game ran at 40-50 FPS on mid-range phones. Not perfect, but playable.

I learned more about performance optimization in that week than I had in months of casual development.

---

## The Final Days

The submission deadline was approaching.

I'd built:
* Core tower defense mechanics
* 4-5 enemy types with different armors (just put upside down buckets and whatnot on their heads lol)
* 5-6 distinct eggs
* Wave progression system
* Mana economy
* UI and menus
* Mobile optimization
* Animation systems
* Damage and health management
* Projectile physics

My "team" had contributed:
* One bug fix (under duress)
* Bad egg sprites (last minute)

I submitted the game with hours to spare.

Then waited.

---

## The Results

Out of 100+ teams (mostly university students working in groups), "Chickens Vs Humans" placed **top 20 overall**.

**AND** It won the **"Ridiculously Engaging Game"** award.

The judges praised:
* The core loop and pacing
* The unique art style (including those MS Paint UI elements)
* Mobile performance

At the ceremony, they handed us a plaque.

My team leader took it. Said thanks on behalf of "the team."

I stood there, 13 years old, too shy to say anything.

She kept it.

---

## What I Actually Learned

This jam taught me more than any successful collaboration could have.

### 1. You can do more alone than you think

I built a complete, award-winning mobile game in four weeks.

While learning optimization, physics systems, and mobile development as I went.

When people say "you need a team," they usually mean "it's easier with a team."

But easier isn't the same as necessary.

> I do want to hedge that "award-winning" in this context is "award-winning" in terms of a small country nation-wide jam.

### 2. Scope is survival

You can't build everything.

I cut:
* Complex narrative
* Multiple game modes
* Elaborate tutorials (was just a screenshot with text)
* Sound design (minimal effects only)
* Perfect balance
* Any feature that didn't serve the core loop

If it didn't make the game more fun or more complete, it didn't make it in.

That ruthless prioritization is the only reason I finished.

### 3. Constraints force mastery

I didn't *want* to learn mobile optimization.

I *had* to. The game wouldn't run otherwise.

I didn't *want* to spend days on projectile arcs.

But that mechanic defined the feel of the game. It had to be right.

Some of my deepest technical learning happened because I had no choice but to solve the problem myself.

### 4. Don't let yourself get walked over

The team leader taking that plaque wasn't the worst part. The worst part was me letting it happen. Because, I didn't speak up. I didn't push back. I accepted being invisible.

That was the last time I did that. Because if you don't advocate for yourself, no one else will.

---

## Technical Debt I'm Still Embarrassed About

Let's be honest: the code was a disaster.

* No proper architecture
* Spaghetti references everywhere
* Magic numbers hardcoded into scripts
* The projectile system that worked but I couldn't fully explain
* An egg selection system literally built off of switch-case statements 💀

If I were building this as a real project, I'd rewrite 80% of it.

But for a jam, It shipped. It worked. And people enjoyed it.

That's what mattered.

---

## Closing Thoughts

"Chickens Vs Humans" wasn't a solo project.

Technically.

There were names attached. People got credit. The plaque went to someone else.

But the game itself? The systems, the optimization, the design, the execution?

That was all me. Learning as I went. Building alone while others watched.

And placing top 20 nationally against university teams. So, I don't have the plaque.

But I have the game. And I have the knowledge that I built something people cared about, under pressure, with no safety net.

That's worth more than a trophy someone else is holding.

---

You can [play it here](https://myst1cs04p.itch.io/chickens-vs-humans) if you want to see what four weeks of solo panic looks like.
***disclaimer***: *this post was partially written by AI, but I did decide to put some effort in this time lol.*