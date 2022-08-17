# ghost-challenge

The requirement is from: https://ghost.notion.site/Coding-challenge-4b8ae672b90745dda06afeeea0f27267

# The idea
## For MVP with jQuery
- The front-end uses:
    + HTML for layouting the page
    + jQuery for handling actions & api updates
- Backend uses Firebase firestore

## For V2 with React
- The front-end uses:
    + React for layouting the page
    + Redux for managing the state of the page
    + Saga for async contact with the server
- Backend re-uses existing store and functions, and FCM to notify clients about updates. 