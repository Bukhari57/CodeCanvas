# TaskFlow — Build Your Own Task & Habit Tracker

## Assignment Overview

You are going to build **TaskFlow**, a task and habit tracker that runs in the browser. A user should be able to add things they need to do, organize them, keep track of what's done, and have their data still be there when they come back the next day.

You will build this using **only HTML, CSS, and vanilla JavaScript**. Do not use any frameworks, libraries, or build tools (no React, Bootstrap, jQuery, etc.). The point is for you to build every part yourself.

The work is divided into **six levels**. Each level builds directly on the one before it, so complete them **in order** — do not jump ahead. After finishing each level, your app should still work and should do a little more than it did before.

Read the requirements for a level, decide *how* you will solve them, and then build. The hints are deliberately short — they tell you what problem to solve, not how to solve it. Figuring out the "how" is the assignment.

---

## Ground Rules

- Only HTML, CSS, and vanilla JavaScript.
- No external libraries or frameworks.
- Your code should run by simply opening the HTML file in a browser (or with a basic local server for Level 5).
- Write clean, readable code. Use meaningful names. Break your logic into small functions instead of one giant block.
- After each level, test your app manually before moving on.

---

## Level 0 — Project Setup & Structure

**Goal:** Set up your project and build the visual skeleton of the app. Nothing is interactive yet.

**Requirements**
- Create a project folder containing at least three separate files: one for structure, one for styling, and one for behavior. They must be linked together correctly.
- Build the page structure: a heading/title for the app, an area where a user will type a new task, a button to add it, and an empty area where the list of tasks will eventually appear.
- Style the page so it looks clean and organized: readable fonts, sensible spacing, and a layout that isn't just plain default HTML. It should look like a real app someone would want to use.

**Acceptance Criteria**
- Opening the HTML file shows a titled page with an input field, an add button, and an empty task area.
- HTML, CSS, and JavaScript live in separate, correctly linked files.
- The layout is responsive enough to look acceptable on a normal laptop screen.

**Hint**
- Think about which HTML elements best describe each part of your page, rather than putting everything in generic boxes.

---

## Level 1 — Add and Display Tasks

**Goal:** Let the user actually add tasks and see them appear on screen.

**Requirements**
- When the user types a task and activates the add button, the new task should appear in the task list on the page.
- Each task the user creates should be kept in your program's memory as a collection, so your code always knows the current list of tasks.
- The task area on screen should always reflect what is currently in that collection.
- Empty or blank tasks should not be added.

**Acceptance Criteria**
- Adding a task makes it show up in the list without reloading the page.
- Adding several tasks shows all of them, in order.
- Trying to add an empty task does nothing (and ideally tells the user why).

**Hints**
- You will need a way to store multiple tasks together and go through them to display them.
- Separate the "data" (the list in memory) from the "display" (what's on screen). When the data changes, redraw the display from it.

---

## Level 2 — Manage Tasks

**Goal:** Give the user control over existing tasks — completing, deleting, and editing them.

**Requirements**
- The user can mark a task as complete, and completed tasks should look visually different from active ones. The user can also un-complete a task.
- The user can delete a task, which removes it from both the screen and your list in memory.
- The user can edit the text of an existing task.
- Each task now needs to hold more than just its text — it should carry information about itself (for example whether it's done). Represent each task as a single bundle of related information rather than as loose values.

**Acceptance Criteria**
- Completing a task visibly changes it and can be reversed.
- Deleting a task removes it completely and it does not come back.
- Editing a task updates its text and keeps its completed/active state.
- Each action correctly updates the underlying list, not just the screen.

**Hints**
- If a task is now "text + some facts about it," think about the best shape to hold several related pieces of information as one unit.
- You'll need a reliable way to know *which* task a click refers to. A position in the list works at first, but think about what happens after deletions.

---

## Level 3 — Organize and Enrich

**Goal:** Add real detail to tasks and let the user make sense of a long list.

**Requirements**
- Extend each task so it can also have: a **due date**, a **priority** (for example low / medium / high), and a **category** or tag chosen by the user.
- Display these details clearly on each task.
- Give the user a way to **filter** the visible tasks — for example, show only active tasks, only completed tasks, or only tasks of a certain category.
- Give the user a way to **sort** the tasks — for example by due date or by priority.
- Add a **search** box that shows only the tasks whose text matches what the user typed.
- Highlight or mark tasks that are overdue (their due date has already passed).

**Acceptance Criteria**
- New tasks can be created with a due date, priority, and category, and these are shown.
- Filtering shows the correct subset and can be cleared to show everything again.
- Sorting reorders the visible tasks correctly.
- Searching narrows the list live as the user types, and clearing it restores the full list.
- Overdue tasks are visually distinguishable.

**Hints**
- Filtering, sorting, and searching are all about producing a *new view* of your task list without destroying the original list. Look for the tools that let you transform a collection into a subset or a reordered version.
- Comparing due dates against "today" means you'll need to work with real date values, not just text.

---

## Level 4 — Remember Everything

**Goal:** Make the app persist data and show the user a summary of their progress.

**Requirements**
- When the user reloads or reopens the page, all their tasks (and all details) should still be there, exactly as they left them.
- Each task should have a unique identifier that never clashes with another task's, even after deletions.
- Show live statistics somewhere on the page, for example: total tasks, how many are completed, how many are still active, and how many are overdue. These numbers must update automatically as tasks change.
- Show a count of how many distinct categories/tags currently exist.

**Acceptance Criteria**
- Closing and reopening the page restores the exact same tasks and their states.
- No two tasks ever share the same identifier.
- The statistics are always accurate after any add, edit, complete, or delete.
- The distinct-category count is correct even when many tasks share the same category.

**Hints**
- Browsers give you a way to keep small amounts of data on the user's own machine between visits. Find it — and remember it can only hold simple text, so you'll need to convert your data on the way in and out.
- Counting *distinct* things is a well-known problem. There's a data structure designed to hold only unique values.
- Producing a single summary number from a whole collection (like a total or a count that matches a condition) is a common operation — look for the tool built for boiling a list down to one value.

---

## Level 5 — Reach the World

**Goal:** Connect your app to live data from the internet.

**Requirements**
- When the app loads, fetch a piece of live content from a free public web service and display it — for example a "quote of the day" or a daily motivational message shown at the top of the app.
- Handle the waiting period gracefully: the user should see some indication that content is loading.
- Handle failure gracefully: if the internet is down or the service fails, the app must not break — it should show a sensible fallback and the rest of TaskFlow must keep working.

**Acceptance Criteria**
- On load, live content from an external source appears in the app.
- While the content is being retrieved, the user sees a loading indication.
- If the request fails, the app shows a fallback message and everything else still works normally.

**Hints**
- Fetching data from the internet doesn't happen instantly, so your code has to be able to *wait* for a result without freezing the page. Look into how JavaScript handles operations that finish later.
- Anything that can succeed *or* fail needs a plan for both outcomes.
- You can find lists of free, no-signup public APIs online — pick a simple one that returns text.

---

## Stretch Goals (Optional)

If you finish all six levels and want to push further, try any of these:

- **Dark mode** the user can toggle, with their preference remembered between visits.
- **Drag-and-drop** to reorder tasks manually.
- **Due-soon reminders** — visually alert the user to tasks due within the next day.
- **Export / Import** — let the user download all their tasks as a file and load them back later.
- **Recurring habits** — tasks that automatically reappear each day and track a streak of how many days in a row they were completed.

---
Good luck. Build it one level at a time, and make sure each level works before moving to the next.
