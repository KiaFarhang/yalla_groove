# Yalla-Groove integration for Lemonade Stand #

We use two SaaS products constantly at [Lemonade Stand](https://www.lemonadestand.org/), the marketing agency where I work: [Yalla](https://www.yallahq.com/), the project management software we built, and [Groove](https://www.groovehq.com/), a centralized ticketing system. We pride ourselves on responsiveness, and always try to get back to a client within 10 minutes - even if it's just letting them know, "Hey, we got your message and we're working on it." I used the Groove and Yalla APIs - along with an intermediary database - to simplify that process.

### The Problem ###

A client emails our team through Groove with a question or request. I'm the account manager for that client, so Chris sees the ticket in Groove and thinks, "Oh, okay, Kia will get back to them shortly."

For whatever reason, I'm not checking Groove - maybe I'm in a meeting, maybe I'm buried in something else. I base my to-do list off what I see on my Yalla board, so I never realize there's a client waiting for my response.

An hour passes before Chris checks back on Groove and yells, "Hey Kia, there's something in Groove for you." I get back to the client - way later than I should have.

### The Solution ###

I set up a Groove webhook to send every new ticket to a Node.JS application. The application waits 10 minutes, then pings the Groove API for the status of that ticket. If nobody has answered it yet, the app checks the client's email against a database I built to find out who the account manager is. It then sends the Yalla API a priority for the account manager telling them to respond to the client in Groove. If the ticket is not from a current client, it defaults to putting that priority on my board.

The webhook POSTs to server.js, which - after 10 minutes - sends the information in the ticket to src/js/groove.js to check on its status. That function returns a promise containing information to pass to src/js/database.js, which checks whether the client's email is in my PostgreSQL database matching clients with account managers. Finally, one more promise in the chain goes to src/js/yalla.js, which makes a POST request to Yalla to create the new priority.

### Results ###

Simply announcing that I had built this system helped improve our responsiveness, as people didn't want to get an annoying reminder on their boards :) It's not perfect, as Yalla currently doesn't trigger notifications for priorities created through the API. But it's another line in our process to make sure clients get quick service - and it was a good way to learn how to write unit tests over a weekend. (All tests in the test/ folder, by the way.)

