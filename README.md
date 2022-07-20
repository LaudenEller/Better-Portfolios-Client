# Better Portfolios

BP helps investment professionals find securities that balance their client's portfolio needs while also maximizing positive social returns and satisfying any ethical limitations.

<!-- INSERT YOUTUBE LINK OF ME PREVIEWING THE APP HERE -->

You can see a preview of the app [here](ADD A LINK HERE) and you can use the app yourself [here](https://betterportfoliosclient.herokuapp.com/).

In this document:
- [Motivation](#motivation-for-this-project)
- [How it works](#how-better-portfolios-works)
- [How it was developed](#how-better-portfolios-was-developed)

# Motivation For This Project

BP was created during the last two week sprint of my full time, six month, full stack (Python backend) boot camp, Cohort #54 (the Golden Cohort), at Nashville Software School. For my culmination project, I wanted to build an app that is designed to interact with an external API and simultaneously I have been looking for an easier way to find more ethical investment products for myself, and so I built Better Portfolios which is designed to search and filter through the securities listed in MSCI's ESG database found [here](https://developer.msci.com/apis/esg-data-api). However, their API key costs $10,000 to access and so instead, the app has an internal db that mimics the structure and object-design of theirs. In the future, I would like to connect this app to such an external API.

[Back to Top](#better-portfolios)

# How Better Portfolios Works

<!-- ADD SOMETHING ABOUT  -->

This is the front end repo, it's back end sibling lives [here](https://github.com/LaudenEller/Final-Capstone)

Users can create a profile by providing a username, password, name and email (the email is not used by the site other than log in so feel free to use a fake!).

Once logged in, users can search and filter through the available securities, if they see a fund they like, they can add it to their watch list or recommend it to another user. 
If they find a fund issuer they like, they can explore their other funds or add them to their favorite section to observe for future funds or, more importantly, recommend their funds to future clients.

Users can also view their profile section where all the funds and issuers they're tracking can be seen and updated as well as any recommendations they've received from other users.

# How Better Portfolios Was Developed

BP is a full stack project that utilizes Python 3.9, a SQLite db with RESTful Django API for the server-side, and React with Reactjs incorporating MUI CSS library manager and AG Grid for the client-side.

I developed this app under less than ideal circumstances, due to unavoidable circumstances I had been out of school for several weeks leading up to the beginning of the sprint and once things got rolling, I was quickly overcome with brain fatigue and overload. By the end of each long day, things that had taken me 2 minutes in the morning were taking me 30 minutes after 10 hours of coding. It was my first truly grueling sprint. 

I reached MVP, and a presentable basic CSS within the deadline, and while I didn't get to finish the NSS program with the bang that I had hoped to, this app does pass all the "client's" parameters and I am proud of the work it took to get it passed the finish line. In the near future, I hope to add more functionality so there are different classes of users while also improving the graphics. Eventually, I would love to hook this app up to an external database and provide links to download the funds' ESG reports and to brokers selling them.

[Back to Top](#better-portfolios)