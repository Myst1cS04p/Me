---
layout: post
title: "The 11-Year-Old vs. Harvard: My 'Gaming Site' Relic"
date: 2026-02-15
author: Myst1cS04p
tags: [flask, python, cs50, web-dev, nostalgia]
color: "#4a90e2ff"
excerpt: "In the pre-AI era, I decided to tackle Harvard’s CS50 final project at age 11. No ChatGPT, no Copilot—just me, some Flask documentation, and a dream of building a gaming portal. Looking back at the code is a mix of awe and pure horror."
reading_time: "4.5 min read"
css: assets/css/articles.css
cover: 
---

## The Audacity of Youth

Most 11-year-olds are busy playing games. I decided I wanted to build the place where people *find* games. 

I was taking the Harvard CS50 course online for free. It was the "Old World"—before you could just ask an LLM to explain a stack trace. If your code broke, you had to actually read the error, look at your manual `INSERT` statements, and pray.

This project was my "Final Project" attempt. I never ended up submitting it, but looking at the codebase now, the fact that I was even attempting to manage a SQLite database and user authentication at that age is honestly a bit insane.

---

## The Tech Stack (The 'Spaghetti' Era)

I wasn't just writing HTML. I was trying to build a full-stack application.

* **Backend:** Flask (Python).
* **Database:** SQLite (managed via the CS50 library).
* **Frontend:** Jinja2 templates and raw CSS.
* **Logic:** Pure, unadulterated trial and error.

---

## Visual Aesthetics: The 'Gamer' Palette

Looking at `index_style.css`, I had a very specific vision.

> **Font:** Bebas Neue (The universal 'I am a serious gamer' font).
> **Colors:** Dark grays (`#32313b`), deep oranges (`#d48141`), and aggressive reds (`#b33131`).

I was obsessed with hover effects. I have code like:
```css
.nav-items li, a:hover {
    color: #b33131;
    transition: all 0.2s ease 0s;
}
```

Every link had to feel "alive." If the color didn't change when the mouse touched it, the site felt broken to me.

---

## Technical 'Crimes' That Keep Me Up at Night

Now that I’m older and actually know how security works, looking at this code is like watching a horror movie where the character walks into the dark basement alone.

### 1. The `eval()` Incident

In `app.py`, I found this gem:

```python
data_from_client = request.get_data()
tmp = data_from_client.decode()
data_from_client = tmp
tmp = eval(data_from_client) # <--- OH NO.
```

For those who don't know: using `eval()` on data coming from a user is essentially handing them a loaded gun and pointing it at your server. `eval()` executes any string you give it as python code. So if a user, for example were to pass in something like `"__import__('os').system('rm -rf /')"` and you ran `eval()` on it, the code would actually execute.

But hey, it made the data parsing work, and that was all 11-year-old me cared about.

### 2. Password Security (Or Lack Thereof)

I was storing passwords in **plain text**. No hashing. No salting. Just:
`INSERT INTO users(name,password,login_id) VALUES(?,?,?)`

If you registered on my 11-year-old self's site, your security was non-existent. Sorry about that.

### 3. The Random ID Generator

I didn't use UUIDs. I used `random.randint(00000000, 99999999)`. I even wrote a little check to see if the ID already existed, which is actually surprisingly responsible for a kid who was also using `eval()`.

---

## What I Actually Learned

This project was my introduction to the **"Deep End."** 

**Lesson 1: Documentation is the only friend you have.**
Without AI to explain things, I had to learn how to read the Flask documentation and the CS50 library specs. It taught me how to find answers for myself—a skill that is arguably becoming a lost art in the age of "Just ask ChatGPT."

**Lesson 2: State management is hard.**
Trying to keep a user logged in, tracking their "best wave," and routing them through different templates was my first taste of how complex web logic really is.

**Lesson 3: Completion > Perfection.**
I didn't submit it because it wasn't "perfect" or finished. In hindsight, I should have. The fact that an 11-year-old built a functional registration system with database persistence is an achievement in itself.

---

## Closing Thoughts

Is the code good? **Absolutely not.** It’s a security nightmare with weird naming conventions and hardcoded logic.

But it’s **my** code.

It represents the moment I stopped being a consumer of technology and started being a creator. I didn't have an AI assistant holding my hand. I had to struggle through every syntax error and every broken CSS layout.

I’m 10x better now, but I still have a soft spot for this messy, orange-and-black gaming portal. It was the start of everything.

---

You can [see the chaos for yourself here](https://github.com/Myst1cS04p/Gaming-Site).

*Ironically I got Gemini to write ts for me. Crazy downfall ngl. From builing flask sites with no AI to not being able to manually type a 100 lines.*
