"use strict";

/*
* Purpose: This file is designed to manage the game flow of the Memory Training Game
* Project: ENG1003 Assignment 1
* Author: Zhen Yuen, Prathik, Jia Min, Yue Xin
* Last Modified: 4 April 2019
* Version : 1.5
*/

let buttonSequenceGenerated = []; // Random sequence generated will be stored here.
let buttonSequenceSelected = []; // User's selection will be stored here.
let failureCounter = 0; // Records number of failures.
let successCounter = 0; // Records number of successes.
let buttonPressedCounter = 0; // Records number of button presses.
let userLevel = 4; // Records user's current level and sequence length.
let currentMode = 1; // Keeps track of whether the device is in tilt mode or press mode.
let timeOut = false; // Indicatess whether user has timed out or not in tilt mode.
let buttonHighlighted = ""; // Records the button in which the device is currently tilted towards.
let playStatus = false; // Indicates if its user's turn to select buttons.

updateInfo(null); // Updates the display when app loads for the first time.

/*
 * This callback function will be called when any of the game buttons on the
 * screen is clicked on by the user (note that the user will not be able to
 * 'double-click' buttons, they will only be clickable once a button has
 * gone dark again)
 *
 * This function has a single parameter 'whichButton' that can take the
 * following values:
 *    "blue"
 *    "green"
 *    "yellow"
 *     "red"
*/
function buttonSelected(whichButton)
{

    buttonSequenceSelected[buttonPressedCounter] = whichButton; // Store buttons pressed into array.
    buttonPressedCounter++; // Increments the index of the array everytime a button is stored.

    if (buttonPressedCounter === userLevel) //  Check if user has pressed enough buttons.
    {
        let result = compareSequence();

        if (result) // Check if result is true.
        {
            showSuccess();
            successCounter++; // Increment the number of succeses.
            failureCounter = 0; // Reset number of failures to zero.
            displayToastMessage("Press play for next round", 1000);

            if (successCounter === (userLevel - 2)) // Check if number of sucsesses is sufficient to level up.
            {
                userLevel++; // Increment user level.
                successCounter = 0; // Resets number of successes to zero.
            }

        }
        else
        {
            showFailure()
            decreaseUserLevel();
            displayToastMessage("Press play to try again.", 1000);
        }

        playStatus = false; // Indicates that it is not user's turn to select buttons.

    }

    updateInfo(null); // Updates the current game status.

}


/*
 * This callback function will be called regularly by the main.js page.
 * It is called when it is time for a new sequence to display to the user.
 * You should return a list of strings, from the following possible strings:
 *    "blue"
 *    "green"
 *    "yellow"
 *    "red"
*/
function giveNextSequence()
{

    let colorArray = ["blue", "green", "yellow", "red"]; // Array containing strings representing each colour.
    buttonPressedCounter = 0; // Reset the number of buttons pressed to zero for the start of every round.
    buttonSequenceGenerated.length = userLevel; // Set the length of sequence generated to user's current level.
    buttonSequenceSelected.length = userLevel; // Array containing user's button presses is set to user's current level.

    for (let i = 0; i < userLevel; i++) // loop through all elements in the array.
    {
        buttonSequenceGenerated[i] = colorArray[Math.floor(Math.random()*4)]; // Assign a random colour into the array.
    }

    updateInfo(null); // Updates the current game status.
    displayToastMessage("Playing sequence.", 500);

    return buttonSequenceGenerated; // Returns an array of strings representing the colour sequence.

}


/*
 * This callback function is called when the sequence to display to the user
 * has finished displaying and user is now able to click buttons again.
*/
function sequenceHasDisplayed()
{

    timeOut = false; // Indicates that user has not timed out.
    playStatus = true; // Indicates that it is user's turn to select buttons.
    displayToastMessage("Please enter sequence", 500);

}


/*
 * This callback function will be called if the user takes too long to make
 * a choice.  You can generally treat a call to this function as meaning the
 * user has 'given up'. This should be counted as an incorrect sequence given
 * by the user.
 *
 * When the app is is "tilt" input mode (see Step 7) then you might instead
 * use this function to select the button that the phone is tilted towards,
 * by calling one of the following functions:
 *    selectYellowButton
 *    selectRedButton
 *    selectBlueButton
 *    selectGreenButton
*/
function userChoiceTimeout()
{

    if (controlMode === TILT_MODE && !timeOut) // Checks if user is in tilt mode and has not timed out.
    {
        if (buttonHighlighted === "Blue")
        {
            selectBlueButton();
        }
        else if (buttonHighlighted === "Green")
        {
            selectGreenButton();
        }
        else if (buttonHighlighted === "Yellow")
        {
            selectYellowButton();
        }
        else if (buttonHighlighted === "Red")
        {
            selectRedButton();
        }
        else
        {
            timeOut = true; // Indicates that user has timed out.
            userChoiceTimeout(); // Function calls back itself to fail user.
        }
    }
    else
    {
        timeOut = true; // Indicates that user has timed out.
        playStatus = false; // Indicates that it is not user's turn to select buttons.
        displayToastMessage("Press play to try again.", 1000);
        showFailure();
        decreaseUserLevel();
        updateInfo(null); // Updates current game status.
    }

}


/*
 * This callback function will be called when the user taps the button at the
 * top-right of the title bar to toggle between touch- and tilt-based input.
 *
 * The mode parameter will be set to the newly selected mode, one of:
 *    TOUCH_MODE
 *    TILT_MODE
*/
function changeMode(mode)
{

    currentMode = mode; // Indicates the current game mode.
    let deviceAbsolute = null;
    deviceAbsolute = new AbsoluteOrientationSensor({ frequency: 10 }); // Creates absolute orientation sensor at frequency of 10 ms.
    deviceAbsolute.addEventListener('reading', () => deviceOrientationHandler(deviceAbsolute)); // Add event listener.
    deviceAbsolute.start(); // Start the sensor.

    updateInfo(null); // Updates the current game status.

}


