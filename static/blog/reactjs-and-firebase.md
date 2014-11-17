---
Title:   Learning how to use ReactJS and Firebase
Date: 2014-11-6
---

### Introduction

A few weeks ago, I experimented with Facebook's [ReactJS](1). ReactJS is a tool for building user interfaces. The structure of a React application is similar to web components, where a UI is composed of multiple components. Each component and it's children can be rendered in HTML. ReactJS renders your components in a virtual DOM, which is compared to the existing DOM to intelligently apply DOM manipulations to your page.

[Firebase](2) is a real time key-value store. Using Firebase's Javascript API, the browser receives updates whenever something is changed on the server.

Together, these two libraries are awesome.

<iframe width="560" height="315" src="//www.youtube.com/embed/qaYESiT-358" frameborder="0" allowfullscreen></iframe>

### Implementation

I had a CMS running on my server at the time, so I modified it to use Firebase and ReactJS. At a high level, it's very simple. I had a ReactJS component called a "Renderable" that queries the Firebase store to get the text, which is then compiled to HTML (if it is formatted in markdown). When Firebase receives an update from the server, an event is triggered that causes the "Renderable" to render again.

### What I've learned

bla h blahb lah


[1]: http://facebook.github.io/react/
[2]: https://www.firebase.com/
