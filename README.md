# Better Portfolios

Better Portfolios helps investment professionals find securities that balance their client's portfolio needs while also maximizing positive social returns and satisfying any ethical limitations.

<!-- INSERT LINK TO DEPLOYED APP HERE -->
<!-- INSERT YOUTUBE LINK OF ME PREVIEWING THE APP HERE -->

You can see a preview of the app [here](ADD A LINK HERE) and you can use the app yourself [here](ADD A LINK HERE).

In this document:
- [Motivation](#motivation-for-this-project)
- [How it works](#how-better-portfolios-works)
- [How it was developed](#how-better-portfolios-was-developed)

# Motivation For This Project

Better Portfolios was created during the last two week sprint of my full time, six month, full stack (Python backend) boot camp at Nashville Software School. For my culmination project, I wanted to build an app that is designed to interact with an external API, and simultaneously, I have been looking for an easier way to find more ethical investment products for myself, and so I built Better Portfolios, which is designed to search and filter through the securities listed in a private [database from] (https://developer.msci.com/apis/esg-data-api) a globally reknowned leader in the Environmental, Social & Governance sector of finance called MSCI. Unforttunately, as ths project was developed what appeared to be a free database ended up costing $10,000 to access and so instead, I created an internal database that mimics the structure and design of theirs.

[Back to Top](#better-portfolios)

# How Better Portfolios Works

This is the front end repo, it's back end sibling lives [here](https://github.com/LaudenEller/Final-Capstone)

Users can create a profile by providing a username, password, name and email (the email is not used by the site other than log in so feel free to use a fake).

Once logged in, users can search and filter through the available securities and if they see a fund they like, they can add it to their watch list or recommend it to another user. 
If they find a fund issuer they like, they can explore the issuer's other funds or add them to their favorite section to observe for future funds or, more importantly, recommend their funds to future clients.

Users can also view all the funds and issuers they're tracking as well as any recommendations they've received from other users.

# How Better Portfolios Was Developed

Better Portfolios is a full stack project that utilizes Python 3.9, a SQLite RESTful databases with a Django API for the server-side, and React with Reactjs, Node Package Manager and MUI for the client-side (AG Grid was also used to display the apps primary search).

I developed this app under less than ideal circumstances: due to unavoidable circumstances I had been out of school dealing with intense family emergencies for several weeks leading up to the beginning of the sprint and once things got rolling, I was quickly overcome with brain fatigue and overload. By the end of each long day, things that had taken me 2 minutes in the morning were taking me 45 minutes after 14 hours of coding. It was my first grueling sprint... 

I was happy that I reached MVP and a basic CSS within the deadline, and while I didn't get to finish the NSS program with the bang that I had hoped to, this app does pass all the requested parameters and I am proud of the work it took to get it passed the finish line. In the near future,  I plan to improve the UI/UX significantly and add more functionality that allows fiduciaries to manage a roster of clients. Eventually, I would love if finance professionals connected my app to an external database and used it in their work.

[Back to Top](#better-portfolios)
