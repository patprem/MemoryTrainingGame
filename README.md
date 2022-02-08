# Memory Training Game

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#background">Background</a></li>
      </ul>
      <ul>
        <li><a href="#why-is-this-important">Why is this important?</a></li>
      </ul>
      <ul>
        <li><a href="#prerequisites">Prerequisites?</a></li>
      </ul>
    </li>
     <li><a href="#game-design">Game Design</a></li>
     <li><a href="#features">Features</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#game-progression">Game Progression</a></li>
        <li><a href="#angles-obtained-from-the-phone-using-absolute-device-orientation">Angles obtained from the phone using absolute device orientation</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contribute">Contribute</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a>
    
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

<p align="center">
  <img src ="https://i0.wp.com/retropond.com/wp-content/uploads/2021/07/Simon.gif?fit=480%2C270&ssl=1" height = 300 width = 500>
</p>
The objective of this project is to develop a memory skill game based on the electronic game Simon, produced by Hasbro. This mobile web app, built in HTML, CSS and JavaScript, displays random sequences of colours which the user must repeat from memory. As the user continually enters correct sequences the game progressively selects longer sequences.

### Background

Simon is a 40-year-old electronic game, currently produced by [Hasbro](https://en.wikipedia.org/wiki/Simon_(game)). The game has four coloured buttons that light up and play a sound in sequence. The user then has to replicate the sequence by pressing those buttons in the same order. The sequences become progressively longer and more difficult until the user is unable to repeat the sequence and the game ends.

### Why is this important?

* While such games are entertaining, the complexity and randomness of the sequences also allows the game to be used as a means of practicing memory storage techniques. There is some evidence that individuals with mild cognitive impairment can benefit from memory enhancement training from such games.
* To make this web app accessible to those in rural areas without the need to develop physical electronic devices.

### Prerequisites
* Android device
* Internet connection
* Browser support (Google Chrome, preferably)

<p align="right">(<a href="#top">back to top</a>)</p>

## Game Design

![design](https://github.com/patprem/MemoryTrainingGame/blob/508afb2e2c61649d383641e90e4261bbd993e14e/images/gamedesign.jpeg)

* Minimum level = 4
* Length of sequence = user’s level
* 2 consecutive failures, Level down.
* Consecutive successes = (user’s level – 2),  Level up.

<p align="right">(<a href="#top">back to top</a>)</p>

## Features

<p align = "center">
  <img src = "https://github.com/patprem/MemoryTrainingGame/blob/ca68ef350f43774ff208e90485dfa5b9794b59af/images/features.jpg">
</p>

* Touch Mode & Tilt Mode
* Border of the button which the device is tilted towards will be highlighted
* Fluid and simple interface
* Current game information is displayed to user
* Toast message to tell user what to do – Watch/Select Button
* Easy to understand and play

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started
### Game Progression
The table shown below depicts some example sequences that might be shown when playing the game.
![table1](https://github.com/patprem/MemoryTrainingGame/blob/3863e4b3f8c4a0f860442880de04873161490dab/images/table1.png)

The difficulty level (sequence length) increases after the user gets a certain number of sequences of that length correct. The number of correct sequences needed to advance is shown in the table below (the number is always two less than the sequence length).

<p align="center">
  <img src = "https://github.com/patprem/MemoryTrainingGame/blob/3863e4b3f8c4a0f860442880de04873161490dab/images/table2.png" width = 500 height = 300>
</p>

* For example, at the start of the game, the player is given sequences of length 4. The player receives RRGB followed by GGBY and they get both correct. Since they have entered two sequences correctly, the game now increases to sequences of length 5. The player then receives YYGBR (a sequence of length 5) and needs to enter 3 of further correct sequences to advance to sequences of length 6.

* Any time the player makes a mistake, they start again at the previous level (or reset to level 4 if they make two consecutive errors). The player cannot be given sequences shorter than 4 (as this is the starting level).

### Angles obtained from the phone using absolute device orientation

* There are some situations where it may be too difficult for the user to interact with the app using the buttons on the screen (for example while wearing gloves). As such, we want to allow users to control the app using the phones orientation.

* When using absolute device orientation there are four values: x, y, z and w; where x value represents the forwards-backwards tilt of the phone. It can visualised as below:

<p align="center">
    <img src="https://github.com/patprem/MemoryTrainingGame/blob/3863e4b3f8c4a0f860442880de04873161490dab/images/fig1.png" width = 400 height = 250 alt>
</p>
<p align="center">
    <em>Figure 1: Side view of phone at different beta (x) angles</em>
</p>

In Figure 1, where we are looking at the phone from the side, this means that when the device is at on a surface, screen facing up it will have a y value of 0 degrees, tilting the top of the phone down gives a y value of -45 and tilting the top of the phone up gives a y value of +45.

<p align="center">
    <img src="https://github.com/patprem/MemoryTrainingGame/blob/3863e4b3f8c4a0f860442880de04873161490dab/images/fig2.png" width = 400 height = 200 alt>
</p>
<p align="center">
    <em>Figure 2: Bottom-side view of phone at different gamma (y) angles</em>
</p>

In Figure 2, where we are looking at the bottom of the phone, being at on a surface gives a gamma of 0 degrees, tilting the phone to the left gives it a gamma of -45 whereas tilting to the right gives it +45 degrees.

<p align="right">(<a href="#top">back to top</a>)</p>

### Installation








<!-- CONTRIBUTE -->
## Contribute

If you like this project and interested to contribute:
* Please show your support by ⭐ (star) the project.
* Submit pull requests and improve the repo overall quality.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
The codes used in this project borrows from Monash University and rewritten to incorporate into my project.

<p align="right">(<a href="#top">back to top</a>)</p>