//  You may need to write other functions.

/* This function is called to compare the sequence of buttons selected by the
 * user and the sequence generated randomly.
 *
 * The return value will be one of:
 *    true
 *    false
 */
function compareSequence() // Checks if the button sequence selected matches that of the sequence generated.
{

    let result = true;

    for(let i = 0; i < userLevel; i++) // Loop to compare every value in the array.
    {
        if (buttonSequenceSelected[i] !== buttonSequenceGenerated[i]) // If does not match, result is false.
        {
            result = false; // Indicator that buttons do not match.
            break; // Breaks out from loop.
        }
    }

    return result;

}


/* Updates the display when called to track progress of the game
 * Displays the current user level, the number of button presses remaining,
 * number of succeses, number of correct sequences remaining
 *
 * In tilt mode, additional information regarding the device current direction
 * and the button the device is currently tilted towards will be shown.
*/
function updateInfo(zValue)
{

    let northStatus; // Indicates whether device is facing North.
    let outputRef = document.getElementById("output");
    let correctSequencesRemaining = userLevel - 2 - successCounter;;
    let remainingNumberofPresses = buttonSequenceSelected.length - buttonPressedCounter;;
    let dispOutput = " ";

    if (zValue <= 0.3 && zValue >= -0.3)
    {
        northStatus = "True"; // If device is facing North, northStatus is "True".
    }
    else
    {
        northStatus = "False"; // If device is not facing North, northStatus is "False".
    }

    // TILT_MODE is assigned to a value of 2 as defined in main.js.
    // If current mode is in tilt mode, add these lines of text to be displayed to the user.
    if (currentMode === 2 )
    {
        dispOutput += "<br/>Device facing North : " +  northStatus;
        dispOutput += "<br/>Button selected : " + buttonHighlighted + "<br/>";
    }

    dispOutput += "<br/>Length of sequence : " + userLevel + "<br/>";
    dispOutput += "No. of buttons remaining : " + remainingNumberofPresses + "<br/>";
    dispOutput += "No. of correct sequence(s) entered : " + successCounter + "<br/>";
    dispOutput += "Remaining no. of correct sequence(s) : " + correctSequencesRemaining + "<br/>"

    outputRef.innerHTML = dispOutput;

}


/* This function is called when the user fails the current round.
 * Decrements user's level for every time the user fails.
 * If the number of consecutive failures is 2, resets user level back to 4 and
 * the number of succeses to 0.
*/
function decreaseUserLevel()
{

    successCounter = 0; // Resets the number of successes to zero.
    failureCounter++; // Increments the number of failures.

    if (userLevel !== 4) // Checks if user's current level is not 4.
    {
        userLevel--; // Decrements user level.
    }

    if (failureCounter === 2) // Checks if number of consecutive failuers is 2.
    {
        userLevel = 4; // Resets the user's level back to 4.
        failureCounter = 0; // Resets the number of failures to zero.
    }

    buttonPressedCounter = buttonSequenceSelected.length; // Sets number of button pressses remaining to zero

}


/* This callback function is called whenever a reading is obtained via the Device Orientation Absolute API.
 * This function accepts an object as an argument.
 *
 * Converts the quaternions values into Euler angles.
 * Stores the string of the button the device is currently tilted towards into buttonHighlighted.
 * Highlights the border of the button only when it is user's turn to select buttons.
 *
 * Parameter used is deviceAbsolute.
*/
function deviceOrientationHandler(deviceAbsolute)
{

    let roll, pitch;

    let qx = deviceAbsolute.quaternion[0]; // quaternion value for x.
    let qy = deviceAbsolute.quaternion[1]; // quaternion value for y.
    let qz = deviceAbsolute.quaternion[2]; // quaternion value for z.
    let qw = deviceAbsolute.quaternion[3]; // quaternion value for w.

    roll = Math.atan(2 * (qx * qw + qz * qy)/(1 - 2 * (qx * qx + qy * qy))); // Obtain roll in Euler angle about the X-axis.
    pitch = Math.asin(2 * (qw * qy - qz * qx)); // Obtain pitch in Euler angle about the Y-axis.

    // Remove border highlights from buttons.
    document.getElementById("TL").style.borderStyle = "none";
    document.getElementById("TR").style.borderStyle = "none";
    document.getElementById("BL").style.borderStyle = "none";
    document.getElementById("BR").style.borderStyle = "none";

    if (currentMode === TILT_MODE) // Checks if user is in tilt mode.
    {
        if(roll < 0 && pitch < 0 && playStatus)
        {
            buttonHighlighted = "Blue";
            document.getElementById("TL").style.borderStyle = "solid"; // Hightlight border of blue button.
        }
        else if (roll < 0 && pitch > 0 && playStatus)
        {
            buttonHighlighted = "Green";
            document.getElementById("TR").style.borderStyle = "solid"; //Hightlight border of green button.
        }
        else if (roll > 0 && pitch < 0 && playStatus)
        {
            buttonHighlighted = "Yellow";
            document.getElementById("BL").style.borderStyle = "solid"; //Hightlight border of yellow button.
        }
        else if (roll > 0 && pitch > 0 && playStatus)
        {
            buttonHighlighted = "Red";
            document.getElementById("BR").style.borderStyle = "solid"; //Hightlight border of red button.
        }
        else
        {
            buttonHighlighted = "None"; // No button is currently being tilted towards.
        }
    }

    updateInfo(qz); // Updates the display so user knows which button is the device currently tilted towards.

}
