# Conference-Management-Tracker

You are planning a big programming conference and have received many proposals which have passed the initial screen process but you're having trouble fitting them into the time constraints of the day -- there are so many possibilities! So you write a program to do it for you.

• The conference has multiple tracks each of which has a morning and afternoon session.
• Each session contains multiple talks.
• Morning sessions begin at 9am and must finish by 12 noon, for lunch.
• Afternoon sessions begin at 1pm and must finish in time for the networking event.
• The networking event can start no earlier than 4:00 and no later than 5:00.
• No talk title has numbers in it.
• All talk lengths are either in minutes (not hours) or lightning (5 minutes).
• Presenters will be very punctual; there needs to be no gap between sessions.

Note that depending on how you choose to complete this problem, your solution may give a different ordering or combination of talks into tracks. This is acceptable; you don’t need to exactly duplicate the sample output given here.

`Test input:`

```Writing Fast Tests Against Enterprise Rails 60min
Overdoing it in Python 45min
Lua for the Masses 30min
Ruby Errors from Mismatched Gem Versions 45min
Common Ruby Errors 45min
Rails for Python Developers lightning
Communicating Over Distance 60min
Accounting-Driven Development 45min
Woah 30min
Sit Down and Write 30min
Pair Programming vs Noise 45min
Rails Magic 60min
Ruby on Rails: Why We Should Move On 60min
Clojure Ate Scala (on my project) 45min
Programming in the Boondocks of Seattle 30min
Ruby vs. Clojure for Back-End Development 30min
Ruby on Rails Legacy App Maintenance 60min
A World Without HackerNews 30min
User Interface CSS in Rails Apps 30min
```

`Test output:`

```Track 1:
09:00AM Writing Fast Tests Against Enterprise Rails 60min
10:00AM Overdoing it in Python 45min
10:45AM Lua for the Masses 30min
11:15AM Ruby Errors from Mismatched Gem Versions 45min
12:00PM Lunch
01:00PM Ruby on Rails: Why We Should Move On 60min
02:00PM Common Ruby Errors 45min
02:45PM Pair Programming vs Noise 45min
03:30PM Programming in the Boondocks of Seattle 30min
04:00PM Ruby vs. Clojure for Back-End Development 30min
04:30PM User Interface CSS in Rails Apps 30min
05:00PM Networking Event

Track 2:
09:00AM Communicating Over Distance 60min
10:00AM Rails Magic 60min
11:00AM Woah 30min
11:30AM Sit Down and Write 30min
12:00PM Lunch
01:00PM Accounting-Driven Development 45min
01:45PM Clojure Ate Scala (on my project) 45min
02:30PM A World Without HackerNews 30min
03:00PM Ruby on Rails Legacy App Maintenance 60min
04:00PM Rails for Python Developers lightning
05:00PM Networking Event
```

# Logic :

The basic steps I have used to track conferences are:

1. Sort the conferences based on their duration (Highest duration conference is on Top)
2. Pick the conference from the list and check if it fits in the morning or the afternoon timeline.
   - If it fits in the morning or afternoon timeline, mark that the conference is tracked.
   - If it does not fit in any timeline for the day, leave it and move forward.
3. Update the conference list to filter out the conferences that are already tracked.
4. Repeat the process from 2nd step for the remaining conferences till all the conferences are tracked.

# Steps to use the project

1. Place your .txt files containing the input tests for the problem inside the test-files directory
2. Run `npm install` in the root directory
3. Run `npm start` to execute the application on the test scenarios you put in the test-cases directory and you will see the ouptput in console.
4. Run `npm run test` to run test cases
