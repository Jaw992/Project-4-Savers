# Project 4 - Savers

![alt text](/README-Assets/picture.png)

## Project Scope
This is my capstone project to build a full-stack web application. For my project, i have choosen to make a simulated bank application.

1. Project Planning:
  - User stories
  - Wire FrameWork
2. Complete the full-stack application within given time frame. 

## Savers App Desciption
- A web-base bank simulation application that allows you to maximise your savings with SAVERS.
- Users will be able to view their daily spendings and savings through the application.
- Users will be able to deposit, withdrawal and transfer through the application.
- Work with your relationship manager to manage your finance and accounts.

## User Stories

#### Relationship Manager Pages
Login Page
- User will see a login page.
- User will input username and password and click on "Sign In" button to login.

Relationship Manager Main Page
- User will see a form for account creation for the clients.
- User will input the required fields and click "Create" to create an account for the client.
- User will see a form for account closure to close an account on request from the client.
- User will input the account number to terminate client's account.
- Upon termination, client's existing account balance will be transferred to the next account opened.
- If client does not have another account opened, closure will not happen and the relationship manager should contact the client to further assist with their balance.
- User will be able to see a table list of clients who they have opened the accounts for.

#### Client Pages
Login Page
- User will see a login page.
- User will input username and password and click on "Sign In" button to login.
- User will be able to click on "New Account" to direct them to the signup page.

Signup Page
- User will input their details and click on "Signup" to create a new user account.
- User will be directed back to login page upon successful creation.

Home Page
- User will see a navbar that will direct them to different pages.
- User will see a pie chart & summary of their spendings and savings, open accounts.
- User can click on the "account profile icon" to access to their profile page and signout.
- User acn click on "Home", "Transaction History", "Deposit/Withdrawal", "Transfer" to direct them to the respective pages.

My Profile Page
- User will see their details along with the relationship manager responsible to manage their accounts.
- User will be able to input the fields of what they need to change and update their particulars.

Transaction History Page
- User will see a list of their transactions made starting with the latest date.

Deposit/Withdrawal Page
- User will be able to input the fields and select their desired transaction type of "deposit" or "withdrawal".
- User will see a purpose selection field according to the transaction type they have selecting previously.
- User will click on "Submit" to complete the transaction.

Transfer Page
- User will be able to input the fields accordingly.
- User will be able to select their accounts that they wish to use for transfer.
- User will be able to select the purpose to identify if they are doing internal transfers or external transfers to other people.
- User will click on "Submit" to complete the transaction.

## Project Timeline
Planning + Development
- 2 Weeks

## Technologies Used
- Postgresql as Database
- Express
- React JS (Vite)
- Node JS
- Javascript

## React Libraries Used
- React Mui
- React Google Charts
- Date fns
- Jotai

## Wireframe
Used Moqups for app wireframing, use the link below to view:
https://app.moqups.com/ahB9m195QrtBkgSHjhpYlX81VnQqUQ1q/view/page/ad64222d5